# Ngân hàng Kỹ năng Cộng đồng (H05)

Nền tảng gắn kết cộng đồng hỗ trợ người dân đăng ký dạy và học kỹ năng hoàn toàn miễn phí cho nhau, kết hợp công cụ tìm kiếm theo nhu cầu, hồ sơ kỹ năng cá nhân hóa và thuật toán ghép nối thông minh hỗ trợ bởi AI.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Dưới đây là các định hướng trọng tâm đã được thống nhất sau vòng làm rõ yêu cầu (Phase 1):

- **Mô hình kết nối**: Trao đổi tự nguyện 1-1 và lập lịch học linh hoạt. Người học có thể gửi yêu cầu trực tiếp tới người dạy phù hợp, cùng thống nhất lịch rảnh và hình thức học (trực tuyến hoặc gặp mặt trực tiếp tại địa phương).
- **Phong cách giao diện**: Thân thiện, gần gũi với gam màu xanh ngọc lục bảo (Emerald Green) tươi sáng trên nền canvas sạch sẽ (`#FBFDF9` / `#FFFFFF`), tuân thủ triệt để nguyên tắc thiết kế chống "AI slop" (không lạm dụng pill badge vụn vặt, typography rõ ràng, tương phản đạt chuẩn WCAG AA).
- **Trợ lý AI Gemini thông minh**: Tích hợp server-side Gemini API để phân tích mục tiêu học tập, năng lực giảng dạy, khung giờ rảnh và vị trí để đưa ra điểm số tương thích, phân tích lý do phù hợp và gợi ý kế hoạch bài học buổi đầu tiên.

---

## 1. Overview & Core Concept

### Mục đích & Giá trị mang lại
"Ngân hàng Kỹ năng Cộng đồng" giải quyết bài toán chia sẻ tri thức bình dân trong cộng đồng dân cư:
- Mỗi cá nhân đều có một thế mạnh riêng (ngoại ngữ giao tiếp, lập trình, sửa chữa điện thoại/máy tính, làm bánh, chơi guitar, chụp ảnh, kỹ năng tin học văn phòng cho người lớn tuổi, chăm sóc cây cảnh...).
- Nền tảng tạo môi trường tin cậy để mọi người trao đổi kỹ năng cho nhau mà không tốn chi phí, thúc đẩy tinh thần học tập trọn đời và gắn kết cộng đồng.

### Đối tượng sử dụng
- **Người muốn chia sẻ kỹ năng (Người dạy tình nguyện)**: Sinh viên, chuyên viên, nghệ nhân hoặc người có kinh nghiệm muốn đóng góp kiến thức cho xã hội.
- **Người có nhu cầu học (Người học)**: Người đi làm muốn học thêm ngoại ngữ/kỹ năng mới, học sinh sinh viên tìm người hướng dẫn, phụ huynh muốn con học kỹ năng sống hoặc người cao tuổi muốn học kỹ năng số.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[ Khám phá & Tìm kiếm ]
       │
       ├──> Bộ lọc: Danh mục kỹ năng, Nhu cầu (Cần học / Nhận dạy), Hình thức (Online/Offline), Khu vực
       │
       ├──> Hồ sơ chi tiết thành viên (Kỹ năng có thể dạy, Kỹ năng muốn học, Thời gian rảnh, Đánh giá)
       │
       ├──> [ Ghép nối thông minh bằng AI ]: So khớp hồ sơ người dùng hiện tại với cộng đồng
       │
       └──> [ Gửi đề xuất trao đổi & Đặt lịch học ]:
                └── Chọn khung giờ rảnh -> Gửi tin nhắn ngỏ lời -> Quản lý lịch hẹn học 1-1
