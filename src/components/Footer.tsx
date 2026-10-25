import React from 'react';
import { HeartHandshake, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAbout?: () => void;
  onExplore?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onExplore }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">
                Ngân hàng Kỹ năng Cộng đồng (H05)
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-700 font-semibold">Bình dân học vụ số</span>
            </div>
            <p className="text-slate-500 max-w-lg">
              Nơi người dân chủ động đăng ký dạy và học kỹ năng hoàn toàn miễn phí cho nhau. Thúc đẩy tinh thần học tập trọn đời và sự gắn kết nhân ái trong cộng đồng cư dân.
            </p>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-xs flex-wrap">
            <button
              onClick={onOpenAbout}
              className="hover:text-emerald-700 font-medium cursor-pointer transition-colors"
            >
              Giới thiệu
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Phi lợi nhuận 100%</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={onOpenAbout}
              className="hover:text-emerald-700 cursor-pointer transition-colors"
            >
              Quy tắc ứng xử văn minh
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={onOpenAbout}
              className="hover:text-emerald-700 cursor-pointer transition-colors"
            >
              Hỏi đáp thường gặp (FAQ)
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © 2026 Ngân hàng Kỹ năng Cộng đồng. Phát triển theo đề án H05.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Đồng hành cùng sự phát triển tri thức của người dân Việt Nam</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
