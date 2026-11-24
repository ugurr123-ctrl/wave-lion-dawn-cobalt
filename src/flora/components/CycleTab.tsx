import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar as CalendarIcon,
  PlusCircle,
  Heart,
  Droplet,
  Flame,
  CheckCircle2,
  Activity,
  ArrowRight,
  Wind,
  Coffee
} from 'lucide-react';
import { DayInfo, CyclePhase } from '../types';
import { FloraLogo } from './FloraLogo';
import { soundEngine } from '../utils/audio';
import { triggerRosePollenBurst } from '../utils/confetti';
import { calculateConceptionProbability } from '../utils/cycleIntelligence';
import { parseLocalISO, phaseForCycleDay } from '../utils/cycleIntelligence';

interface CycleTabProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onOpenSymptomModal: () => void;
  dayDataMap: Record<string, DayInfo>;
  cycleLength?: number;
  periodLength?: number;
  lastPeriodDate?: string;
}

export const CycleTab: React.FC<CycleTabProps> = ({
  selectedDay,
  onSelectDay,
  onOpenSymptomModal,
  dayDataMap,
  cycleLength = 28,
  periodLength = 5,
  lastPeriodDate = '',
}) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const monthIndex = todayDate.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingBlanks = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const selectedIso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
  const loggedDay = dayDataMap[selectedIso];
  const monthTitle = todayDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
  const monthName = todayDate.toLocaleDateString('tr-TR', { month: 'long' });
  const ovulationDay = Math.max(periodLength + 1, cycleLength - 14);

  const cycleDayOn = (day: number): number | null => {
    const start = parseLocalISO(lastPeriodDate);
    if (!start) return null;
    const date = new Date(year, monthIndex, day);
    date.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const diff = Math.round((date.getTime() - start.getTime()) / 86400000);
    if (diff < 0) return null;
    return (diff % cycleLength) + 1;
  };

  const phaseMeta = (day: number) => {
    const cycleDay = cycleDayOn(day);
    if (!cycleDay) return { phase: 'folikuler' as CyclePhase, label: 'Tarih yok', cycleDay: 0 };
    const phase = phaseForCycleDay(cycleDay, periodLength, cycleLength);
    const labels: Record<CyclePhase, string> = {
      regl: 'Kanama',
      folikuler: 'Foliküler faz',
      ovulasyon: 'Doğurgan pencere',
      luteal: 'Luteal faz',
      pms: 'Adet öncesi',
    };
    return { phase, label: labels[phase], cycleDay };
  };

  const handleDayClick = (day: number, e: React.MouseEvent) => {
    soundEngine.playDropletSound();
    onSelectDay(day);
    if (cycleDayOn(day) === ovulationDay) {
      triggerRosePollenBurst(e.clientX, e.clientY);
    }
  };

  const selectedPhaseMeta = phaseMeta(selectedDay);
  const selectedConception = calculateConceptionProbability(selectedPhaseMeta.cycleDay || 1, cycleLength);

  const forecast = (() => {
    const start = parseLocalISO(lastPeriodDate);
    if (!start) return null;
    const today0 = new Date(year, monthIndex, todayDate.getDate());
    today0.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const diff = Math.round((today0.getTime() - start.getTime()) / 86400000);
    const into = diff < 0 ? 0 : diff % cycleLength;
    const daysLeft = cycleLength - into;
    const label = (n: number) => {
      const d = new Date(today0);
      d.setDate(d.getDate() + n);
      return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' });
    };
    const pmsDay = Math.max(ovulationDay + 1, cycleLength - 4);
    return {
      period: `${label(daysLeft)} • ${daysLeft} gün kaldı`,
      pms: label((pmsDay - 1 - into + cycleLength) % cycleLength),
      ov: label((ovulationDay - 1 - into + cycleLength) % cycleLength),
    };
  })();

  return (
    <div className="floria-tab-grid space-y-4 pb-40 pt-2 select-none text-[#1f1a1c]">
      {/* Sub-Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FloraLogo size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#805062] uppercase tracking-wider block">
                Floria
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-pink-100 text-[#b0004a] font-bold">
                Biyo-Takvim
              </span>
            </div>
            <h2 className="text-xl font-black text-[#1f1a1c] tracking-tight">
              {monthTitle}
            </h2>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playDropletSound();
            onSelectDay(todayDate.getDate());
          }}
          className="px-3.5 py-1.5 rounded-full bg-pink-100 text-[#b0004a] text-xs font-black hover:bg-pink-200 transition-all shadow-xs cursor-pointer"
        >
          Bugün
        </button>
      </div>

      {/* Legend Pills */}
      <div className="p-2.5 rounded-2xl bg-white border border-pink-100 shadow-xs flex items-center justify-between text-[11px] font-bold text-[#805062] overflow-x-auto no-scrollbar gap-2">
          <span className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d81b60]" /> Kanama (1-{periodLength}. gün)
        </span>
        <span className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Foliküler
        </span>
        <span className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-300" /> Doğurgan (~{ovulationDay}. gün)
        </span>
        <span className="flex items-center gap-1 shrink-0 text-amber-700 font-extrabold">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Adet öncesi
        </span>
      </div>

      {/* CLAY CALENDAR GRID */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1f1a1c] flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-[#d81b60]" />
            {monthTitle}
          </span>
          <span className="text-xs font-black text-[#b0004a] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
            {lastPeriodDate ? `Yumurtlama ~${ovulationDay}. gün` : 'Tarih yok'}
          </span>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center py-1 border-y border-pink-50">
          {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map((dw) => (
            <span key={dw} className="text-xs font-bold text-[#805062]">
              {dw}
            </span>
          ))}
        </div>

        {/* Calendar Day Cells */}
        <div className="grid grid-cols-7 gap-1.5 py-1">
          {Array.from({ length: leadingBlanks }, (_, i) => (
            <div key={`blank-${i}`} className="h-10" />
          ))}

          {monthDays.map((day) => {
            const isSelected = selectedDay === day;
            const isToday = day === todayDate.getDate();
            const meta = phaseMeta(day);
            const { phase } = meta;
            const isPeak = meta.cycleDay === ovulationDay && meta.cycleDay > 0;

            let bgClass = 'bg-[#fff8f8] text-[#1f1a1c]';
            let dotColor = '';

            if (!lastPeriodDate) {
              bgClass = 'bg-[#fff8f8] text-[#1f1a1c]';
            } else if (phase === 'regl') {
              bgClass = 'bg-rose-100/70 text-rose-900 border border-rose-200/50';
              dotColor = 'bg-[#d81b60]';
            } else if (phase === 'folikuler') {
              bgClass = 'bg-emerald-50/50 text-[#1f1a1c] border border-emerald-100/60';
              dotColor = 'bg-emerald-400';
            } else if (phase === 'ovulasyon') {
              if (isPeak) {
                bgClass = 'bg-gradient-to-tr from-[#b0004a] to-[#d81b60] text-white shadow-[0_4px_14px_rgba(216,27,96,0.38)] font-black ring-2 ring-white z-10';
                dotColor = 'bg-white animate-ping';
              } else {
                bgClass = 'bg-[#ffd9de] text-[#b0004a] font-bold border border-pink-200';
                dotColor = 'bg-[#d81b60]';
              }
            } else if (phase === 'luteal') {
              bgClass = 'bg-pink-50/40 text-[#805062]';
              dotColor = 'bg-pink-300';
            } else if (phase === 'pms') {
              bgClass = 'bg-amber-50 text-amber-900 border border-amber-200/50';
              dotColor = 'bg-amber-400';
            }

            return (
              <button
                key={day}
                onClick={(e) => handleDayClick(day, e)}
                className={`h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all cursor-pointer ${bgClass} ${
                  isSelected && !isPeak
                    ? 'ring-2 ring-[#b0004a] font-black bg-white shadow-sm'
                    : ''
                } ${isToday ? 'outline outline-1 outline-[#b0004a]' : ''}`}
              >
                <span className={`text-xs ${isSelected ? 'font-black' : 'font-bold'}`}>
                  {day}
                </span>
                {dotColor && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${dotColor}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED DAY DETAIL CARD WITH ACCURATE GEBE KALMA İHTİMALİ */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-[#1f1a1c]">
                {selectedDay} {monthName}
              </span>
              {selectedDay === todayDate.getDate() && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  Bugün
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-[#b0004a] mt-0.5">
              {selectedPhaseMeta.cycleDay ? `Döngü günü ${selectedPhaseMeta.cycleDay}` : 'Döngü günü yok'} • {selectedPhaseMeta.label}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#805062] block font-semibold">Tahmini doğurganlık</span>
            <span className="text-sm font-black text-[#b0004a]">{selectedConception.label}</span>
          </div>
        </div>

        {/* Phase-specific biological guidance */}
        {selectedPhaseMeta.phase === 'pms' ? (
          /* PMS & Pre-anger soothing banner */
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/70 space-y-1">
            <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
              <span>🕊️</span> Adet Öncesi Şefkat & Öfke Yatıştırma
            </span>
            <p className="text-[11px] text-[#5a4044] leading-relaxed">
              Progesteron düşüşü nedeniyle gerginlik veya öfke hissi olağandır. 4-7-8 nefes egzersizi yapın, melisa çayı için ve kendinize dinlenme alanı açın.
            </p>
          </div>
        ) : selectedPhaseMeta.phase === 'folikuler' ? (
          /* Follicular phase guidance */
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/70 space-y-1">
            <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
              <span>🌱</span> Foliküler Faz: Östrojen Yükseliyor
            </span>
            <p className="text-[11px] text-[#5a4044] leading-relaxed">
              Yumurta folikülü gelişirken enerji, zihinsel odak ve motivasyon artar. Yeni projelere başlamak ve dinamik sporlar için en verimli evre.
            </p>
          </div>
        ) : (
          /* Conception explanation */
          <div className="p-3 rounded-2xl bg-pink-50/60 border border-pink-100 text-[11px] text-[#5a4044] leading-relaxed">
            {selectedConception.explanation}
          </div>
        )}

        <div className="p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#805062] flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500" /> Enerji
          </span>
          <span className="text-xs font-black text-[#1f1a1c]">
            {selectedPhaseMeta.phase === 'ovulasyon' ? 'Zirve' : selectedPhaseMeta.phase === 'folikuler' ? 'Yükselişte' : 'Dengeli'}
          </span>
        </div>

        {loggedDay && (loggedDay.flow || loggedDay.intimacy || loggedDay.sleep || loggedDay.note || loggedDay.symptoms?.length) && (
          <div className="flex flex-wrap gap-1.5">
            {loggedDay.flow && loggedDay.flow !== 'Yok' && <span className="rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]">Kanama {loggedDay.flow}</span>}
            {loggedDay.intimacy && loggedDay.intimacy !== 'Yok' && <span className="rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]">İlişki {loggedDay.intimacy}</span>}
            {loggedDay.sleep && <span className="rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]">Uyku {loggedDay.sleep}</span>}
            {loggedDay.pain && loggedDay.pain !== 'Yok' && <span className="rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]">Ağrı {loggedDay.pain}</span>}
            {loggedDay.note && <span className="rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#805062]">{loggedDay.note}</span>}
          </div>
        )}

        {/* Button to add symptom for this day */}
        <button
          onClick={onOpenSymptomModal}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Bu güne ekle: belirti, uyku, ilişki, not</span>
        </button>
      </div>

      {/* SMART CYCLE FORECAST ENGINE */}
      <div className="rounded-3xl bg-gradient-to-br from-[#4a152e] to-[#2d0b1a] text-white p-5 shadow-xl space-y-3.5 border border-rose-950/40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">
              Akıllı Döngü Tahmin Motoru
            </h4>
            <p className="text-[11px] text-rose-200/70">
              Döngü uzunluğundan hesaplanan evreler
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {/* Gelecek Regl */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-rose-100">Sonraki kanama</p>
              <p className="text-[11px] text-rose-300">{forecast ? forecast.period : 'Başlangıç tarihi yok'}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#d81b60] text-white text-[10px] font-black shadow-xs">
              Tahmin
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-rose-100">Adet öncesi</p>
              <p className="text-[11px] text-rose-300">{forecast ? forecast.pms : 'Başlangıç tarihi yok'}</p>
            </div>
            <span className="text-xs font-bold text-amber-300">Bu döngü</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-rose-100">Sonraki yumurtlama</p>
              <p className="text-[11px] text-rose-300">{forecast ? forecast.ov : 'Başlangıç tarihi yok'}</p>
            </div>
            <span className="text-xs font-bold text-emerald-300">~{ovulationDay}. gün</span>
          </div>
        </div>
      </div>
    </div>
  );
};
