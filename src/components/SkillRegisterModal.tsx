import React, { useState } from 'react';
import {
  SkillOffering,
  SkillDemand,
  SkillCategory,
  SkillLevel,
  LearningFormat,
} from '../types/skillBank';
import { SKILL_CATEGORIES } from '../data/seedMembers';
import { X, PlusCircle, CheckCircle, BookOpen, HeartHandshake } from 'lucide-react';

interface SkillRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTeachingSkill: (skill: Omit<SkillOffering, 'id'>) => void;
  onAddLearningSkill: (skill: Omit<SkillDemand, 'id'>) => void;
}

export const SkillRegisterModal: React.FC<SkillRegisterModalProps> = ({
  isOpen,
  onClose,
  onAddTeachingSkill,
  onAddLearningSkill,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'teach' | 'learn'>('teach');

  // Teach form state
  const [teachName, setTeachName] = useState('');
  const [teachCategory, setTeachCategory] = useState<SkillCategory>('Công nghệ & Kỹ năng số');
  const [teachLevel, setTeachLevel] = useState<SkillLevel>('Thành thạo / Chuyên sâu');
  const [teachFormat, setTeachFormat] = useState<LearningFormat>('Linh hoạt cả hai');
  const [teachDesc, setTeachDesc] = useState('');
  const [highlight1, setHighlight1] = useState('');
  const [highlight2, setHighlight2] = useState('');
  const [highlight3, setHighlight3] = useState('');

  // Learn form state
  const [learnName, setLearnName] = useState('');
  const [learnCategory, setLearnCategory] = useState<SkillCategory>('Ngoại ngữ & Giao tiếp');
  const [learnDesiredLevel, setLearnDesiredLevel] = useState<SkillLevel>('Cơ bản (Người mới)');
  const [learnGoal, setLearnGoal] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmitTeach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teachName.trim()) {
      setError('Vui lòng nhập tên kỹ năng nhận dạy');
      return;
    }
    if (!teachDesc.trim()) {
      setError('Vui lòng mô tả ngắn về kinh nghiệm và phương pháp');
      return;
    }

    onAddTeachingSkill({
      name: teachName.trim(),
      category: teachCategory,
      level: teachLevel,
      format: teachFormat,
      description: teachDesc.trim(),
      curriculumHighlight: [
        highlight1.trim() || 'Nắm vững nguyên lý và kiến thức căn bản',
        highlight2.trim() || 'Thực hành bài tập thực tế từng bước',
        highlight3.trim() || 'Chia sẻ kinh nghiệm thực chiến & giải đáp',
      ],
    });

    setSuccessMsg('Đăng ký kỹ năng chia sẻ thành công!');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  const handleSubmitLearn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnName.trim()) {
      setError('Vui lòng nhập tên kỹ năng bạn muốn học');
      return;
    }
    if (!learnGoal.trim()) {
      setError('Vui lòng nêu rõ mục tiêu học tập');
      return;
    }

    onAddLearningSkill({
      name: learnName.trim(),
      category: learnCategory,
      desiredLevel: learnDesiredLevel,
      targetGoal: learnGoal.trim(),
    });

    setSuccessMsg('Đã thêm kỹ năng cần học vào hồ sơ của bạn!');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Đăng ký Kỹ năng vào Ngân hàng Cộng đồng
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('teach');
              setError(null);
            }}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'teach'
                ? 'bg-white text-emerald-700 border-emerald-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tôi muốn Dạy miễn phí</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('learn');
              setError(null);
            }}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'learn'
                ? 'bg-white text-emerald-700 border-emerald-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Tôi muốn Tìm người dạy (Cần học)</span>
          </button>
        </div>

        {/* Content form */}
        <div className="p-6 text-xs">
          {error && (
            <div className="mb-4 p-2.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form: Teach */}
          {activeTab === 'teach' && (
            <form onSubmit={handleSubmitTeach} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Tên kỹ năng bạn có thể chia sẻ: *
                </label>
                <input
                  type="text"
                  value={teachName}
                  onChange={(e) => setTeachName(e.target.value)}
                  placeholder="VD: Tiếng Hàn du lịch, Lập trình Python, Sửa quạt máy, Làm bánh..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Danh mục:</label>
                  <select
                    value={teachCategory}
                    onChange={(e) => setTeachCategory(e.target.value as SkillCategory)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  >
                    {SKILL_CATEGORIES.filter((c) => c.id !== 'Tất cả').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Hình thức:</label>
                  <select
                    value={teachFormat}
                    onChange={(e) => setTeachFormat(e.target.value as LearningFormat)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  >
                    <option value="Linh hoạt cả hai">Linh hoạt cả hai</option>
                    <option value="Trực tuyến">Trực tuyến qua Meet</option>
                    <option value="Gặp trực tiếp">Gặp trực tiếp tại địa phương</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Mô tả ngắn gọn về kinh nghiệm & cách tiếp cận: *
                </label>
                <textarea
                  value={teachDesc}
                  onChange={(e) => setTeachDesc(e.target.value)}
                  rows={2}
                  placeholder="VD: Mình có 5 năm làm việc trong lĩnh vực này, cách giảng giải dễ hiểu, kiên nhẫn..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  3 điểm thực hành chính trong bài học:
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={highlight1}
                    onChange={(e) => setHighlight1(e.target.value)}
                    placeholder="Điểm 1: Nguyên lý & công cụ ban đầu"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                  <input
                    type="text"
                    value={highlight2}
                    onChange={(e) => setHighlight2(e.target.value)}
                    placeholder="Điểm 2: Thực hành làm ra sản phẩm/kết quả nhỏ"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                  <input
                    type="text"
                    value={highlight3}
                    onChange={(e) => setHighlight3(e.target.value)}
                    placeholder="Điểm 3: Sửa lỗi & mẹo hữu ích từ kinh nghiệm"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm cursor-pointer"
                >
                  Xác nhận đăng ký dạy
                </button>
              </div>
            </form>
          )}

          {/* Form: Learn */}
          {activeTab === 'learn' && (
            <form onSubmit={handleSubmitLearn} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Kỹ năng bạn đang tìm kiếm người hướng dẫn: *
                </label>
                <input
                  type="text"
                  value={learnName}
                  onChange={(e) => setLearnName(e.target.value)}
                  placeholder="VD: Guitar đệm hát, Tiếng Anh phỏng vấn, Đan len, Bơi lội..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Danh mục:</label>
                  <select
                    value={learnCategory}
                    onChange={(e) => setLearnCategory(e.target.value as SkillCategory)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  >
                    {SKILL_CATEGORIES.filter((c) => c.id !== 'Tất cả').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Trình độ hiện tại:
                  </label>
                  <select
                    value={learnDesiredLevel}
                    onChange={(e) => setLearnDesiredLevel(e.target.value as SkillLevel)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  >
                    <option value="Cơ bản (Người mới)">Mới bắt đầu từ con số 0</option>
                    <option value="Trung cấp">Đã biết chút ít, cần cải thiện</option>
                    <option value="Thành thạo / Chuyên sâu">Muốn rèn luyện nâng cao</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Mục tiêu cụ thể của bạn: *
                </label>
                <textarea
                  value={learnGoal}
                  onChange={(e) => setLearnGoal(e.target.value)}
                  rows={3}
                  placeholder="VD: Mình muốn học cách bấm 5 hợp âm để tự đệm hát bài 'Ba kể con nghe' cho gia đình nghe vào dịp Tết..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm cursor-pointer"
                >
                  Lưu nhu cầu học
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
