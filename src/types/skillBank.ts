export type SkillLevel = 'Cơ bản (Người mới)' | 'Trung cấp' | 'Thành thạo / Chuyên sâu';

export type LearningFormat = 'Trực tuyến' | 'Gặp trực tiếp' | 'Linh hoạt cả hai';

export type SkillCategory =
  | 'Tất cả'
  | 'Công nghệ & Kỹ năng số'
  | 'Ngoại ngữ & Giao tiếp'
  | 'Nghệ thuật & Thủ công'
  | 'Âm nhạc & Nhạc cụ'
  | 'Đời sống & Ẩm thực'
  | 'Kỹ năng số cho người lớn tuổi'
  | 'Sửa chữa & Điện gia dụng'
  | 'Sức khỏe & Rèn luyện';

export interface SkillOffering {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  format: LearningFormat;
  description: string;
  curriculumHighlight: string[];
}

export interface SkillDemand {
  id: string;
  name: string;
  category: SkillCategory;
  desiredLevel: SkillLevel;
  targetGoal: string;
}

export interface WeeklyAvailability {
  day: 'Thứ 2' | 'Thứ 3' | 'Thứ 4' | 'Thứ 5' | 'Thứ 6' | 'Thứ 7' | 'Chủ nhật';
  timeSlots: string[]; // e.g., '19:00 - 21:00'
}

export interface CommunityMember {
  id: string;
  name: string;
  roleTitle: string; // e.g., "Kỹ sư phần mềm & Người yêu đàn Guitar"
  avatar: string;
  district: string;
  city: string;
  bio: string;
  contactZalo?: string;
  contactEmail?: string;
  joinedDate: string;
  hoursShared: number;
  rating: number;
  reviewCount: number;
  skillsToTeach: SkillOffering[];
  skillsToLearn: SkillDemand[];
  availability: WeeklyAvailability[];
}

export type SessionStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface ExchangeSession {
  id: string;
  createdAt: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  skillName: string;
  category: string;
  role: 'teach' | 'learn';
  dateTime: string;
  format: LearningFormat;
  locationOrPlatform: string;
  status: SessionStatus;
  note: string;
  meetingLink?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export interface AIMatchAnalysis {
  mentorId: string;
  score: number; // 0 - 100
  isMutualExchange: boolean;
  whyMatch: string;
  suggestedRoadmap: string[];
}
