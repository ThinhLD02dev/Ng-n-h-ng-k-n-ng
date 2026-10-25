import React from 'react';
import { CommunityMember } from '../types/skillBank';
import { X, MapPin, Star, Calendar, Clock, MessageSquare, BookOpen, HeartHandshake } from 'lucide-react';

interface MemberDetailModalProps {
  member: CommunityMember | null;
  onClose: () => void;
  onRequestSession: (member: CommunityMember, prefilledSkill?: string) => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  member,
  onClose,
  onRequestSession,
}) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Hồ sơ thành viên cộng đồng
            </span>
            <span className="text-xs text-slate-400">Tham gia từ {member.joinedDate}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top user profile banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-xs shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
              <p className="text-xs sm:text-sm text-slate-600">{member.roleTitle}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {member.district}, {member.city}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-800">{member.rating}</span>
                  <span>({member.reviewCount} đánh giá)</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums font-semibold text-emerald-700">
                  {member.hoursShared} giờ đóng góp
                </span>
              </div>
            </div>
          </div>

          {/* Bio statement */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
            "{member.bio}"
          </div>

          {/* Section: Skills to teach */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-3">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Kỹ năng nhận dạy tình nguyện</span>
            </h4>
            <div className="space-y-3">
              {member.skillsToTeach.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-100 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{skill.name}</span>
                    <span className="text-xs text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                      {skill.format}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{skill.description}</p>
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-slate-700 block mb-1">
                      Nội dung thực hành trọng tâm:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                      {skill.curriculumHighlight.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Skills wanted to learn */}
          {member.skillsToLearn.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-3">
                <HeartHandshake className="w-4 h-4 text-teal-600" />
                <span>Kỹ năng đang mong muốn học hỏi lại</span>
              </h4>
              <div className="space-y-2">
                {member.skillsToLearn.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700"
                  >
                    <div className="font-bold text-slate-900">{skill.name}</div>
                    <div className="text-slate-500 mt-0.5">
                      Trình độ mong muốn: {skill.desiredLevel} · Mục tiêu: {skill.targetGoal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timetable Availability */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-3">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>Khung giờ rảnh trong tuần</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {member.availability.map((av, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 text-xs"
                >
                  <span className="font-bold text-slate-800 block">{av.day}</span>
                  <span className="text-slate-500 font-mono tabular-nums text-[11px]">
                    {av.timeSlots.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestSession(member, member.skillsToTeach[0]?.name || '');
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Gửi đề xuất học 1-1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
