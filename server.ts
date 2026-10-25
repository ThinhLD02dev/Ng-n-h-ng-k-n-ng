import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Smart Matchmaker analyzing compatibility between learner & community teachers
app.post('/api/match-skills', async (req: Request, res: Response) => {
  try {
    const { currentUser, members } = req.body;

    if (!currentUser || !members || !Array.isArray(members)) {
      res.status(400).json({ error: 'Dữ liệu thành viên không hợp lệ' });
      return;
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `
Bạn là chuyên gia kết nối của nền tảng "Ngân hàng Kỹ năng Cộng đồng" (nơi người dân dạy và học kỹ năng miễn phí cho nhau).
Hãy phân tích hồ sơ của người dùng hiện tại và danh sách thành viên cộng đồng để tìm ra những người phù hợp nhất để ghép đôi (đặc biệt ưu tiên các cặp có thể trao đổi chéo kỹ năng: A dạy B kỹ năng X, B dạy lại A kỹ năng Y).

Hồ sơ người dùng hiện tại:
- Tên: ${currentUser.name}
- Kỹ năng nhận dạy: ${JSON.stringify(currentUser.skillsToTeach?.map((s: any) => ({ name: s.name, cat: s.category, level: s.level })) || [])}
- Kỹ năng muốn học: ${JSON.stringify(currentUser.skillsToLearn?.map((s: any) => ({ name: s.name, cat: s.category, goal: s.targetGoal })) || [])}
- Khu vực: ${currentUser.district}, ${currentUser.city}

Danh sách thành viên cộng đồng:
${JSON.stringify(
  members.map((m: any) => ({
    id: m.id,
    name: m.name,
    district: m.district,
    city: m.city,
    skillsToTeach: m.skillsToTeach?.map((s: any) => ({ name: s.name, cat: s.category, level: s.level, format: s.format })),
    skillsToLearn: m.skillsToLearn?.map((s: any) => ({ name: s.name, cat: s.category, goal: s.targetGoal })),
  })),
  null,
  2
)}

Hãy trả về kết quả JSON gồm mảng phân tích cho tối đa 4 thành viên phù hợp nhất theo schema:
- memberId (string): id thành viên
- score (number, từ 60 đến 98): điểm số độ tương thích
- isMutualExchange (boolean): true nếu 2 bên có thể dạy chéo kỹ năng cho nhau
- matchReason (string, 1-2 câu tiếng Việt ngắn gọn, ấm áp giải thích tại sao hai người này nên kết nối)
- suggestedRoadmap (mảng 3 bước/buổi gợi ý cho buổi học đầu tiên)
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  memberId: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  isMutualExchange: { type: Type.BOOLEAN },
                  matchReason: { type: Type.STRING },
                  suggestedRoadmap: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['memberId', 'score', 'isMutualExchange', 'matchReason', 'suggestedRoadmap'],
              },
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          res.json({ matches: parsed, source: 'gemini-ai' });
          return;
        }
      } catch (geminiError) {
        console.warn('Gemini API call fallback to heuristic:', geminiError);
      }
    }

    // Heuristic algorithmic fallback
    const matches = members.map((member: any) => {
      let score = 70;
      let isMutualExchange = false;

      // Check if member teaches what user wants to learn
      const teachesUserWant = member.skillsToTeach?.some((t: any) =>
        currentUser.skillsToLearn?.some(
          (l: any) =>
            l.name.toLowerCase().includes(t.name.toLowerCase()) ||
            t.name.toLowerCase().includes(l.name.toLowerCase()) ||
            l.category === t.category
        )
      );

      // Check if user teaches what member wants to learn
      const userTeachesMemberWant = currentUser.skillsToTeach?.some((ut: any) =>
        member.skillsToLearn?.some(
          (ml: any) =>
            ml.name.toLowerCase().includes(ut.name.toLowerCase()) ||
            ut.name.toLowerCase().includes(ml.name.toLowerCase()) ||
            ml.category === ut.category
        )
      );

      if (teachesUserWant && userTeachesMemberWant) {
        score = 95;
        isMutualExchange = true;
      } else if (teachesUserWant) {
        score = 86;
      } else if (userTeachesMemberWant) {
        score = 80;
      }

      if (member.city === currentUser.city) score += 3;

      return {
        memberId: member.id,
        score: Math.min(score, 98),
        isMutualExchange,
        matchReason: isMutualExchange
          ? `Hai bên có thể trao đổi kỹ năng chéo tuyệt vời: ${member.name} có thể hướng dẫn kỹ năng bạn cần, và bạn cũng có kỹ năng giúp ích cho mục tiêu học tập của họ!`
          : `${member.name} có kỹ năng giảng dạy phù hợp với mục tiêu học tập bạn đang quan tâm tại ${member.district}.`,
        suggestedRoadmap: [
          'Buổi 1: Làm quen, thống nhất mục tiêu và kiến thức nền tảng',
          'Buổi 2: Hướng dẫn thực hành từng bước và bài tập nhỏ',
          'Buổi 3: Đánh giá kết quả thực hành và giải đáp thắc mắc',
        ],
      };
    });

    matches.sort((a: any, b: any) => b.score - a.score);

    res.json({ matches: matches.slice(0, 4), source: 'algorithmic-matcher' });
  } catch (error) {
    console.error('Error in match-skills endpoint:', error);
    res.status(500).json({ error: 'Đã có lỗi xảy ra khi ghép nối kỹ năng' });
  }
});

// API: Generate lesson plan roadmap for a specific exchange session
app.post('/api/generate-roadmap', async (req: Request, res: Response) => {
  try {
    const { skillName, teacherName, learnerGoal } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `Gợi ý lộ trình 3 buổi học ngắn gọn, thực tế, gần gũi cho một buổi học tình nguyện 1-1 cộng đồng:
Kỹ năng: "${skillName}"
Người hướng dẫn: "${teacherName}"
Mục tiêu người học: "${learnerGoal || 'Học thực hành căn bản'}"

Hãy trả về JSON gồm:
- title: Tiêu đề lộ trình
- sessions: mảng 3 đối tượng gồm { sessionNumber (1,2,3), title: tiêu đề buổi, duration: '60 phút', keyPoints: mảng 3 gạch đầu dòng nội dung }`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          res.json({ roadmap: JSON.parse(response.text) });
          return;
        }
      } catch (err) {
        console.warn('Gemini roadmap error:', err);
      }
    }

    // Default roadmap
    res.json({
      roadmap: {
        title: `Lộ trình học tập cộng đồng: ${skillName}`,
        sessions: [
          {
            sessionNumber: 1,
            title: 'Làm quen & Thiết lập nền tảng',
            duration: '60 phút',
            keyPoints: ['Trao đổi mục tiêu học', 'Nắm các thao tác cơ bản nhất', 'Bài tập trải nghiệm nhỏ'],
          },
          {
            sessionNumber: 2,
            title: 'Thực hành chuyên sâu & Sửa lỗi',
            duration: '75 phút',
            keyPoints: ['Cùng làm một dự án/sản phẩm nhỏ', 'Thầy sửa lỗi trực tiếp', 'Mẹo thực tế từ kinh nghiệm'],
          },
          {
            sessionNumber: 3,
            title: 'Tổng kết & Tự rèn luyện',
            duration: '60 phút',
            keyPoints: ['Đánh giá sản phẩm hoàn thiện', 'Hướng dẫn tài liệu tự học sau này', 'Chia sẻ cảm nhận hai bên'],
          },
        ],
      },
    });
  } catch (error) {
    console.error('Error in generate-roadmap:', error);
    res.status(500).json({ error: 'Lỗi tạo lộ trình' });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`> Ngân hàng Kỹ năng Cộng đồng Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
