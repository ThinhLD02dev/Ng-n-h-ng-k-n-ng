import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  Users,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Globe2,
  Clock,
  Award,
} from 'lucide-react';

interface AboutViewProps {
  onExplore: () => void;
  onOpenRegister: () => void;
  onOpenAIMatch: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onExplore,
  onOpenRegister,
  onOpenAIMatch,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Tôi không có bằng cấp sư phạm, liệu có thể đăng ký dạy được không?',
      a: 'Hoàn toàn được! Ngân hàng Kỹ năng Cộng đồng tôn vinh mọi kỹ năng thực tế trong đời sống — từ cách làm bánh men tự nhiên, sửa quạt điện, chơi đàn guitar đến sử dụng smartphone cho người cao tuổi. Chỉ cần bạn có kinh nghiệm thực tế và sự kiên nhẫn, nhiệt tình sẻ chia, bạn đã là một người thầy tuyệt vời trong cộng đồng.',
    },
    {
      q: 'Nền tảng có thu phí thành viên hay chi phí trung gian không?',
      a: 'Tuyệt đối 0 đồng. Đề án H05 hoạt động trên nguyên tắc 100% phi lợi nhuận và phục vụ dân sinh. Mọi buổi học, công cụ tìm kiếm và tính năng ghép đôi thông minh AI đều hoàn toàn miễn phí cho tất cả mọi người.',
    },
    {
      q: 'Nếu hiện tại tôi chỉ có nhu cầu học mà chưa biết dạy gì thì sao?',
      a: 'Bạn hoàn toàn có thể tham gia với vai trò người học! Dự án khuyến khích tinh thần học tập suốt đời. Bạn có thể gửi lời mời học tới các tình nguyện viên nhận dạy, và sau này khi tự tin hoặc rảnh rỗi hơn, bạn có thể đăng ký chia sẻ lại cho người khác.',
    },
    {
      q: 'Cơ chế Ghép đôi bằng AI Gemini hoạt động như thế nào?',
      a: 'Hệ thống sử dụng mô hình AI Gemini (chạy bảo mật từ máy chủ) để đối chiếu hồ sơ kỹ năng của bạn với cơ sở dữ liệu cộng đồng. AI sẽ phân tích nhu cầu cần học, khả năng nhận dạy, khung giờ rảnh và khu vực địa lý để tìm ra người phù hợp nhất, đặc biệt ưu tiên cơ chế "trao đổi chéo 2 chiều" (ví dụ: Bạn dạy Tiếng Anh cho họ, họ dạy lại Đàn Guitar cho bạn).',
    },
    {
      q: 'Các buổi học thường diễn ra ở đâu để đảm bảo an toàn?',
      a: 'Có hai hình thức linh hoạt: Học trực tuyến qua Google Meet (được hệ thống tạo link tự động) hoặc Học trực tiếp tại các địa điểm công cộng văn minh như Thư viện khu dân cư, Quán cà phê sách, hoặc Nhà sinh hoạt cộng đồng phường/xã.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Hero & Mission Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-md border border-emerald-200">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
          <span>Về Dự án Ngân hàng Kỹ năng Cộng đồng (Đề án H05)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          Nơi tri thức là tài sản chung —{' '}
          <span className="text-emerald-700">ai cũng có điều để dạy, ai cũng có điều để học.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Ngân hàng Kỹ năng Cộng đồng ra đời với sứ mệnh tái hiện tinh thần <strong>"Bình dân học vụ"</strong> ngày xưa dưới hình thức công nghệ số hiện đại. Chúng tôi tin rằng trong mỗi khu dân cư, tổ dân phố hay thành phố, luôn có những người sở hữu chuyên môn quý giá và những người khao khát học hỏi nhưng gặp rào cản chi phí. Nền tảng là cầu nối phi lợi nhuận giúp họ tìm thấy nhau.
        </p>

        {/* Feature Visual with Storytelling */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-100 aspect-[16/9] sm:aspect-[21/9]">
          <img
            src="/src/assets/images/community_workshop_table_1792401735605.jpg"
            alt="Buổi trao đổi và học hỏi kỹ năng cộng đồng thực tế tại Việt Nam"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="font-bold text-sm sm:text-base drop-shadow-sm">
              Không gian chia sẻ kỹ năng đa thế hệ
            </p>
            <p className="text-xs text-slate-200 drop-shadow-sm">
              Nơi người trẻ hướng dẫn kỹ năng số, người đi trước truyền trao kinh nghiệm nghề nghiệp và vốn sống.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Three Core Principles */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ba Nguyên tắc Cốt lõi của Đề án
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Những giá trị bất biến định hình cách vận hành văn minh và nhân văn của nền tảng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                100% Phi lợi nhuận & Nhân ái
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Không thu phí, không mua bán khóa học, không chèo kéo thương mại. Mọi sự hỗ trợ đều xuất phát từ tấm lòng tự nguyện san sẻ kiến thức cho bạn bè, người dân trong cộng đồng.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 pt-2 border-t border-slate-100">
              ✓ Miễn phí vĩnh viễn
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Vừa là Thầy, Vừa là Trò
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mỗi người đều có ít nhất một kỹ năng đáng tự hào. Bạn có thể dạy tiếng Anh giao tiếp và đồng thời học lại cách bấm hợp âm đàn guitar, hay học cách nuôi men làm bánh từ người khác.
              </p>
            </div>
            <div className="text-xs font-semibold text-teal-700 pt-2 border-t border-slate-100">
              ✓ Trao đổi chéo bình đẳng
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Thực học - Thực hành 1-1
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thay vì các video bài giảng lý thuyết khô khan, các buổi học 1-1 cho phép người học được cầm tay chỉ việc, được hỏi đáp trực tiếp và linh hoạt sắp xếp thời gian rảnh của cả hai bên.
              </p>
            </div>
            <div className="text-xs font-semibold text-blue-700 pt-2 border-t border-slate-100">
              ✓ Sát thực tế đời sống
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works - 4 Simple Steps */}
      <section className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-10 space-y-8">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Quy trình tham gia
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Cách thức hoạt động trong 4 bước đơn giản
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-2xl">
            Chỉ mất chưa đầy 2 phút để bắt đầu hành trình sẻ chia hoặc nâng tầm kỹ năng bản thân.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2 border-l-2 border-emerald-500/40 pl-4">
            <div className="text-xs font-bold text-emerald-400 font-mono">BƯỚC 01</div>
            <h4 className="text-sm font-bold text-white">Tạo hồ sơ kỹ năng</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Đăng ký kỹ năng bạn có thể nhận dạy tình nguyện hoặc kỹ năng bạn đang tha thiết tìm người chỉ dạy.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-emerald-500/40 pl-4">
            <div className="text-xs font-bold text-emerald-400 font-mono">BƯỚC 02</div>
            <h4 className="text-sm font-bold text-white">Tìm kiếm & Ghép đôi AI</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Duyệt qua danh mục kỹ năng khu vực hoặc để trợ lý AI Gemini tự động tìm bạn học tương thích cao nhất.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-emerald-500/40 pl-4">
            <div className="text-xs font-bold text-emerald-400 font-mono">BƯỚC 03</div>
            <h4 className="text-sm font-bold text-white">Hẹn lịch học 1-1</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Gửi đề xuất khung giờ rảnh, chọn học online qua Google Meet hoặc hẹn gặp trực tiếp tại thư viện/cà phê.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-emerald-500/40 pl-4">
            <div className="text-xs font-bold text-emerald-400 font-mono">BƯỚC 04</div>
            <h4 className="text-sm font-bold text-white">Thực hành & Tri ân</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Tham gia buổi học, cùng thực hành làm ra kết quả, tích lũy giờ đóng góp và gửi lời tri ân người đồng hành.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenAIMatch}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thử tính năng Ghép đôi AI</span>
          </button>
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-emerald-900/80 hover:bg-emerald-900 border border-emerald-700/60 rounded-lg transition-colors cursor-pointer"
          >
            + Đăng ký chia sẻ kỹ năng
          </button>
        </div>
      </section>

      {/* 4. Community Standards & Cultural Code */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Quy tắc Văn hóa & Cam kết An toàn
            </h2>
            <p className="text-xs text-slate-500">
              Để giữ gìn môi trường học tập văn minh, tôn trọng và an toàn cho tất cả thành viên.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tôn trọng & Kiên nhẫn</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Mỗi học viên có tốc độ tiếp thu khác nhau, đặc biệt là người cao tuổi khi tiếp cận công nghệ số. Người dạy luôn giữ thái độ niềm nở, khuyến khích và lắng nghe.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tuyệt đối không thương mại hóa</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Nghiêm cấm mọi hành vi lợi dụng buổi học để bán khóa học, tiếp thị sản phẩm, kêu gọi đầu tư tài chính, đa cấp hoặc thu phí ngoài quy định.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bảo vệ quyền riêng tư & An toàn thông tin</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Không chia sẻ thông tin cá nhân, mã OTP ngân hàng, tài khoản nhạy cảm của người học. Luôn hướng dẫn nguyên tắc an ninh mạng cơ bản.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Không gian học tập công cộng văn minh</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Đối với các buổi học trực tiếp, hai bên luôn lựa chọn các địa điểm công cộng như thư viện, quán cà phê hoặc nhà văn hóa tổ dân phố.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (FAQ) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            <span>Câu hỏi Thường gặp (FAQ)</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Giải đáp những băn khoăn phổ biến của người dân khi lần đầu tham gia Ngân hàng Kỹ năng.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Call To Action Footer Banner */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 rounded-2xl border border-emerald-200 p-8 sm:p-10 text-center space-y-4 shadow-xs">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Cùng nhau xây dựng một cộng đồng học tập trọn đời
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Dù bạn là một kỹ sư dày dạn kinh nghiệm, một sinh viên giàu nhiệt huyết hay một bác hưu trí yêu đời — luôn có một người hàng xóm đang cần sự giúp đỡ của bạn!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={onExplore}
            className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <span>Khám phá danh sách kỹ năng ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenRegister}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            + Đăng ký chia sẻ kỹ năng
          </button>
        </div>
      </section>
    </div>
  );
};