```

1. **Khám phá & Tìm kiếm theo nhu cầu**:
   - Thanh tìm kiếm từ khóa kết hợp chọn nhanh danh mục (Công nghệ, Ngoại ngữ, Nghệ thuật & Âm nhạc, Đời sống & Gia đình, Kỹ năng số cho người lớn tuổi...).
   - Bộ lọc chuyển đổi giữa "Người nhận dạy miễn phí" và "Người đang cần tìm thầy".
   - Bộ lọc hình thức (Trực tuyến qua Google Meet / Trực tiếp tại Thư viện, Quán cà phê cộng đồng).

2. **Hồ sơ kỹ năng (Skill Profile)**:
   - Thông tin cá nhân, giới thiệu ngắn gọn, khu vực sinh sống.
   - Danh sách kỹ năng có thể dạy (kèm mức độ thành thạo, đối tượng phù hợp, giáo trình tóm tắt).
   - Danh sách kỹ năng mong muốn học (mục tiêu cần đạt).
   - Khung giờ rảnh trong tuần (Sáng/Chiều/Tối - Thứ 2 đến Chủ nhật).
   - Huy hiệu đóng góp cộng đồng và đánh giá từ học viên trước.

3. **Trung tâm Ghép nối Thông minh (AI Smart Matchmaker)**:
   - Người dùng chỉ cần nhập nhu cầu hoặc dùng hồ sơ sẵn có.
   - Hệ thống (được hỗ trợ bởi Gemini API) tìm kiếm các cặp đôi "Cung - Cầu kỹ năng" bù trừ lẫn nhau (Ví dụ: Bạn dạy Tiếng Anh - muốn học Guitar, hệ thống ghép đôi với người chơi Guitar thành thạo đang muốn luyện IELTS).
   - Hiển thị tỷ lệ tương thích (%), lý do gợi ý ghép đôi và đề xuất lộ trình 3 buổi học đầu tiên.

4. **Quản lý Đề xuất & Lịch học 1-1**:
   - Gửi yêu cầu trao đổi kỹ năng với lời nhắn chân thành và chọn ngày giờ đề xuất.
   - Bảng quản lý buổi học: Chờ xác nhận, Đã lên lịch, Đã hoàn thành.
   - Tích hợp ghi chú buổi học và phản hồi cảm ơn sau khi học.

5. **Đăng ký kỹ năng mới nhanh chóng**:
   - Form trực quan giúp người dùng đăng ký kỹ năng mình có thể dạy hoặc muốn học chỉ trong 1 phút.

### Visual Identity & Theme
- **Phong cách thẩm mỹ**: Thân thiện, ấm áp, văn minh cộng đồng, bố cục thoáng đãng và có nhịp điệu.
- **Bảng màu (60-30-10 Color Budget)**:
  - Canvas chính (60%): Trắng tinh khôi và xanh mầm non ngả phấn kem nhạt (`#FBFDF9`, `#FFFFFF`).
  - Cấu trúc & Bề mặt (30%): Khung thẻ viền hairline (`#E2E8F0`, `#E8F0E9`), bề mặt Slate nhạt (`#F1F5F9`).
  - Điểm nhấn hành động (10%): Xanh ngọc lục bảo tươi tắn (`#059669` / `emerald-600`), nhấn phụ xanh hồ nước trong mát (`#0284C7`).
- **Typography**:
  - Tiêu đề & Thương hiệu: `Plus Jakarta Sans` trọng số SemiBold/Bold, tự nhiên, hiện đại.
  - Văn bản nội dung: `Plus Jakarta Sans` đều đặn, kích thước 15px-16px, line-height 1.6 dễ đọc cho cả người lớn tuổi.
  - Số liệu & Thời gian: `font-mono tabular-nums` cho khung giờ học và thời lượng.
- **Kỷ luật Zero-Pill**: Metadata ngày tháng, khu vực, cấp độ hiển thị dưới dạng văn bản thanh lịch kèm dấu phân cách typographic (`·`), không dùng các hộp pill bo tròn sặc sỡ tràn lan.

---

## 3. Key Product Decisions & Trade-Offs

- **Server-Side Gemini API Proxy**:
  - *Lựa chọn*: Tích hợp proxy endpoint `/api/match-skills` và `/api/generate-lesson-plan` trên Express backend để gọi `@google/genai` với model `gemini-3.8-flash`.
  - *Lý do*: Bảo mật an toàn tuyệt đối cho `GEMINI_API_KEY`, không lộ ra browser, phản hồi nhanh chóng và có cơ chế fallback thuật toán nếu API chưa có key.
