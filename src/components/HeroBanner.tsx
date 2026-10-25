import React from 'react';
import { Sparkles, ArrowRight, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';

interface HeroBannerProps {
  onExplore: () => void;
  onOpenAIMatch: () => void;
  onOpenRegister: () => void;
  onOpenAbout: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExplore,
  onOpenAIMatch,
  onOpenRegister,
  onOpenAbout,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-emerald-50/20 to-transparent border-b border-emerald-900/5 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <button
              type="button"
              onClick={onOpenAbout}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 px-3 py-1 rounded-md border border-emerald-200 cursor-pointer transition-colors"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
              <span>Dự án Bình dân học vụ số H05 · Tìm hiểu về đề án →</span>
            </button>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Chia sẻ điều bạn biết, học điều bạn yêu thích{' '}
              <span className="text-emerald-700">hoàn toàn miễn phí.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Nền tảng kết nối người dân trong khu phố và thành phố: người có kinh nghiệm sẵn lòng
              dạy lại miễn phí cho người cần học, từ ngoại ngữ, tin học cho người cao tuổi, sửa điện gia
              dụng đến làm bánh và đàn guitar.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenAIMatch}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ghép đôi kỹ năng bằng AI</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onExplore}
                className="px-5 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Xem danh mục kỹ năng
              </button>

              <button
                onClick={onOpenRegister}
                className="px-4 py-3 text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline transition-colors cursor-pointer"
              >
                + Đăng ký chia sẻ kỹ năng
              </button>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-500 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Phi thương mại</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Lịch học 1-1 linh hoạt</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div>
                <span>Trực tuyến & Gặp mặt tại địa phương</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/hero_community_skills_1792401733951.jpg"
                alt="Không gian học tập và trao đổi kỹ năng cộng đồng thân thiện tại Việt Nam"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.classList.add(
                      'bg-gradient-to-br',
                      'from-emerald-700',
                      'to-teal-900',
                      'flex',
                      'items-center',
                      'justify-center',
                      'p-8',
                      'text-white'
                    );
                    target.parentElement.innerHTML =
                      '<div class="text-center"><h3 class="font-bold text-xl mb-2">Ngân hàng Kỹ năng Cộng đồng</h3><p class="text-sm opacity-90">Kết nối tri thức - Gắn kết láng giềng</p></div>';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs sm:text-sm">
                <p className="font-semibold drop-shadow-sm">
                  Lớp học kỹ năng số & giao lưu nghệ thuật cuối tuần
                </p>
                <p className="text-slate-200 text-xs drop-shadow-sm">
                  Cộng đồng Hà Nội & TP. Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Community Stats Strip */}
        <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">140+</div>
            <div className="text-xs text-slate-500 mt-1">Kỹ năng được đăng ký</div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">850+</div>
            <div className="text-xs text-slate-500 mt-1">Giờ học 1-1 miễn phí</div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">18</div>
            <div className="text-xs text-slate-500 mt-1">Quận huyện có điểm kết nối</div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">4.9/5</div>
            <div className="text-xs text-slate-500 mt-1">Điểm đánh giá hài lòng</div>
          </div>
        </div>
      </div>
    </section>
  );
};
