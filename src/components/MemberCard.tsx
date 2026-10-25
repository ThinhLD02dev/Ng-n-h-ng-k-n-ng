import React from 'react';
import { CommunityMember } from '../types/skillBank';
import { Star, MapPin, Clock, Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';

interface MemberCardProps {
  member: CommunityMember;
  onViewProfile: (member: CommunityMember) => void;
  onRequestSession: (member: CommunityMember) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onViewProfile,
  onRequestSession,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden">
      {/* Card Header & Profile info */}
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to initials
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className =
                  'w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-sm border border-emerald-200';
                fallback.innerText = member.name.charAt(0);
                parent.prepend(fallback);
              }
            }}
          />

          <div className="min-w-0 flex-1">
            <h3
              onClick={() => onViewProfile(member)}
              className="text-base font-bold text-slate-900 truncate hover:text-emerald-700 cursor-pointer transition-colors"
            >
              {member.name}
            </h3>
            <p className="text-xs text-slate-500 truncate">{member.roleTitle}</p>

            {/* Zero-pill metadata with separators */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {member.district}, {member.city}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-slate-700">{member.rating}</span>
                <span>({member.reviewCount})</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{member.hoursShared}h đã dạy</span>
            </div>
          </div>
        </div>

        {/* Bio quote */}
        <p className="text-xs text-slate-600 line-clamp-2 mt-3 italic">
          "{member.bio}"
        </p>

        {/* Section: Skills To Teach */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            Nhận dạy miễn phí:
          </div>
          <div className="space-y-2">
            {member.skillsToTeach.map((skill) => (
              <div
                key={skill.id}
                className="bg-emerald-50/50 rounded-lg p-2.5 border border-emerald-100"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                  <span className="truncate pr-2">{skill.name}</span>
                  <span className="text-[11px] font-normal text-emerald-700 shrink-0">
                    {skill.format}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {skill.description}
                </p>
                {/* Zero-pill curriculum text */}
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1.5 flex-wrap">
                  <span className="text-emerald-700 font-medium">Nội dung chính:</span>
                  <span>{skill.curriculumHighlight.slice(0, 2).join(' · ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Skills Wanted to Learn */}
        {member.skillsToLearn.length > 0 && (
          <div className="mt-3 pt-2">
            <div className="text-xs font-medium text-slate-500 mb-1">
              Đang mong muốn học lại:
            </div>
            <div className="text-xs text-slate-700 font-medium bg-slate-50 rounded-md p-2 border border-slate-200/60">
              <span className="text-slate-900">{member.skillsToLearn[0].name}</span>
              <span className="text-slate-500 block text-[11px] font-normal mt-0.5 truncate">
                Mục tiêu: {member.skillsToLearn[0].targetGoal}
              </span>
            </div>
          </div>
        )}

        {/* Availability snippet */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">
            Lịch rảnh:{' '}
            {member.availability.map((a) => `${a.day} (${a.timeSlots[0]})`).join(', ')}
          </span>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onViewProfile(member)}
          className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors text-center whitespace-nowrap cursor-pointer"
        >
          Xem chi tiết
        </button>

        <button
          onClick={() => onRequestSession(member)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors text-center flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer shadow-2xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Đề xuất học 1-1</span>
        </button>
      </div>
    </div>
  );
};
