import React, { useEffect, useMemo, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { FloraLogo } from './FloraLogo';
import { TabType } from '../types';
import { soundEngine } from '../utils/audio';
import { toLocalISO } from '../utils/cycleIntelligence';
import { eveningLine, phaseLine, waterLine } from '../dailyTips';

interface HeaderProps {
  currentCycleDay?: number;
  currentPhaseName: string;
  menuLabel: string;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  waterRemaining: number;
  premium: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentCycleDay,
  currentPhaseName,
  menuLabel,
  waterRemaining,
  premium,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [todayKey, setTodayKey] = useState(() => toLocalISO(new Date()));
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('flora-notes-read') || '{}');
      return saved.date === toLocalISO(new Date()) && Array.isArray(saved.ids) ? saved.ids : [];
    } catch { return []; }
  });
  useEffect(() => {
    const refresh = () => {
      const date = toLocalISO(new Date());
      if (date !== todayKey) {
        setReadIds([]);
        setTodayKey(date);
      }
    };
    const timer = window.setInterval(refresh, 30000);
    document.addEventListener('visibilitychange', refresh);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', refresh); };
  }, [todayKey]);
  const notifications = useMemo(() => {
    const today = new Date();
    const phase = phaseLine(currentPhaseName, today);
    const titles = ['Bugün sana', 'Nazik bir not', 'Floria yanında', 'Yavaş bir hatırlatma', 'Küçük bir fısıltı'];
    const title = titles[(today.getDate() + today.getMonth()) % titles.length];
    const water = waterRemaining > 0
      ? { id: 'water', title: 'Bir yudum su', time: 'Bugün', desc: waterLine(waterRemaining, today), type: 'water' }
      : { id: 'water', title: 'Su doldu', time: 'Bugün', desc: waterLine(0, today), type: 'water' };
    return [
      ...(currentCycleDay ? [{ id: 'day', title, time: `${currentCycleDay}. gün`, desc: phase, type: 'pms_calm' }] : []),
      water,
      { id: 'evening', title: 'Akşam sana kalsın', time: 'Akşam', desc: eveningLine(today), type: 'pms_calm' },
    ].map((item) => ({ ...item, read: readIds.includes(item.id) }));
  }, [currentCycleDay, currentPhaseName, waterRemaining, readIds, todayKey]);

  const markAllAsRead = () => {
    soundEngine.playDropletSound();
    const ids = notifications.map((item) => item.id);
    setReadIds(ids);
    try { localStorage.setItem('flora-notes-read', JSON.stringify({ date: todayKey, ids })); } catch { /* Keep this session readable if storage is unavailable. */ }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f8]/95 border-b border-[#f6ebed] transition-all">
      <div className="floria-header-content mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Left: Authentic 3D Lotus Logo & Clean Title (No "Gün 14" badge) */}
        <div className="flex items-center gap-2.5">
          <FloraLogo size="md" />
          <div className="flex flex-col select-none">
            <h1 className="font-black text-base tracking-tight text-[#1f1a1c] leading-tight">
              Flor<span className="text-[#d81b60]">ia</span>
            </h1>
            <span className="text-[11px] font-semibold text-[#805062] flex items-center gap-1" title={currentPhaseName}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d81b60]" />
              {menuLabel}
              {premium ? ' · Kraliçe' : ''}
            </span>
          </div>
        </div>

        {/* Right: Actions (Notification Bell & Settings Icon - Profile avatar & Onboarding removed) */}
        <div className="flex items-center gap-2">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                soundEngine.playDropletSound();
                setShowNotifications(!showNotifications);
              }}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#805062] hover:text-[#b0004a] hover:bg-pink-50 active:scale-95 transition-all relative cursor-pointer border border-pink-100 shadow-xs"
              aria-label="Bildirimler"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#d81b60] text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>


        </div>
      </div>

      {/* FULL RESPONSIVE NOTIFICATIONS PANEL */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-16 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 border-b border-pink-100 bg-gradient-to-r from-pink-50 via-rose-50/50 to-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FloraLogo size="sm" />
                <div>
                  <h3 className="font-black text-sm text-[#1f1a1c]">Sana notlar</h3>
                  <p className="text-[10px] text-[#805062] font-semibold">Tatlı ve kısa hatırlatmalar</p>
                </div>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="p-3.5 overflow-y-auto space-y-2.5 flex-1">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-[#805062]">Son Güncellemeler ({unreadCount} Okunmamış)</span>
                {unreadCount > 0 ? (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] font-bold text-[#d81b60] hover:underline cursor-pointer"
                  >
                    Tümünü Okundu Say
                  </button>
                ) : (
                  <span className="text-[10px] text-gray-400">Hepsi okundu ✓</span>
                )}
              </div>

              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl transition-all border ${
                    item.read
                      ? 'bg-[#fff8f8] border-pink-50'
                      : 'bg-gradient-to-r from-pink-50/90 to-rose-50/70 border-pink-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0 mt-0.5 text-base">
                      {item.type === 'pms_calm' ? '🕊️' : item.type === 'follicular' ? '🌱' : item.type === 'ovulation' ? '🌸' : item.type === 'water' ? '💧' : '💊'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#1f1a1c] truncate">{item.title}</p>
                        <span className="text-[10px] text-gray-400 shrink-0">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-[#5a4044] mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-pink-100 bg-[#fff8f8] flex justify-end">
              <button
                onClick={() => setShowNotifications(false)}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#b0004a] hover:bg-[#d81b60] rounded-full shadow-xs cursor-pointer transition-all"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
