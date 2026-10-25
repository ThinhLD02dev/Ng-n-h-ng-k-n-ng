import React, { useState, useEffect } from 'react';
import {
  CommunityMember,
  ExchangeSession,
  SkillOffering,
  SkillDemand,
  SessionStatus,
} from './types/skillBank';
import {
  SEED_COMMUNITY_MEMBERS,
  INITIAL_CURRENT_USER,
  INITIAL_SESSIONS,
} from './data/seedMembers';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SkillCatalog } from './components/SkillCatalog';
import { AIMatchmakerView } from './components/AIMatchmakerView';
import { SessionManagerView } from './components/SessionManagerView';
import { ProfileEditView } from './components/ProfileEditView';
import { MemberDetailModal } from './components/MemberDetailModal';
import { RequestSessionModal } from './components/RequestSessionModal';
import { SkillRegisterModal } from './components/SkillRegisterModal';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';

const STORAGE_KEY_MEMBERS = 'h05_community_members_v1';
const STORAGE_KEY_USER = 'h05_current_user_v1';
const STORAGE_KEY_SESSIONS = 'h05_sessions_v1';

export default function App() {
  // Navigation active tab (default initial page is always Giới thiệu)
  const [activeTab, setActiveTab] = useState<
    'catalog' | 'about' | 'ai-match' | 'sessions' | 'profile'
  >('about');

  // Community Members State
  const [members, setMembers] = useState<CommunityMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEMBERS);
      return saved ? JSON.parse(saved) : SEED_COMMUNITY_MEMBERS;
    } catch {
      return SEED_COMMUNITY_MEMBERS;
    }
  });

  // Current User State
  const [currentUser, setCurrentUser] = useState<CommunityMember>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_CURRENT_USER;
    } catch {
      return INITIAL_CURRENT_USER;
    }
  });

  // Exchange Sessions State
  const [sessions, setSessions] = useState<ExchangeSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
    } catch {
      return INITIAL_SESSIONS;
    }
  });

  // Modals state
  const [selectedMemberForDetail, setSelectedMemberForDetail] =
    useState<CommunityMember | null>(null);
  const [sessionModalTarget, setSessionModalTarget] = useState<{
    member: CommunityMember;
    prefilledSkill?: string;
  } | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handler: Add teaching skill to current user and sync to community list
  const handleAddTeachingSkill = (newSkill: Omit<SkillOffering, 'id'>) => {
    const fullSkill: SkillOffering = {
      ...newSkill,
      id: `teach_${Date.now()}`,
    };

    const updatedUser: CommunityMember = {
      ...currentUser,
      skillsToTeach: [fullSkill, ...currentUser.skillsToTeach],
    };

    setCurrentUser(updatedUser);

    // Also ensure currentUser appears in members list
    setMembers((prev) => {
      const exists = prev.some((m) => m.id === updatedUser.id);
      if (exists) {
        return prev.map((m) => (m.id === updatedUser.id ? updatedUser : m));
      }
      return [updatedUser, ...prev];
    });

    showToast(`Đã thêm kỹ năng "${newSkill.name}" vào danh sách nhận dạy của bạn!`);
  };

  // Handler: Add learning demand
  const handleAddLearningSkill = (newDemand: Omit<SkillDemand, 'id'>) => {
    const fullDemand: SkillDemand = {
      ...newDemand,
      id: `learn_${Date.now()}`,
    };

    const updatedUser: CommunityMember = {
      ...currentUser,
      skillsToLearn: [fullDemand, ...currentUser.skillsToLearn],
    };

    setCurrentUser(updatedUser);
    showToast(`Đã thêm nhu cầu học "${newDemand.name}" vào hồ sơ!`);
  };

  // Handler: Update current user profile
  const handleUpdateCurrentUser = (updated: CommunityMember) => {
    setCurrentUser(updated);
    setMembers((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
    showToast('Đã lưu cập nhật hồ sơ cá nhân.');
  };

  // Handler: Submit a 1-1 session exchange request
  const handleSubmitSession = (
    sessionData: Omit<ExchangeSession, 'id' | 'createdAt' | 'status'>
  ) => {
    const newSession: ExchangeSession = {
      ...sessionData,
      id: `session_${Date.now()}`,
      createdAt: 'Hôm nay',
      status: 'pending',
    };

    setSessions((prev) => [newSession, ...prev]);
    showToast(`Đã gửi đề xuất buổi học "${sessionData.skillName}" thành công!`);
    setActiveTab('sessions');
  };

  // Handler: Update session status (accepted, completed, cancelled)
  const handleUpdateSessionStatus = (sessionId: string, newStatus: SessionStatus) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: newStatus } : s))
    );

    if (newStatus === 'accepted') {
      showToast('Đã xác nhận lịch học 1-1!');
    } else if (newStatus === 'completed') {
      showToast('Buổi học đã hoàn thành! Cảm ơn bạn đã đóng góp cho cộng đồng.');
    } else if (newStatus === 'cancelled') {
      showToast('Đã hủy buổi hẹn.');
    }
  };

  // Handler: Submit feedback
  const handleSubmitFeedback = (
    sessionId: string,
    rating: number,
    comment: string
  ) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, feedback: { rating, comment } } : s
      )
    );
    showToast('Cảm ơn bạn đã gửi đánh giá buổi học!');
  };

  const pendingSessionsCount = sessions.filter(
    (s) => s.status === 'pending' && s.receiverId === currentUser.id
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDF9] text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg border border-slate-700 animate-fade-in flex items-center gap-2">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        pendingSessionsCount={pendingSessionsCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            <HeroBanner
              onExplore={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAIMatch={() => setActiveTab('ai-match')}
              onOpenRegister={() => setIsRegisterModalOpen(true)}
              onOpenAbout={() => setActiveTab('about')}
            />
            <div id="catalog-section">
              <SkillCatalog
                members={members}
                onViewProfile={(m) => setSelectedMemberForDetail(m)}
                onRequestSession={(m) => setSessionModalTarget({ member: m })}
                onOpenRegister={() => setIsRegisterModalOpen(true)}
              />
            </div>
          </>
        )}

        {activeTab === 'about' && (
          <AboutView
            onExplore={() => setActiveTab('catalog')}
            onOpenRegister={() => setIsRegisterModalOpen(true)}
            onOpenAIMatch={() => setActiveTab('ai-match')}
          />
        )}

        {activeTab === 'ai-match' && (
          <AIMatchmakerView
            currentUser={currentUser}
            members={members}
            onOpenSessionModal={(m, skill) =>
              setSessionModalTarget({ member: m, prefilledSkill: skill })
            }
            onViewProfile={(m) => setSelectedMemberForDetail(m)}
            onEditProfile={() => setActiveTab('profile')}
          />
        )}

        {activeTab === 'sessions' && (
          <SessionManagerView
            sessions={sessions}
            onUpdateSessionStatus={handleUpdateSessionStatus}
            onSubmitFeedback={handleSubmitFeedback}
            onExploreSkills={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileEditView
            currentUser={currentUser}
            onUpdateCurrentUser={handleUpdateCurrentUser}
            onOpenRegisterSkill={() => setIsRegisterModalOpen(true)}
          />
        )}
      </main>

      {/* Member Details Modal */}
      <MemberDetailModal
        member={selectedMemberForDetail}
        onClose={() => setSelectedMemberForDetail(null)}
        onRequestSession={(m, skill) => {
          setSelectedMemberForDetail(null);
          setSessionModalTarget({ member: m, prefilledSkill: skill });
        }}
      />

      {/* Session Request / Booking Modal */}
      <RequestSessionModal
        member={sessionModalTarget?.member || null}
        prefilledSkill={sessionModalTarget?.prefilledSkill}
        currentUser={currentUser}
        onClose={() => setSessionModalTarget(null)}
        onSubmitSession={handleSubmitSession}
      />

      {/* Skill Registration Modal */}
      <SkillRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onAddTeachingSkill={handleAddTeachingSkill}
        onAddLearningSkill={handleAddLearningSkill}
      />

      {/* Footer */}
      <Footer
        onOpenAbout={() => setActiveTab('about')}
        onExplore={() => setActiveTab('catalog')}
      />
    </div>
  );
}
