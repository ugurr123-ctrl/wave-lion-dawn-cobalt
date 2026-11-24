/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { TabType, DayInfo, UserProfile, ToastMessage, SupplementItem, CycleRecord, CyclePhase } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { TodayTab } from './components/TodayTab';
import { CycleTab } from './components/CycleTab';
import { ReportsTab } from './components/ReportsTab';
import { ProfileTab } from './components/ProfileTab';
import { PartnerTab } from './components/PartnerTab';
import { OnboardingModal } from './components/OnboardingModal';
import { SymptomModal } from './components/SymptomModal';
import { WaterSettingsModal } from './components/WaterSettingsModal';
import { DoctorReportModal } from './components/DoctorReportModal';
import { RehberTab } from './components/GuideHub';
import { cycleDayFromLastPeriod, phaseForCycleDay, parseLocalISO, toLocalISO } from './utils/cycleIntelligence';
import { isPremiumActive } from './premium';
import { defaultPartnerShare, PARTNER_ENABLED } from './types';
import { syncReminders } from './notifications';

const STORAGE = {
  profile: 'flora-profile',
  days: 'flora-days',
  supplements: 'flora-supplements',
  onboarded: 'flora-onboarded',
  cycles: 'flora-cycles',
};

function cycleDayOn(lastPeriodDate: string, cycleLength: number, iso: string): number {
  const start = parseLocalISO(lastPeriodDate);
  const day = parseLocalISO(iso);
  if (!start || !day || cycleLength < 1) return 1;
  const diff = Math.round((day.getTime() - start.getTime()) / 86400000);
  if (diff < 0) return 1;
  return (diff % cycleLength) + 1;
}

function blankDay(day: number, profile: UserProfile): DayInfo {
  const date = dayKey(day);
  const cycleDay = profile.lastPeriodDate ? cycleDayOn(profile.lastPeriodDate, profile.cycleLength, date) : 1;
  const phase: CyclePhase = profile.lastPeriodDate
    ? phaseForCycleDay(cycleDay, profile.periodLength, profile.cycleLength)
    : 'folikuler';
  return {
    date,
    dayNumber: day,
    dayName: new Date(`${date}T00:00:00`).toLocaleDateString('tr-TR', { weekday: 'long' }),
    cycleDay,
    phase,
    isToday: date === toLocalISO(new Date()),
  };
}
function dayKey(day: number): string {
  const now = new Date();
  return toLocalISO(new Date(now.getFullYear(), now.getMonth(), day));
}

function normalizeDays(raw: Record<string, DayInfo> | null): Record<string, DayInfo> {
  const out: Record<string, DayInfo> = {};
  if (!raw) return out;
  for (const [key, value] of Object.entries(raw)) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
      out[key] = { ...value, date: key };
    } else if (value?.date && /^\d{4}-\d{2}-\d{2}$/.test(value.date)) {
      out[value.date] = value;
    } else if (/^\d{1,2}$/.test(key)) {
      const iso = dayKey(Number(key));
      out[iso] = { ...value, date: iso, dayNumber: Number(key) };
    }
  }
  return out;
}

