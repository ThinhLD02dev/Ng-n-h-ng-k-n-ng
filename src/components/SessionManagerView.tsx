import React, { useState } from 'react';
import { ExchangeSession, SessionStatus } from '../types/skillBank';
import { Calendar, Clock, MapPin, Video, CheckCircle, XCircle, Star, MessageSquare, Sparkles, BookOpen } from 'lucide-react';

interface SessionManagerViewProps {
  sessions: ExchangeSession[];
  onUpdateSessionStatus: (sessionId: string, newStatus: SessionStatus) => void;
  onSubmitFeedback: (sessionId: string, rating: number, comment: string) => void;
  onExploreSkills: () => void;
}

export const SessionManagerView: React.FC<SessionManagerViewProps> = ({
  sessions,
  onUpdateSessionStatus,
  onSubmitFeedback,
  onExploreSkills,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');
  const [reviewingSessionId, setReviewingSessionId] = useState<string | null>(null);
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [commentInput, setCommentInput] = useState<string>('');

  // Roadmap generation state per session
  const [loadingRoadmapId, setLoadingRoadmapId] = useState<string | null>(null);
  const [activeRoadmap, setActiveRoadmap] = useState<{ sessionId: string; data: any } | null>(null);

  const filteredSessions = sessions.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const handleOpenReview = (sessionId: string) => {
    setReviewingSessionId(sessionId);
    setRatingInput(5);
    setCommentInput('');
  };

  const handleSaveReview = (sessionId: string) => {
    onSubmitFeedback(sessionId, ratingInput, commentInput || 'Buổi học rất hữu ích và tận tâm!');
    setReviewingSessionId(null);
  };

  const handleGenerateRoadmap = async (session: ExchangeSession) => {
    setLoadingRoadmapId(session.id);
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillName: session.skillName,
          teacherName: session.role === 'learn' ? session.receiverName : session.senderName,
          learnerGoal: session.note,
        }),
      });
      const data = await res.json();
      setActiveRoadmap({ sessionId: session.id, data: data.roadmap });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRoadmapId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Quản lý Lịch học & Đề xuất 1-1
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Theo dõi các buổi hẹn trao đổi kỹ năng, xác nhận lời mời và ghi nhận đánh giá đóng góp cộng đồng.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/80 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả ({sessions.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filter === 'pending' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chờ duyệt ({sessions.filter((s) => s.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filter === 'accepted' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sắp tới ({sessions.filter((s) => s.status === 'accepted').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filter === 'completed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đã xong ({sessions.filter((s) => s.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Sessions List */}
      {filteredSessions.length > 0 ? (
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Session main details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold text-slate-900">
                      {session.skillName}
                    </span>

                    {/* Zero-pill status text with semantic indicator */}
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                        session.status === 'pending'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : session.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : session.status === 'completed'
                          ? 'bg-slate-100 text-slate-800 border border-slate-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {session.status === 'pending' && '⏳ Chờ xác nhận'}
                      {session.status === 'accepted' && '✓ Đã xác nhận'}
                      {session.status === 'completed' && '★ Đã hoàn thành'}
                      {session.status === 'cancelled' && '✕ Đã hủy'}
                    </span>

                    <span className="text-xs text-slate-400">
                      Gửi lúc: {session.createdAt}
                    </span>
                  </div>

                  {/* Role & Partner text */}
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">
                      {session.role === 'learn' ? 'Người hướng dẫn:' : 'Học viên:'}
                    </span>{' '}
                    {session.role === 'learn' ? session.receiverName : session.senderName}
                    <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
                    <span className="font-semibold text-slate-800">Vai trò của bạn:</span>{' '}
                    {session.role === 'learn' ? 'Người học' : 'Người dạy tình nguyện'}
                  </div>

                  {/* Time & Location metadata */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1">
                    <span className="flex items-center gap-1.5 font-mono tabular-nums text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {session.dateTime}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      {session.format === 'Trực tuyến' ? (
                        <Video className="w-3.5 h-3.5 text-blue-500" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span>{session.format}: {session.locationOrPlatform}</span>
                    </span>
                  </div>

                  {/* User Note */}
                  {session.note && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 text-xs text-slate-600 italic">
                      "{session.note}"
                    </div>
                  )}

                  {/* Feedback display if already completed */}
                  {session.feedback && (
                    <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>Đánh giá buổi học ({session.feedback.rating}/5 sao):</span>
                      </div>
                      <p>{session.feedback.comment}</p>
                    </div>
                  )}
                </div>

                {/* Right Actions column */}
                <div className="flex flex-col sm:items-end justify-between gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* Status update triggers */}
                  {session.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateSessionStatus(session.id, 'accepted')}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Đồng ý lịch học</span>
                      </button>
                      <button
                        onClick={() => onUpdateSessionStatus(session.id, 'cancelled')}
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-slate-300 transition-colors cursor-pointer"
                      >
                        Từ chối
                      </button>
                    </div>
                  )}

                  {session.status === 'accepted' && (
                    <div className="flex flex-col sm:items-end gap-2">
                      {session.meetingLink && (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Vào phòng học Google Meet</span>
                        </a>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleGenerateRoadmap(session)}
                          disabled={loadingRoadmapId === session.id}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            {loadingRoadmapId === session.id
                              ? 'Đang tạo lộ trình...'
                              : 'AI gợi ý giáo trình'}
                          </span>
                        </button>

                        <button
                          onClick={() => onUpdateSessionStatus(session.id, 'completed')}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg cursor-pointer"
                        >
                          Đánh dấu đã hoàn thành
                        </button>
                      </div>
                    </div>
                  )}

                  {session.status === 'completed' && !session.feedback && (
                    <button
                      onClick={() => handleOpenReview(session.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>Viết cảm nhận & Đánh giá</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible AI Roadmap drawer if active */}
              {activeRoadmap && activeRoadmap.sessionId === session.id && (
                <div className="mt-4 pt-4 border-t border-emerald-100 bg-emerald-50/40 -mx-5 -mb-5 p-5 rounded-b-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <BookOpen className="w-4 h-4 text-emerald-700" />
                      <span>{activeRoadmap.data.title || 'Lộ trình buổi học gợi ý từ Gemini AI'}</span>
                    </div>
                    <button
                      onClick={() => setActiveRoadmap(null)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Đóng
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeRoadmap.data.sessions?.map((s: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-lg border border-emerald-100 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>Buổi {s.sessionNumber}: {s.title}</span>
                          <span className="text-[10px] text-slate-500 font-normal">{s.duration}</span>
                        </div>
                        <ul className="text-slate-600 text-[11px] list-disc list-inside space-y-0.5">
                          {s.keyPoints?.map((p: string, pIdx: number) => (
                            <li key={pIdx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Form drawer */}
              {reviewingSessionId === session.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900">
                    Cảm nhận buổi học cùng {session.role === 'learn' ? session.receiverName : session.senderName}:
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Mức độ hài lòng:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRatingInput(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= ratingInput
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Viết vài lời cảm ơn và chia sẻ sự tận tâm của người bạn cùng học..."
                    rows={2}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setReviewingSessionId(null)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Bỏ qua
                    </button>
                    <button
                      onClick={() => handleSaveReview(session.id)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
                    >
                      Gửi đánh giá
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
          <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">
            {filter === 'all'
              ? 'Bạn chưa có lịch học nào'
              : `Không có buổi học ở mục "${filter}"`}
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            Hãy khám phá các kỹ năng trong cộng đồng hoặc dùng tính năng ghép đôi AI để gửi lời mời học đầu tiên!
          </p>
          <button
            onClick={onExploreSkills}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer"
          >
            Khám phá danh sách người dạy ngay
          </button>
        </div>
      )}
    </div>
  );
};
