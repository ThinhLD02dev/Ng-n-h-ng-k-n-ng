import React, { useState, useEffect } from 'react';
import { CommunityMember, LearningFormat, ExchangeSession } from '../types/skillBank';
import { X, Calendar, Clock, Video, MapPin, Send, MessageSquare } from 'lucide-react';

interface RequestSessionModalProps {
  member: CommunityMember | null;
  prefilledSkill?: string;
  currentUser: CommunityMember;
  onClose: () => void;
  onSubmitSession: (sessionData: Omit<ExchangeSession, 'id' | 'createdAt' | 'status'>) => void;
}

export const RequestSessionModal: React.FC<RequestSessionModalProps> = ({
  member,
  prefilledSkill,
  currentUser,
  onClose,
  onSubmitSession,
}) => {
  if (!member) return null;

  const [selectedSkill, setSelectedSkill] = useState<string>(
    prefilledSkill || member.skillsToTeach[0]?.name || ''
  );
  const [selectedFormat, setSelectedFormat] = useState<LearningFormat>('Trực tuyến');
  const [dateTime, setDateTime] = useState<string>('Thứ 7 tuần này, 14:00 - 15:30');
  const [locationOrPlatform, setLocationOrPlatform] = useState<string>('Google Meet');
  const [note, setNote] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledSkill) {
      setSelectedSkill(prefilledSkill);
    } else if (member.skillsToTeach[0]) {
      setSelectedSkill(member.skillsToTeach[0].name);
    }
  }, [prefilledSkill, member]);

  // Adjust default platform/location when format toggles
  const handleFormatChange = (format: LearningFormat) => {
    setSelectedFormat(format);
    if (format === 'Trực tuyến') {
      setLocationOrPlatform('Google Meet (Đường link sẽ tự động tạo)');
    } else {
      setLocationOrPlatform(`Thư viện cộng đồng hoặc Quán cà phê tại ${member.district}, ${member.city}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkill) {
      setError('Vui lòng chọn kỹ năng bạn muốn học');
      return;
    }
    if (!dateTime.trim()) {
      setError('Vui lòng nhập thời gian hẹn học');
      return;
    }

    setSubmitting(true);

    const generatedMeetingLink =
      selectedFormat === 'Trực tuyến'
        ? `https://meet.google.com/com-${Math.random().toString(36).substring(2, 7)}`
        : '';

    onSubmitSession({
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: member.id,
      receiverName: member.name,
      skillName: selectedSkill,
      category:
        member.skillsToTeach.find((s) => s.name === selectedSkill)?.category ||
        'Kỹ năng cộng đồng',
      role: 'learn',
      dateTime,
      format: selectedFormat,
      locationOrPlatform,
      note: note.trim() || 'Chào bạn, mình rất muốn được cùng bạn học hỏi và trao đổi kỹ năng này!',
      meetingLink: generatedMeetingLink,
    });

    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Đề xuất buổi học 1-1 miễn phí
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Target Member Card */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-bold text-slate-900 text-sm">{member.name}</div>
              <div className="text-slate-500">
                {member.district}, {member.city} · Lịch rảnh:{' '}
                {member.availability.map((a) => `${a.day} (${a.timeSlots[0]})`).join(', ')}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          {/* Skill Selector */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Kỹ năng bạn muốn đề xuất học:
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900 font-medium"
            >
              {member.skillsToTeach.map((skill) => (
                <option key={skill.id} value={skill.name}>
                  {skill.name} ({skill.level})
                </option>
              ))}
            </select>
          </div>

          {/* Learning Format */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Hình thức học:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFormatChange('Trực tuyến')}
                className={`p-2.5 rounded-lg border text-left font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                  selectedFormat === 'Trực tuyến'
                    ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                <Video className="w-4 h-4 text-blue-600" />
                <span>Trực tuyến (Google Meet)</span>
              </button>

              <button
                type="button"
                onClick={() => handleFormatChange('Gặp trực tiếp')}
                className={`p-2.5 rounded-lg border text-left font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                  selectedFormat === 'Gặp trực tiếp'
                    ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Gặp trực tiếp</span>
              </button>
            </div>
          </div>

          {/* Suggested Date & Time */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Khung thời gian đề xuất:
            </label>
            <input
              type="text"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="VD: Thứ 7 tuần này, 14:00 - 15:30"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Gợi ý: Hãy chọn khung giờ phù hợp với lịch rảnh của người dạy để dễ dàng được xác nhận.
            </p>
          </div>

          {/* Location or meeting notes */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Địa điểm / Kênh trao đổi:
            </label>
            <input
              type="text"
              value={locationOrPlatform}
              onChange={(e) => setLocationOrPlatform(e.target.value)}
              placeholder="Google Meet, Zalo hoặc Địa chỉ quán cà phê/thư viện"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>

          {/* Sincere note */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Lời nhắn gửi người dạy (Mục tiêu học, điều bạn đang băn khoăn):
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Chào bạn, mình rất muốn bắt đầu học kỹ năng này vì... Mình đã có chuẩn bị... Rất mong được bạn hướng dẫn!"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi đề xuất học</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