function readStore<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const emptyProfile = (): UserProfile => ({
  name: '',
  avatarUrl: '',
  cycleLength: 28,
  periodLength: 5,
  lastPeriodDate: '',
  goal: '',
  waterGoalMl: 2500,
  waterCurrentMl: 0,
  autoResetAtMidnight: true,
  quietHoursStart: '23:00',
  quietHoursEnd: '07:30',
  reminderIntervalMin: 90,
  vibrationActive: true,
  faceIdActive: false,
  anonymousMode: false,
  appleHealthConnected: false,
  ouraConnected: false,
});

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('bugun');
  const [menuLabel, setMenuLabel] = useState('Bugün');
  const [selectedDay, setSelectedDay] = useState<number>(() => new Date().getDate());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [ready, setReady] = useState(false);
  const [showSymptomModal, setShowSymptomModal] = useState<boolean>(false);
  const [showWaterSettingsModal, setShowWaterSettingsModal] = useState<boolean>(false);
  const [showDoctorReportModal, setShowDoctorReportModal] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Supplements state synchronized between Profile and Today views
  const [supplements, setSupplements] = useState<SupplementItem[]>([]);

  const handleToggleSupplement = (id: string) => {
    setSupplements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s))
    );
  };

  const handleAddSupplement = (item: SupplementItem) => {
    setSupplements((prev) => [...prev, item]);
  };

  const handleDeleteSupplement = (id: string) => {
    setSupplements((prev) => prev.filter((s) => s.id !== id));
  };

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);

  // Day Data Map
  const [dayDataMap, setDayDataMap] = useState<Record<string, DayInfo>>({});
  const [reminderError, setReminderError] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [cycles, setCycles] = useState<CycleRecord[]>([]);

  useEffect(() => {
    const saved = readStore<Partial<UserProfile> | null>(STORAGE.profile, null);
    if (saved) setProfile((prev) => ({ ...prev, ...saved }));
    setDayDataMap(normalizeDays(readStore<Record<string, DayInfo> | null>(STORAGE.days, null)));
    setSupplements(readStore<SupplementItem[]>(STORAGE.supplements, []));
    setCycles(readStore<CycleRecord[]>(STORAGE.cycles, []));
    try {
      setShowOnboarding(localStorage.getItem(STORAGE.onboarded) !== '1');
    } catch {
      setShowOnboarding(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
      localStorage.setItem(STORAGE.days, JSON.stringify(dayDataMap));
      localStorage.setItem(STORAGE.supplements, JSON.stringify(supplements));
      localStorage.setItem(STORAGE.cycles, JSON.stringify(cycles));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [profile, dayDataMap, supplements, cycles, ready]);

  useEffect(() => {
    if (!ready) return;
    const today = toLocalISO(new Date());
    if (profile.waterDate === today) return;
    const firstSeen = !profile.waterDate;
    setProfile((prev) => ({
      ...prev,
      waterDate: today,
      waterCurrentMl: !firstSeen && prev.autoResetAtMidnight ? 0 : prev.waterCurrentMl,
    }));
    if (!firstSeen) setSupplements((prev) => prev.map((item) => ({ ...item, taken: false })));
  }, [ready, profile.waterDate, profile.autoResetAtMidnight]);

  useEffect(() => {
    if (!ready || !profile.lastPeriodDate) return;
    setCycles((prev) => {
      const existing = prev.find((item) => item.start === profile.lastPeriodDate);
      if (
        existing &&
        existing.cycleLength === profile.cycleLength &&
        existing.periodLength === profile.periodLength
      ) {
        return prev;
      }
      return [...prev.filter((item) => item.start !== profile.lastPeriodDate), {
        start: profile.lastPeriodDate,
        cycleLength: profile.cycleLength,
        periodLength: profile.periodLength,
      }].sort((a, b) => a.start.localeCompare(b.start));
    });
  }, [ready, profile.lastPeriodDate, profile.cycleLength, profile.periodLength]);

  useEffect(() => {
    if (!ready) return;
    let current = true;
    const run = () => {
      void syncReminders(supplements, profile).then(
        () => { if (current) setReminderError(false); },
        () => { if (current) setReminderError(true); },
      );
    };
    run();
    const refresh = () => { if (!document.hidden) run(); };
    document.addEventListener('visibilitychange', refresh);
    return () => {
      current = false;
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [ready, supplements, profile.quietHoursStart, profile.quietHoursEnd, profile.reminderIntervalMin]);

  // Toast Notification Helper
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'water' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Water Actions
  const handleAddWater = (amount: number) => {
    setProfile((prev) => ({
      ...prev,
      waterCurrentMl: Math.min(prev.waterCurrentMl + amount, 4500),
    }));
  };

  const handleResetWater = () => {
    setProfile((prev) => ({
      ...prev,
      waterCurrentMl: 0,
    }));
  };

  const handleResetData = () => {
    try {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('flora-') && key !== 'flora-store-receipt') localStorage.removeItem(key);
      }
    } catch {
      showToast('Silme tamamlanamadı', 'Cihaz depolamasına erişilemedi. Lütfen tekrar deneyin.', 'info');
      return;
    }
    setCycles([]);
    setProfile(emptyProfile());
    setDayDataMap({});
    setSupplements([]);
    setSelectedDay(new Date().getDate());
    setMenuLabel('Bugün');
    setActiveTab('bugun');
    setShowOnboarding(true);
    setShowSymptomModal(false);
    setShowWaterSettingsModal(false);
    setShowDoctorReportModal(false);

    showToast('Temiz bir sayfa', 'Kayıtlar gitti. Yeniden başlamak da olur.', 'info');
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // Symptom Save
  const handleSaveSymptoms = (updated: Partial<DayInfo>) => {
    const key = dayKey(selectedDay);
    setDayDataMap((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || blankDay(selectedDay, profile)), ...updated, date: key },
    }));
    showToast('Günün yazıldı', 'Bu güne nazikçe kaydettim. Yarın da buradayız.', 'success');
  };

  // Onboarding Completion
  const handleCompleteOnboarding = (data: {
    goal: string;
    cycleLength: number;
    periodLength: number;
    lastPeriodDate: string;
    intensity: string;
    contraception: string;
    habits: string[];
    partnerMode: boolean;
    partnerName: string;
  }) => {
    setProfile((prev) => ({
      ...prev,
      goal: data.goal,
      cycleLength: data.cycleLength,
      periodLength: data.periodLength,
      lastPeriodDate: data.lastPeriodDate,
      intensity: data.intensity,
      contraception: data.contraception,
      habits: data.habits,
      partnerMode: PARTNER_ENABLED && data.partnerMode,
      partnerName: data.partnerName,
      partnerCode: data.partnerMode ? (prev.partnerCode || String(Math.floor(100000 + Math.random() * 900000))) : prev.partnerCode,
      partnerShare: prev.partnerShare || defaultPartnerShare(),
    }));
    try {
      localStorage.setItem(STORAGE.onboarded, '1');
    } catch {
      /* ignore */
    }
    showToast('Hoş geldin', `${data.cycleLength} günlük ritmin bu cihazda. Kendine iyi bak.`, 'success');
  };

  useEffect(() => {
    if (!PARTNER_ENABLED || !ready || !profile.partnerMode || profile.partnerCode) return;
    setProfile((prev) => ({
      ...prev,
      partnerCode: String(Math.floor(100000 + Math.random() * 900000)),
      partnerShare: prev.partnerShare || defaultPartnerShare(),
    }));
  }, [ready, profile.partnerMode, profile.partnerCode]);
  useEffect(() => {
    if ((!PARTNER_ENABLED || !profile.partnerMode) && activeTab === 'partner') setActiveTab('bugun');
  }, [profile.partnerMode, activeTab]);
  const openTab = (tab: TabType) => {
    const labels: Record<TabType, string> = {
      bugun: 'Bugün',
      dongu: 'Döngü',
      rehber: 'Rehber',
      raporlar: 'Raporlar',
      profil: 'Profil',
      partner: 'Partner',
    };
    setActiveTab(tab);
    setMenuLabel(labels[tab]);
  };
  const today = new Date();
  const todayNumber = today.getDate();
  const cycleDay = profile.lastPeriodDate
    ? cycleDayFromLastPeriod(profile.lastPeriodDate, profile.cycleLength)
    : 1;
  const phase = profile.lastPeriodDate
    ? phaseForCycleDay(cycleDay, profile.periodLength, profile.cycleLength)
    : 'folikuler';
  const phaseLabel = {
    regl: 'Kanama',
    folikuler: 'Foliküler faz',
    ovulasyon: 'Doğurgan pencere',
    luteal: 'Luteal faz',
    pms: 'Adet öncesi',
  }[phase];
  const loggedToday = dayDataMap[toLocalISO(today)];
  const currentDayInfo: DayInfo = {
    date: toLocalISO(today),
    dayNumber: todayNumber,
    dayName: today.toLocaleDateString('tr-TR', { weekday: 'long' }),
    cycleDay,
    phase,
    isToday: true,
    mood: loggedToday?.mood,
    symptoms: loggedToday?.symptoms,
    flow: loggedToday?.flow,
    libido: loggedToday?.libido,
  };

  // Quick Mood Update from TodayTab or SymptomModal
  const handlePeriodStarted = () => {
    const today = toLocalISO(new Date());
    if (profile.lastPeriodDate === today) return;
    const day = new Date().getDate();
    handleUpdateProfile({ lastPeriodDate: today });
    setDayDataMap((prev) => {
      const key = dayKey(day);
      const existing = prev[key] || blankDay(day, { ...profile, lastPeriodDate: today });
      return {
        ...prev,
        [key]: { ...existing, date: key, flow: existing.flow && existing.flow !== 'Yok' ? existing.flow : 'Hafif' },
      };
    });
    showToast('Yeni döngü', 'Bugün 1. gün. Sayaç buradan başladı.', 'success');
  };

  const handleUpdateMood = (newMood: string) => {
    setDayDataMap((prev) => {
      const key = dayKey(selectedDay);
      const existing = prev[key] || blankDay(selectedDay, profile);
      return {
        ...prev,
        [key]: { ...existing, mood: newMood },
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#fff8f8] text-[#1f1a1c] relative selection:bg-pink-200">
      {/* Topographic organic background pattern */}
      <div className="fixed inset-0 topographic-pattern pointer-events-none" />

      {/* Main Container */}
      <div className="floria-shell relative z-10 mx-auto min-h-screen flex flex-col px-4">
        {/* App Header */}
        <Header
          currentCycleDay={profile.lastPeriodDate ? currentDayInfo.cycleDay : undefined}
          currentPhaseName={profile.lastPeriodDate ? phaseLabel : 'Kurulum bekleniyor'}
          menuLabel={menuLabel}
          activeTab={activeTab}
          setActiveTab={openTab}
          waterRemaining={Math.max(0, profile.waterGoalMl - profile.waterCurrentMl)}
          premium={isPremiumActive()}
        />

        {/* Dynamic Tab Views */}
        <main className="flex-1">
          {storageError && <p role="alert" className="my-3 rounded-xl bg-rose-100 p-3 text-sm text-rose-950">Değişiklikler cihazınıza kaydedilemedi. Sayfayı kapatmadan önce depolama alanını ve tarayıcı ayarlarını kontrol edin.</p>}
          {activeTab === 'bugun' && (
            <TodayTab
              currentDayInfo={currentDayInfo}
              waterCurrentMl={profile.waterCurrentMl}
              waterGoalMl={profile.waterGoalMl}
              onAddWater={handleAddWater}
              onResetWater={handleResetWater}
              autoResetAtMidnight={profile.autoResetAtMidnight}
              onOpenWaterSettings={() => setShowWaterSettingsModal(true)}
              onOpenSymptomModal={() => {
                setShowSymptomModal(true);
              }}
              onSelectDay={(day) => {
                setSelectedDay(day);
                openTab('dongu');
              }}
              showToast={showToast}
              cycleLength={profile.cycleLength}
              onUpdateMood={handleUpdateMood}
              supplements={supplements}
              onToggleSupplement={handleToggleSupplement}
              userName={profile.name}
              lastPeriodDate={profile.lastPeriodDate}
              onPeriodStarted={handlePeriodStarted}
            />
          )}

          {activeTab === 'dongu' && (
            <CycleTab
              selectedDay={selectedDay}
              onSelectDay={(day) => setSelectedDay(day)}
              onOpenSymptomModal={() => setShowSymptomModal(true)}
              dayDataMap={dayDataMap}
              cycleLength={profile.cycleLength}
              periodLength={profile.periodLength}
              lastPeriodDate={profile.lastPeriodDate}
            />
          )}

          {activeTab === 'rehber' && (
            <RehberTab
              phase={phase}
              cycleDay={cycleDay}
              cycleLength={profile.cycleLength}
              periodLength={profile.periodLength}
              lastPeriodDate={profile.lastPeriodDate}
              onTitle={setMenuLabel}
              signals={{
                waterCurrentMl: profile.waterCurrentMl,
                waterGoalMl: profile.waterGoalMl,
                mood: loggedToday?.mood,
                symptoms: loggedToday?.symptoms ?? [],
                supplementsTaken: supplements.filter((item) => item.taken).length,
                supplementsTotal: supplements.length,
              }}
            />
          )}

          {activeTab === 'raporlar' && (
            <ReportsTab
              onOpenDoctorReport={() => setShowDoctorReportModal(true)}
              cycleLength={profile.cycleLength}
              periodLength={profile.periodLength}
              lastPeriodDate={profile.lastPeriodDate}
              goal={profile.goal}
              loggedDays={Object.values(dayDataMap)}
              cycles={cycles}
            />
          )}

          {PARTNER_ENABLED && activeTab === 'partner' && profile.partnerMode && (
            <PartnerTab
              profile={profile}
              phase={phase}
              cycleDay={cycleDay}
              days={Object.values(dayDataMap)}
              onUpdateProfile={handleUpdateProfile}
              onLogToday={() => {
                setSelectedDay(todayNumber);
                setShowSymptomModal(true);
              }}
            />
          )}

          {activeTab === 'profil' && (
            <ProfileTab
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              showToast={showToast}
              supplements={supplements}
              onAddSupplement={handleAddSupplement}
              onDeleteSupplement={handleDeleteSupplement}
              onResetData={handleResetData}
              reminderError={reminderError}
              onReminderError={setReminderError}
            />
          )}
        </main>

        {/* Bottom Floating Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={openTab} premium={isPremiumActive()} partnerMode={PARTNER_ENABLED && Boolean(profile.partnerMode)} />
      </div>

      {/* Modals & Overlays */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleCompleteOnboarding}
        initialStep={0}
      />

      <SymptomModal
        key={dayKey(selectedDay)}
        isOpen={showSymptomModal}
        onClose={() => setShowSymptomModal(false)}
        dayInfo={
          dayDataMap[dayKey(selectedDay)] || blankDay(selectedDay, profile)
        }
        onSave={handleSaveSymptoms}
      />

      <WaterSettingsModal
        isOpen={showWaterSettingsModal}
        onClose={() => setShowWaterSettingsModal(false)}
        autoResetAtMidnight={profile.autoResetAtMidnight}
        onToggleAutoReset={(val) => {
          handleUpdateProfile({ autoResetAtMidnight: val });
          showToast(
            '00:00 Otomatik Sıfırlama',
            val ? 'Gece sıfırlama aktif edildi.' : 'Gece sıfırlama devre dışı bırakıldı.',
            'water'
          );
        }}
        waterGoalMl={profile.waterGoalMl}
      />

      <DoctorReportModal
        isOpen={showDoctorReportModal}
        onClose={() => setShowDoctorReportModal(false)}
        userName={profile.name}
        goal={profile.goal}
        cycleLength={profile.cycleLength}
        periodLength={profile.periodLength}
        lastPeriodDate={profile.lastPeriodDate}
        cycleDay={cycleDay}
        symptomLines={Object.values(dayDataMap).flatMap((day) => day.symptoms || [])}
      />

      {/* Toast Notification Container */}
      <div className="fixed top-20 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-pink-100 p-3.5 flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                toast.type === 'water'
                  ? 'bg-blue-100 text-blue-600'
                  : toast.type === 'success'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-pink-100 text-[#d81b60]'
              }`}
            >
              {toast.type === 'water' ? '💧' : toast.type === 'success' ? '✓' : '🌸'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1f1a1c]">{toast.title}</p>
              <p className="text-[11px] text-[#5a4044] mt-0.5 leading-snug">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
