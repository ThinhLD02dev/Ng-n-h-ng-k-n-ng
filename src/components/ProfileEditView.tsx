import React, { useState } from 'react';
import { CommunityMember } from '../types/skillBank';
import { User, MapPin, Plus, Trash2, Save, Star, Clock, Heart, BookOpen } from 'lucide-react';

interface ProfileEditViewProps {
  currentUser: CommunityMember;
  onUpdateCurrentUser: (updated: CommunityMember) => void;
  onOpenRegisterSkill: () => void;
}

export const ProfileEditView: React.FC<ProfileEditViewProps> = ({
  currentUser,
  onUpdateCurrentUser,
  onOpenRegisterSkill,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [roleTitle, setRoleTitle] = useState(currentUser.roleTitle);
  const [district, setDistrict] = useState(currentUser.district);
  const [city, setCity] = useState(currentUser.city);
  const [bio, setBio] = useState(currentUser.bio);
  const [contactZalo, setContactZalo] = useState(currentUser.contactZalo || '');
  const [contactEmail, setContactEmail] = useState(currentUser.contactEmail || '');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCurrentUser({
      ...currentUser,
      name,
      roleTitle,
      district,
      city,
      bio,
      contactZalo,
      contactEmail,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleDeleteTeachSkill = (skillId: string) => {
    onUpdateCurrentUser({
      ...currentUser,
      skillsToTeach: currentUser.skillsToTeach.filter((s) => s.id !== skillId),
    });
  };

  const handleDeleteLearnSkill = (skillId: string) => {
    onUpdateCurrentUser({
      ...currentUser,
      skillsToLearn: currentUser.skillsToLearn.filter((s) => s.id !== skillId),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-xs sm:text-sm text-slate-500">{currentUser.roleTitle}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.district}, {currentUser.city}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <Clock className="w-3.5 h-3.5" />
                {currentUser.hoursShared} giờ đóng góp
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenRegisterSkill}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm kỹ năng mới</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg text-center">
          ✓ Đã lưu thay đổi hồ sơ thành công!
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5 text-xs">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-600" />
          <span>Thông tin cá nhân & Địa chỉ liên hệ</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Họ và tên hiển thị:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Chức danh / Nghề nghiệp tóm tắt:</label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Quận / Huyện:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Tỉnh / Thành phố:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Số điện thoại / Zalo:</label>
            <input
              type="text"
              value={contactZalo}
              onChange={(e) => setContactZalo(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Email trao đổi:</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-1">Đôi lời giới thiệu về bạn:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Lưu cập nhật hồ sơ</span>
          </button>
        </div>
      </form>

      {/* Skills Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Skills I Teach */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Kỹ năng bạn nhận dạy ({currentUser.skillsToTeach.length})</span>
            </h4>
            <button
              onClick={onOpenRegisterSkill}
              className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
            >
              + Thêm
            </button>
          </div>

          {currentUser.skillsToTeach.length > 0 ? (
            <div className="space-y-3">
              {currentUser.skillsToTeach.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{skill.name}</div>
                      <div className="text-[11px] text-emerald-800 mt-0.5">
                        {skill.category} · {skill.format}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteTeachSkill(skill.id)}
                      className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      title="Xoá kỹ năng này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-600 mt-1 line-clamp-2">{skill.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400">
              Bạn chưa đăng ký kỹ năng nhận dạy nào.
            </div>
          )}
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-teal-600" />
              <span>Kỹ năng bạn muốn học ({currentUser.skillsToLearn.length})</span>
            </h4>
            <button
              onClick={onOpenRegisterSkill}
              className="text-teal-700 hover:text-teal-800 font-semibold cursor-pointer"
            >
              + Thêm
            </button>
          </div>

          {currentUser.skillsToLearn.length > 0 ? (
            <div className="space-y-3">
              {currentUser.skillsToLearn.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{skill.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {skill.category} · Trình độ: {skill.desiredLevel}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteLearnSkill(skill.id)}
                      className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      title="Xoá nhu cầu này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-600 mt-1 italic">Mục tiêu: {skill.targetGoal}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400">
              Bạn chưa thêm kỹ năng muốn học nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