- **Lưu trữ dữ liệu ứng dụng (State & LocalStorage)**:
  - *Lựa chọn*: Kho dữ liệu phong phú ban đầu (seed data gồm 12+ hồ sơ người dạy/người học tiêu biểu các quận huyện với đa dạng kỹ năng đời sống thực tế) đồng bộ qua `localStorage`.
  - *Lý do*: Người dùng có thể ngay lập tức trải nghiệm đầy đủ tính năng thêm hồ sơ cá nhân, tìm kiếm, lọc, gửi yêu cầu ghép đôi và xem lịch hẹn lưu lại mà không cần cấu hình phức tạp.
- **Cơ chế trao đổi linh hoạt 1-1 thay vì tiền tệ/điểm số**:
  - *Lựa chọn*: Đề cao tính tương trợ cộng đồng "Người đi trước giúp người đi sau", không gò bó số giờ khắt khe, có thể vừa dạy vừa học chéo hoặc dạy tình nguyện thuần túy.

---

## 4. Technical Architecture & Data Strategy

### System & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Navigation (Top Bar)                        │
│   Wordmark: Ngân hàng Kỹ năng Cộng đồng  ─  Tabs: Khám phá, Ghép đôi   │
│                 AI, Lịch học của tôi  ─  CTA: Đăng ký kỹ năng          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼───────────────────────────┐
       ▼                            ▼                           ▼
┌──────────────┐             ┌──────────────┐            ┌──────────────┐
│  Khám phá &  │             │   Ghép đôi   │            │   Lịch học   │
│  Tìm kiếm    │             │   AI Gemini  │            │   & Đề xuất  │
│  (Catalog)   │             │  (Matchmaker)│            │  (Sessions)  │
└──────┬───────┘             └──────┬───────┘            └──────┬───────┘
       │                            │                           │
       ├────────────────────────────┴───────────────────────────┤
       ▼                                                        ▼
┌───────────────────────────────────────────┐  ┌─────────────────────────┐
│        Community Store & State            │  │  Express API Server     │
│ (Profiles, Skills, Requests, MyProfile)   │  │  /api/match-skills      │
│ Persistent in browser LocalStorage        │  │  @google/genai SDK      │
└───────────────────────────────────────────┘  └─────────────────────────┘
```

### Data Entities
1. **UserProfile**: `id`, `name`, `avatar`, `district`, `city`, `bio`, `contact` (zalo/phone/email), `rating`, `exchangeCount`, `skillsToTeach: SkillOffering[]`, `skillsToLearn: SkillDemand[]`, `availableTimes: AvailableSchedule[]`.
2. **SkillOffering**: `id`, `name`, `category`, `level`, `format` (online/offline/both), `description`, `curriculumBrief`.
3. **SkillDemand**: `id`, `name`, `category`, `desiredLevel`, `targetNote`.
4. **ExchangeSession**: `id`, `senderId`, `receiverId`, `skillName`, `role` (teaching/learning), `dateTime`, `format`, `locationOrLink`, `status` (`pending` | `accepted` | `completed` | `cancelled`), `note`.
5. **AIMatchResult**: `matchedProfile`, `compatibilityScore`, `mutualMatch` (boolean), `reasonSummary`, `suggestedTopicRoadmap`.

---

## 5. Verification & Testing Plan

1. **Kiểm tra build & biên dịch**: Chạy `compile_applet` để đảm bảo TypeScript và Tailwind CSS 4 hoạt động hoàn hảo không có lỗi.
2. **Kiểm tra luồng chức năng**:
   - Lọc kỹ năng theo từ khóa, danh mục và hình thức trực tuyến/trực tiếp.
   - Thử nghiệm tính năng tạo hồ sơ cá nhân và kỹ năng muốn dạy/học.
   - Thử nghiệm công cụ Ghép đôi thông minh bằng AI Gemini, kiểm tra trường hợp phân tích tương thích 2 chiều.
   - Thử nghiệm gửi lời mời trao đổi học tập và cập nhật trạng thái trong mục "Lịch học của tôi".
