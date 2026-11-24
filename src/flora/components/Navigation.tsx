import React from 'react';
import { Heart, CalendarDays, Leaf, BarChart2, User, Users } from 'lucide-react';
import { TabType, PARTNER_ENABLED } from '../types';
import { AdBanner } from './AdBanner';

const CYCLE_RING = [
  { flower: '🌸', radius: 18, seconds: 7, delay: 0, reverse: false },
  { flower: '🌿', radius: 26, seconds: 11, delay: 1.4, reverse: true },
  { flower: '✨', radius: 15, seconds: 6, delay: 0.6, reverse: false },
  { flower: '🌼', radius: 28, seconds: 13, delay: 2.2, reverse: true },
  { flower: '🌺', radius: 21, seconds: 8, delay: 1.1, reverse: false },
  { flower: '🍃', radius: 24, seconds: 10, delay: 2.8, reverse: true },
  { flower: '✨', radius: 17, seconds: 9, delay: 0.3, reverse: true },
  { flower: '🌿', radius: 30, seconds: 14, delay: 1.8, reverse: false },
  { flower: '🌷', radius: 20, seconds: 8, delay: 0.9, reverse: true },
  { flower: '💐', radius: 33, seconds: 12, delay: 2.5, reverse: false },
  { flower: '🌻', radius: 16, seconds: 7, delay: 1.6, reverse: true },
  { flower: '💮', radius: 27, seconds: 15, delay: 0.2, reverse: false },
  { flower: '🌹', radius: 23, seconds: 9, delay: 3.2, reverse: true },
  { flower: '🪻', radius: 19, seconds: 11, delay: 0.7, reverse: false },
  { flower: '🏵️', radius: 31, seconds: 13, delay: 2.1, reverse: true },
  { flower: '🌸', radius: 25, seconds: 8, delay: 1.3, reverse: false },
  { flower: '🌼', radius: 22, seconds: 10, delay: 2.6, reverse: true },
  { flower: '🌺', radius: 29, seconds: 12, delay: 0.5, reverse: false },
  { flower: '🍃', radius: 17, seconds: 9, delay: 3.4, reverse: true },
];

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  premium: boolean;
  partnerMode: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, premium, partnerMode }) => {
  const tabs = [
    { id: 'bugun' as TabType, label: 'Bugün', icon: Heart },
    { id: 'dongu' as TabType, label: 'Döngü', icon: CalendarDays },
    { id: 'rehber' as TabType, label: 'Rehber', icon: Leaf },
    { id: 'raporlar' as TabType, label: 'Raporlar', icon: BarChart2 },
    ...(PARTNER_ENABLED && partnerMode ? [{ id: 'partner' as TabType, label: 'Partner', icon: Users }] : []),
    { id: 'profil' as TabType, label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe pointer-events-none">
      <div className="floria-nav-content mx-auto px-4 pb-3">
        <AdBanner premium={premium} onRemove={() => setActiveTab('profil')} />
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl rounded-full py-2 px-3 shadow-[0_12px_36px_rgba(216,27,96,0.18)] border border-pink-100 flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative min-h-11 min-w-11 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-[#805062] hover:text-[#b0004a]'
                }`}
              >
                {isActive ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-10 h-10">
                      <div className="pointer-events-none absolute inset-0">
                        {CYCLE_RING.map((bit, index) => (
                          <span
                            key={`${bit.flower}-${index}`}
                            className="absolute left-1/2 top-1/2 h-0 w-0"
                            style={{
                              animation: `spinSlow ${bit.seconds}s linear infinite`,
                              animationDirection: bit.reverse ? 'reverse' : 'normal',
                              animationDelay: `-${bit.delay}s`,
                            }}
                          >
                            <span
                              className="absolute left-0 top-0 text-[11px] leading-none"
                              style={{ transform: `translate(-50%, -${bit.radius}px) rotate(${index * 18}deg)` }}
                            >
                              {bit.flower}
                            </span>
                          </span>
                        ))}
                      </div>
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#b0004a] to-[#d81b60] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(216,27,96,0.4)]">
                        <Icon className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold text-[#b0004a] mt-1">
                      {tab.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-1 px-1">
                    <Icon className="w-4 h-4 text-[#805062]" />
                    <span className="text-[9px] font-semibold text-[#805062] mt-1">
                      {tab.label}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
