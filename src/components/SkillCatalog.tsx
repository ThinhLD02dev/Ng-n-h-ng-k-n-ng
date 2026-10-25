import React, { useState, useMemo } from 'react';
import { CommunityMember, SkillCategory } from '../types/skillBank';
import { SKILL_CATEGORIES } from '../data/seedMembers';
import { MemberCard } from './MemberCard';
import { Search, Filter, X, SlidersHorizontal, BookOpen, Users } from 'lucide-react';

interface SkillCatalogProps {
  members: CommunityMember[];
  onViewProfile: (member: CommunityMember) => void;
  onRequestSession: (member: CommunityMember) => void;
  onOpenRegister: () => void;
}

export const SkillCatalog: React.FC<SkillCatalogProps> = ({
  members,
  onViewProfile,
  onRequestSession,
  onOpenRegister,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'teach' | 'learn'>('teach');

  // Filter logic
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = member.name.toLowerCase().includes(query);
        const matchesBio = member.bio.toLowerCase().includes(query);
        const matchesDistrict = member.district.toLowerCase().includes(query);
        const matchesTeach = member.skillsToTeach.some(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query)
        );
        const matchesLearn = member.skillsToLearn.some(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.targetGoal.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesBio && !matchesDistrict && !matchesTeach && !matchesLearn) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'Tất cả') {
        const teachesCat = member.skillsToTeach.some((s) => s.category === selectedCategory);
        const learnsCat = member.skillsToLearn.some((s) => s.category === selectedCategory);
        if (roleFilter === 'teach' && !teachesCat) return false;
        if (roleFilter === 'learn' && !learnsCat) return false;
        if (roleFilter === 'all' && !teachesCat && !learnsCat) return false;
      }

      // Format (online / offline)
      if (selectedFormat !== 'all') {
        const hasFormat = member.skillsToTeach.some((s) => {
          if (selectedFormat === 'online') return s.format === 'Trực tuyến' || s.format === 'Linh hoạt cả hai';
          if (selectedFormat === 'in_person') return s.format === 'Gặp trực tiếp' || s.format === 'Linh hoạt cả hai';
          return true;
        });
        if (!hasFormat) return false;
      }

      // City filter
      if (selectedCity !== 'all') {
        if (!member.city.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [members, searchTerm, selectedCategory, selectedFormat, selectedCity, roleFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedFormat('all');
    setSelectedCity('all');
    setRoleFilter('teach');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Subtitle */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Khám phá Kỹ năng Cộng đồng
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Tìm kiếm người dạy tình nguyện hoặc kết nối với những người có cùng mong muốn học hỏi.
          </p>
        </div>

        {/* Role toggle (segmented buttons) */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/80 shrink-0">
          <button
            onClick={() => setRoleFilter('teach')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              roleFilter === 'teach'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Người nhận dạy ({members.length})
          </button>
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              roleFilter === 'all'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mọi thành viên
          </button>
        </div>
      </div>

      {/* Main Search Bar & Quick Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Text Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo kỹ năng (Tiếng Anh, Guitar, VNeID, làm bánh, lập trình...), tên hoặc quận huyện..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Format Select */}
          <div className="w-full md:w-48">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Mọi hình thức học</option>
              <option value="online">Học Trực tuyến (Meet)</option>
              <option value="in_person">Gặp trực tiếp tại địa phương</option>
            </select>
          </div>

          {/* City Select */}
          <div className="w-full md:w-48">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Tất cả khu vực</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </div>
        </div>

        {/* Category Pills Replacement: Clean Segmented buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap text-xs">Chủ đề:</span>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Status & Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <div>
          Tìm thấy{' '}
          <span className="font-bold text-slate-900 font-mono tabular-nums">
            {filteredMembers.length}
          </span>{' '}
          thành viên phù hợp
        </div>

        {(searchTerm || selectedCategory !== 'Tất cả' || selectedFormat !== 'all' || selectedCity !== 'all') && (
          <button
            onClick={resetFilters}
            className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Xoá bộ lọc</span>
          </button>
        )}
      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onViewProfile={onViewProfile}
              onRequestSession={onRequestSession}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-xl mx-auto">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Chưa tìm thấy kỹ năng phù hợp
          </h3>
          <p className="text-sm text-slate-500 mb-5">
            Không có thành viên nào khớp với bộ lọc hiện tại. Bạn có thể xóa bộ lọc hoặc là người đầu tiên đăng ký chia sẻ kỹ năng này cho cộng đồng!
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
            >
              + Đăng ký dạy kỹ năng mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
