import React, { useState } from 'react';
import { CommunityMember } from '../types/skillBank';
import { Sparkles, ArrowRight, CheckCircle2, RotateCw, HeartHandshake, UserCheck, MessageSquare, Lightbulb } from 'lucide-react';

interface AIMatchmakerViewProps {
  currentUser: CommunityMember;
  members: CommunityMember[];
  onOpenSessionModal: (member: CommunityMember, prefilledSkill?: string) => void;
  onViewProfile: (member: CommunityMember) => void;
  onEditProfile: () => void;
}

interface MatchResult {
  memberId: string;
  score: number;
  isMutualExchange: boolean;
  matchReason: string;
  suggestedRoadmap: string[];
}

export const AIMatchmakerView: React.FC<AIMatchmakerViewProps> = ({
  currentUser,
  members,
  onOpenSessionModal,
  onViewProfile,
  onEditProfile,
}) => {
  const [loading, setLoading] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult[] | null>(null);
  const [matchSource, setMatchSource] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const runAIMatch = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/match-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUser,
          members: members.filter((m) => m.id !== currentUser.id),
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi từ máy chủ khi phân tích ghép đôi');
      }

      const data = await response.json();
      setMatchResults(data.matches || []);
      setMatchSource(data.source || 'gemini-ai');
    } catch (err: any) {
      console.error('Match error:', err);
      setErrorMsg('Không thể kết nối đến máy chủ AI. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Find member object for each match result
  const resolvedMatches = matchResults?.map((res) => ({
    ...res,
    member: members.find((m) => m.id === res.memberId),
  })).filter((item) => item.member !== undefined);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Thuật toán Ghép nối Trợ lý AI Gemini</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ghép Đôi Kỹ Năng Thông Minh 1-1
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Hệ thống phân tích mục tiêu học tập, năng lực giảng dạy, khung giờ rảnh và khu vực của bạn
            để tìm ra những người phù hợp nhất trong cộng đồng — đặc biệt ưu tiên các cơ hội trao đổi chéo (Bạn dạy họ, họ dạy lại bạn).
          </p>

          <div className="pt-2">
            <button
              onClick={runAIMatch}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 active:bg-emerald-400 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>AI đang phân tích & đối chiếu hồ sơ...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{matchResults ? 'Chạy lại phân tích ghép đôi' : 'Bắt đầu ghép đôi bằng AI ngay'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Current User Profile Summary strip */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Hồ sơ trao đổi của bạn:
          </div>
          <div className="text-sm font-bold text-slate-900 mt-1">{currentUser.name} ({currentUser.district}, {currentUser.city})</div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
            <div>
              <span className="font-semibold text-emerald-700">Kỹ năng bạn nhận dạy:</span>{' '}
              {currentUser.skillsToTeach.map((s) => s.name).join(', ') || 'Chưa đăng ký'}
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div>
              <span className="font-semibold text-amber-700">Kỹ năng bạn muốn học:</span>{' '}
              {currentUser.skillsToLearn.map((s) => s.name).join(', ') || 'Chưa đăng ký'}
            </div>
          </div>
        </div>

        <button
          onClick={onEditProfile}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0 cursor-pointer self-start md:self-center"
        >
          Chỉnh sửa mục tiêu & kỹ năng →
        </button>
      </div>

      {/* Error state */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 text-red-800 text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* Results Section */}
      {matchResults && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Gợi ý ghép đôi hàng đầu cho bạn ({resolvedMatches?.length || 0})
            </h3>
            <span className="text-xs text-slate-500">
              {matchSource === 'gemini-ai' ? 'Phân tích bởi Gemini 3.8 Flash' : 'Phân tích thuật toán'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {resolvedMatches && resolvedMatches.map((res, index) => {
              const member = res.member!;
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Left: Member info & Match badge */}
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover shrink-0 border border-slate-200"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4
                            onClick={() => onViewProfile(member)}
                            className="text-lg font-bold text-slate-900 hover:text-emerald-700 cursor-pointer truncate"
                          >
                            {member.name}
                          </h4>

                          {/* Match score label */}
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 tabular-nums">
                            {res.score}% Tương thích
                          </span>

                          {res.isMutualExchange && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                              <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
                              <span>Trao đổi chéo 2 chiều (Win-Win)</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 mt-0.5">
                          {member.roleTitle} · {member.district}, {member.city}
                        </p>

                        {/* AI Match Reason */}
                        <div className="mt-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-xs text-slate-700 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                            <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Tại sao hai bạn nên kết nối:</span>
                          </div>
                          <p className="leading-relaxed">{res.matchReason}</p>
                        </div>

                        {/* Suggested 3-Step Roadmap */}
                        {res.suggestedRoadmap && res.suggestedRoadmap.length > 0 && (
                          <div className="mt-3">
                            <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                              Lộ trình 3 buổi học gợi ý từ AI:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {res.suggestedRoadmap.map((step, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 bg-slate-50 rounded-md border border-slate-200/60 text-[11px] text-slate-700 leading-snug"
                                >
                                  <span className="font-bold text-emerald-700 mr-1">
                                    0{idx + 1}.
                                  </span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-end gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <button
                        onClick={() =>
                          onOpenSessionModal(
                            member,
                            member.skillsToTeach[0]?.name || ''
                          )
                        }
                        className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Đề xuất học 1-1 ngay</span>
                      </button>

                      <button
                        onClick={() => onViewProfile(member)}
                        className="flex-1 lg:flex-none px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center"
                      >
                        Xem toàn bộ hồ sơ
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pre-run explanatory prompt */}
      {!matchResults && !loading && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Sẵn sàng kết nối cùng người dạy tương thích?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Nhấn nút <strong className="text-emerald-700">Bắt đầu ghép đôi bằng AI ngay</strong> ở trên để hệ thống tự động tìm kiếm các thành viên trong khu phố có kỹ năng bạn muốn học và sẵn lòng cùng bạn trao đổi tri thức.
          </p>
        </div>
      )}
    </div>
  );
};
