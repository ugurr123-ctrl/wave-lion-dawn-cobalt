import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';
import { FloraLogo } from './FloraLogo';
import { soundEngine } from '../utils/audio';
import { triggerRosePollenBurst } from '../utils/confetti';
import { DayInfo, CycleRecord } from '../types';
import { cycleDayFromLastPeriod, formatTrDate, parseLocalISO } from '../utils/cycleIntelligence';
import { PremiumGarden } from './PremiumGarden';
import { isPremiumActive } from '../premium';

interface ReportsTabProps {
  onOpenDoctorReport: () => void;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
  goal: string;
  loggedDays: DayInfo[];
  cycles: CycleRecord[];
  premium: boolean;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  onOpenDoctorReport,
  cycleLength,
  periodLength,
  lastPeriodDate,
  goal,
  loggedDays,
  cycles,
  premium,
}) => {
  const [paywall, setPaywall] = useState(false);
  const [allowed, setAllowed] = useState(premium);
  const [activeFilter, setActiveFilter] = useState<'3cycles' | '6months' | 'year'>('6months');
  const hasCycle = Boolean(lastPeriodDate);
  const cycleDay = hasCycle ? cycleDayFromLastPeriod(lastPeriodDate, cycleLength) : 0;
  const source = cycles.length
    ? cycles
    : hasCycle
      ? [{ start: lastPeriodDate, cycleLength, periodLength }]
      : [];
  const now = new Date();
  const cutoff = new Date(now);
  if (activeFilter === '6months') cutoff.setMonth(cutoff.getMonth() - 6);
  if (activeFilter === 'year') cutoff.setFullYear(cutoff.getFullYear() - 1);
  const inWindow = source.filter((item) => {
    const date = parseLocalISO(item.start);
    if (!date) return false;
    return activeFilter === '3cycles' ? true : date >= cutoff;
  });
  const shown = activeFilter === '3cycles' ? inWindow.slice(-3) : inWindow;
  const lengths = shown.map((item) => item.cycleLength);
  const avg = lengths.length ? Math.round(lengths.reduce((sum, value) => sum + value, 0) / lengths.length) : cycleLength;
  const spread = lengths.length > 1 ? Math.max(...lengths) - Math.min(...lengths) : null;
  const earliest = shown[0]?.start;
  const visibleLogs = loggedDays.filter((day) => {
    if (!day.date || !earliest) return activeFilter !== '3cycles' ? false : Boolean(day.date);
    if (activeFilter === '3cycles') return day.date >= earliest;
    const date = parseLocalISO(day.date);
    return Boolean(date && date >= cutoff);
  });
  const ringOffset = 257.6 * (1 - (hasCycle ? cycleDay / cycleLength : 0));

  const ovulationDay = Math.max(periodLength + 1, cycleLength - 14);
  const reglDays = Math.min(periodLength, cycleLength);
  const fertileDays = Math.min(5, Math.max(1, ovulationDay - reglDays));
  const follicularDays = Math.max(0, ovulationDay - fertileDays - reglDays);
  const lutealDays = Math.max(0, cycleLength - ovulationDay);
  const phaseTotal = reglDays + follicularDays + fertileDays + lutealDays || 1;
  const pct = (days: number) => Math.round((days / phaseTotal) * 100);

  const symptomCounts = new Map<string, number>();
  for (const day of visibleLogs) {
    for (const symptom of day.symptoms || []) {
      symptomCounts.set(symptom, (symptomCounts.get(symptom) || 0) + 1);
    }
  }
  const loggedWithSymptoms = visibleLogs.filter((day) => (day.symptoms || []).length > 0).length;
  const symptomRows = [...symptomCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({
      label,
      percent: Math.round((count / Math.max(1, loggedWithSymptoms)) * 100),
      count,
    }));

  const filterTitles = {
    '3cycles': 'Son 3 döngü',
    '6months': 'Son 6 ay',
    year: 'Son 12 ay',
  } as const;

  const current = {
    title: hasCycle ? filterTitles[activeFilter] : 'Rapor',
    score: hasCycle ? cycleDay : 0,
    regularity: shown.length > 1 ? `${shown.length} döngü` : hasCycle ? 'Tek döngü' : 'Kayıt yok',
    avgLength: hasCycle ? `${avg} gün` : '—',
    deviation: spread === null ? 'eski döngü yok' : `${spread} gün fark`,
    periodDays: hasCycle ? `${shown.at(-1)?.periodLength ?? periodLength} gün` : '—',
    diagnostic: hasCycle
      ? `${filterTitles[activeFilter]} içinde ${shown.length} döngü kaydı var. Son başlangıç ${formatTrDate(lastPeriodDate)}. Bugün ${cycleDay}. gün${goal ? ` (${goal})` : ''}.`
      : 'Rapor, döngü başlangıcını kaydettikten sonra bu döngüye göre oluşur.',
    history: shown.map((item) => ({
      month: parseLocalISO(item.start)?.toLocaleDateString('tr-TR', { month: 'short' }) || item.start,
      days: item.cycleLength,
      active: item.start === lastPeriodDate,
    })),
    offset: ringOffset,
  };

  const handleFilterClick = (filter: '3cycles' | '6months' | 'year', e: React.MouseEvent) => {
    soundEngine.playDropletSound();
    setActiveFilter(filter);
    triggerRosePollenBurst(e.clientX, e.clientY);
  };

  const handlePdfClick = (e: React.MouseEvent) => {
    if (!allowed && !isPremiumActive()) {
      setPaywall(true);
      return;
    }
    soundEngine.playCrystalChime();
    triggerRosePollenBurst(e.clientX, e.clientY);
    onOpenDoctorReport();
  };

  return (
    <div className="space-y-4 pb-40 pt-2 select-none text-[#1f1a1c]">
      {/* Top Header & PDF Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FloraLogo size="md" />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#b0004a] to-amber-600">
                Biyometrik Özet
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 shadow-xs flex items-center gap-0.5">
                🌸 Canlı
              </span>
            </div>
            <h2 className="text-xl font-black text-[#1f1a1c]">
              {current.title}
            </h2>
          </div>
        </div>

        <button
          onClick={handlePdfClick}
          aria-label="PDF Paylaş veya İndir"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-white to-pink-50 text-[#b0004a] shadow-[0_10px_24px_-4px_rgba(216,27,96,0.22)] hover:shadow-lg active:scale-90 transition-all flex items-center justify-center relative border border-pink-100 cursor-pointer"
        >
          <FileText className="w-5 h-5 text-[#d81b60]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-tr from-amber-400 to-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.7)] flex items-center justify-center text-[9px] text-white font-bold">
            ✨
          </span>
        </button>
      </div>

      {/* Interactive 3D Pill Period Filter */}
      <div className="p-1.5 bg-gradient-to-r from-pink-50/60 via-white to-pink-50/60 rounded-full flex items-center justify-between gap-1 border border-pink-100/80 shadow-inner">
        <button
          onClick={(e) => handleFilterClick('3cycles', e)}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${
            activeFilter === '3cycles'
              ? 'bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white shadow-md'
              : 'text-[#805062] hover:text-[#b0004a]'
          }`}
        >
          Son 3 Döngü
        </button>

        <button
          onClick={(e) => handleFilterClick('6months', e)}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
            activeFilter === '6months'
              ? 'bg-gradient-to-r from-[#b0004a] via-[#d81b60] to-fuchsia-600 text-white shadow-[0_8px_20px_rgba(216,27,96,0.4)]'
              : 'text-[#805062] hover:text-[#b0004a]'
          }`}
        >
          <span>Son 6 Ay</span>
          <span className="text-[12px] animate-pulse">🌿</span>
        </button>

        <button
          onClick={(e) => handleFilterClick('year', e)}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${
            activeFilter === 'year'
              ? 'bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white shadow-md'
              : 'text-[#805062] hover:text-[#b0004a]'
          }`}
        >
          Tüm Yıl
        </button>
      </div>

      {/* HERO CARD: CYCLE HEALTH SCORE */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_16px_36px_-8px_rgba(216,27,96,0.14)] border border-pink-100/80 relative overflow-hidden">
        {/* Soft radial blooms */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-gradient-to-bl from-pink-200/50 via-rose-100/40 to-amber-100/30 blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-emerald-100/40 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#b0004a] to-amber-400 animate-pulse shadow-[0_0_10px_#d81b60]" />
            <span className="text-xs font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#805062] to-[#b0004a] flex items-center gap-1.5">
              Döngü günü
              <span className="text-amber-500 animate-spin-slow text-sm">🌿</span>
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold flex items-center gap-1 border border-emerald-200/70 shadow-xs">
            <span className="text-emerald-600 font-bold">✔</span> {current.regularity} 🌸
          </span>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          {/* Radial Score Chart with Specular Ring & Glow */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90 drop-shadow-[0_8px_16px_rgba(216,27,96,0.35)]" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="scoreGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff007a" />
                  <stop offset="50%" stopColor="#d81b60" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" fill="transparent" r="41" stroke="#f6ebed" strokeWidth="10" />
              <circle
                className="transition-all duration-700 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r="41"
                stroke="url(#scoreGlowGrad)"
                strokeDasharray="257.6"
                strokeDashoffset={current.offset}
                strokeLinecap="round"
                strokeWidth="10"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#b0004a] via-[#d81b60] to-amber-600 tracking-tight">
                {current.score}
              </span>
              <span className="text-[10px] font-bold text-[#805062] flex items-center">
                / {hasCycle ? cycleLength : '—'} gün
              </span>
            </div>
          </div>

          {/* Quick Cycle Key Stats */}
          <div className="flex-1 space-y-2">
            <div className="p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100/60">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-[#805062]">Döngü uzunluğu</p>
                <span className="text-xs">🌿</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-[#b0004a] to-fuchsia-600">
                  {current.avgLength}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                  ({current.deviation})
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100/60 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-[#805062]">Kanama Süresi</p>
                <span className="text-base font-black text-[#1f1a1c]">{current.periodDays}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md">
                <span className="text-xs">💧</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Pill */}
        <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-pink-50/80 to-amber-50/60 border border-pink-100 text-xs text-[#5a4044] leading-relaxed relative z-10">
          <span className="font-extrabold text-[#b0004a] block mb-0.5">
            Bu döngü
          </span>
          {current.diagnostic}
        </div>
      </div>

      {/* DYNAMIC CYCLE LENGTH CAPSULE BARS */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-extrabold text-sm text-[#1f1a1c]">
              Döngü Uzunluğu Geçmişi ({current.history.length} Dönem)
            </h4>
            <p className="text-[11px] text-[#805062]">
              {hasCycle ? `Başlangıç: ${formatTrDate(lastPeriodDate)}` : 'Tarih yok'}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-pink-50 text-[#b0004a] text-xs font-black border border-pink-200">
            {current.regularity}
          </span>
        </div>

        {/* Bar Chart Area */}
        <div className="relative pt-6 pb-2">
          {/* 28-Day Dashed Guideline */}
          <div className="absolute top-11 left-0 right-0 border-b border-dashed border-amber-400 flex justify-end">
            <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 shadow-xs -mt-2">
              {cycleLength}G
            </span>
          </div>

          {current.history.length === 0 ? (
            <p className="text-xs text-[#805062] py-6 text-center">Henüz döngü kaydı yok.</p>
          ) : (
          <div className="flex items-end justify-between gap-1.5 sm:gap-2.5 h-28 pt-4 overflow-x-auto no-scrollbar">
            {current.history.map((item, idx) => (
              <div key={`${item.month}-${idx}`} className="flex-1 min-w-[28px] max-w-[72px] flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-black text-[#1f1a1c]">
                  {item.days}g
                </span>
                <div
                  className="w-full rounded-2xl transition-all duration-500 bg-gradient-to-t from-[#b0004a] to-[#d81b60] shadow-md ring-2 ring-pink-300"
                  style={{ height: `${(item.days / 40) * 100}%` }}
                />
                <span className="text-[10px] font-bold text-[#b0004a]">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* AVERAGE PHASE BREAKDOWN */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3.5">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-[#1f1a1c]">
            Ortalama Faz Dağılımı ({cycleLength} gün)
          </h4>
          <span className="text-[11px] font-bold text-[#805062]">{hasCycle ? 'Bu döngü' : '—'}</span>
        </div>

        {/* Segmented Bar */}
        <div className="w-full h-3.5 rounded-full overflow-hidden flex gap-0.5 p-0.5 bg-pink-50 border border-pink-100 shadow-inner">
          <div className="bg-[#d81b60] rounded-l-full" style={{ width: `${pct(reglDays)}%` }} />
          <div className="bg-[#fec1d6]" style={{ width: `${pct(follicularDays)}%` }} />
          <div className="bg-emerald-500 shadow-xs" style={{ width: `${pct(fertileDays)}%` }} />
          <div className="bg-[#a35879] rounded-r-full" style={{ width: `${pct(lutealDays)}%` }} />
        </div>

        {/* 4 Phase Cards */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-pink-50/40 border border-pink-100">
            <span className="text-[10.5px] font-extrabold text-[#d81b60] block">Kanama</span>
            <p className="font-black text-[#1f1a1c] mt-0.5 text-sm">{reglDays} gün (%{pct(reglDays)})</p>
            <p className="text-[10px] text-[#805062]">Kaydettiğin kanama süresi</p>
          </div>
          <div className="p-3 rounded-2xl bg-pink-50/40 border border-pink-100">
            <span className="text-[10.5px] font-extrabold text-[#805062] block">Foliküler Evre</span>
            <p className="font-black text-[#1f1a1c] mt-0.5 text-sm">{follicularDays} gün (%{pct(follicularDays)})</p>
            <p className="text-[10px] text-[#805062]">Kanama sonrası, doğurgan pencereden önce</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <span className="text-[10.5px] font-extrabold text-emerald-700 block">Doğurgan Pencere</span>
            <p className="font-black text-emerald-950 mt-0.5 text-sm">{fertileDays} gün (%{pct(fertileDays)})</p>
            <p className="text-[10px] text-emerald-700">Yaklaşık {ovulationDay}. gün</p>
          </div>
          <div className="p-3 rounded-2xl bg-pink-50/40 border border-pink-100">
            <span className="text-[10.5px] font-extrabold text-[#a35879] block">Luteal Evre</span>
            <p className="font-black text-[#1f1a1c] mt-0.5 text-sm">{lutealDays} gün (%{pct(lutealDays)})</p>
            <p className="text-[10px] text-[#805062]">Sonraki adete kadar</p>
          </div>
        </div>
      </div>

      {/* SIK GÖRÜLEN BELİRTİLER & HORMON KORELASYONLARI */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3.5">
        <h4 className="font-extrabold text-sm text-[#1f1a1c]">
          Sık Görülen Belirtiler & Biyo-Korelasyon
        </h4>

        {symptomRows.length === 0 ? (
          <p className="text-xs text-[#805062] leading-relaxed">
            Henüz belirti kaydı yok. Bugün ekranından eklediğin belirtiler burada görünür.
          </p>
        ) : (
        <div className="space-y-3">
          {symptomRows.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#1f1a1c]">
                <span>{item.label}</span>
                <span className="text-[#b0004a] font-extrabold">{item.count} kayıt</span>
              </div>
              <div className="w-full h-2.5 bg-pink-50 rounded-full overflow-hidden p-0.5 border border-pink-100">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-[#b0004a] rounded-full"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* JİNEKOLOG ZİYARET ÖZETİ CTA */}
      <div className="bg-gradient-to-r from-[#b0004a] to-[#d81b60] rounded-3xl p-5 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-300" />
          <h4 className="font-extrabold text-sm">
            Döngü özeti
          </h4>
        </div>
        <p className="text-xs text-pink-100 leading-relaxed">
          Kaydettiğin döngü ve belirtilerden oluşan özeti görüntüle. Eski döngü uydurulmaz.
        </p>

        <button
          onClick={handlePdfClick}
          className="w-full py-3.5 rounded-2xl bg-white text-[#b0004a] text-xs font-black shadow-lg hover:bg-pink-50 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#d81b60]" />
          <span>{allowed || isPremiumActive() ? 'Özeti görüntüle ve PDF indir' : 'PDF Premium’da'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
        {paywall && !isPremiumActive() && (
          <PremiumGarden onChange={() => setAllowed(isPremiumActive())} />
        )}
      </div>
    </div>
  );
};
