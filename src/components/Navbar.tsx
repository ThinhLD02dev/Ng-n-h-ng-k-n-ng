import React from 'react';
import { BookOpen, Sparkles, Calendar, User, PlusCircle, Info } from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'about' | 'ai-match' | 'sessions' | 'profile';
  setActiveTab: (tab: 'catalog' | 'about' | 'ai-match' | 'sessions' | 'profile') => void;
  onOpenRegisterModal: () => void;
  pendingSessionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegisterModal,
  pendingSessionsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div
            onClick={() => setActiveTab('about')}
            className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
              H05
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                Ngân hàng Kỹ năng Cộng đồng
              </span>
              <span className="text-xs text-slate-500 hidden sm:block">
                Dạy & học miễn phí cho nhau
              </span>
            </div>
          </div>

          {/* Zone 2: 5 clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'about'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Giới thiệu</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'catalog'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Khám phá kỹ năng</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-match')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'ai-match'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Ghép đôi AI Gemini
            </button>

            <button
              onClick={() => setActiveTab('sessions')}
              className={`relative flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'sessions'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Lịch học 1-1
              {pendingSessionsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-white rounded-full">
                  {pendingSessionsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              Hồ sơ của tôi
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegisterModal}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Đăng ký kỹ năng</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar for narrow viewports */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200/80 px-2 py-2 bg-slate-50/90 text-xs">
        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center py-1 px-2 cursor-pointer ${
            activeTab === 'about' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Info className="w-4 h-4 mb-0.5" />
          <span>Giới thiệu</span>
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center py-1 px-2 cursor-pointer ${
            activeTab === 'catalog' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Kỹ năng</span>
        </button>
        <button
          onClick={() => setActiveTab('ai-match')}
          className={`flex flex-col items-center py-1 px-2 cursor-pointer ${
            activeTab === 'ai-match' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-emerald-600" />
          <span>Ghép đôi</span>
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`relative flex flex-col items-center py-1 px-2 cursor-pointer ${
            activeTab === 'sessions' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Lịch học</span>
          {pendingSessionsCount > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 bg-amber-500 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center py-1 px-2 cursor-pointer ${
            activeTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>Hồ sơ</span>
        </button>
      </div>
    </header>
  );
};
