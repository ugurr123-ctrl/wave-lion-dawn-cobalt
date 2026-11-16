import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { CyclePhase } from '../types';
import { formatTrDate, parseLocalISO, phaseForCycleDay, toLocalISO } from '../utils/cycleIntelligence';
import { soundEngine } from '../utils/audio';
import { guideNote } from '../dailyTips';

export type LifeId = 'mind' | 'meeting' | 'fog' | 'trip' | 'delay' | 'travel' | 'libido' | 'social' | 'talk';

export function isLifeId(id: string): id is LifeId {
  return ['mind', 'meeting', 'fog', 'trip', 'delay', 'travel', 'libido', 'social', 'talk'].includes(id);
}

const SCREEN_DESCRIPTION: Record<string, string> = {
  "Zihin takvimi": "Döngü takvimindeki günlere bakarak işlerini planla.",
  "Toplantı danışmanı": "Toplantı için düşündüğün günü takvim üzerinde incele.",
  "Beyin sisi": "Dikkatini toparlamak için işleri küçük adımlara böl.",
  "Tatil çakışması": "Seyahat tarihlerini tahmini adet aralığıyla karşılaştır.",
  "Tarih kaydırma": "Planın için alternatif tarihleri incele.",
  "Uçuş ve özel gece": "Uçuş ve akşam planı için hazırlık önerilerine göz at.",
  "Libido penceresi": "Libido takibini ve döngü tahminini birlikte incele.",
  "Sosyal pil": "Sosyal planlarını kendi enerji düzeyine göre gözden geçir.",
  "İletişim": "İhtiyaçlarını anlatmak için örnek cümlelerden yararlan."
};

function Shell({ title, phase, onBack, children }: { title: string; phase: CyclePhase; onBack: () => void; children: React.ReactNode }) {
  const labels: Record<CyclePhase, string> = {
    regl: 'Kanama günleri',
    folikuler: 'Foliküler faz',
    ovulasyon: 'Doğurgan pencere',
    luteal: 'Luteal faz',
    pms: 'Adet öncesi',
  };
  const look: Record<string, { name: string; sub: string; icon: string; chip: string }> = {
    'Zihin takvimi': { name: 'Zihin', sub: 'Güç takvimi', icon: '🧠', chip: 'İş' },
    'Toplantı danışmanı': { name: 'Toplantı', sub: 'Gün seçimi', icon: '📅', chip: 'İş' },
    'Beyin sisi': { name: 'Sis', sub: 'Erteleme notu', icon: '🌫️', chip: 'İş' },
    'Tatil çakışması': { name: 'Tatil', sub: 'Çakışma hesabı', icon: '🧳', chip: 'Seyahat' },
    'Tarih kaydırma': { name: 'Tarih', sub: 'Öteleme notu', icon: '🗓️', chip: 'Seyahat' },
    'Uçuş ve özel gece': { name: 'Uçuş', sub: 'Gece hazırlığı', icon: '✈️', chip: 'Seyahat' },
    'Libido penceresi': { name: 'Libido', sub: 'Pencere hesabı', icon: '💗', chip: 'Sosyal' },
    'Sosyal pil': { name: 'Sosyal pil', sub: 'Enerji tahmini', icon: '🎉', chip: 'Sosyal' },
    İletişim: { name: 'İletişim', sub: 'Yumuşak metin', icon: '💬', chip: 'Sosyal' },
  };
  const tone = look[title] ?? { name: title, sub: labels[phase], icon: '🌸', chip: 'Rehber' };
  return (
    <div className="space-y-3 pb-40 pt-1 text-[#1f1a1c]">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundEngine.playDropletSound();
            onBack();
          }}
          className="flex items-center gap-1 rounded-full bg-white border border-[#f3e7eb] px-3 py-2 text-xs font-semibold cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Rehbere Dön
        </button>
        <span className="rounded-full bg-[#fde7ef] text-[#e23b78] px-3 py-2 text-xs font-bold">{tone.chip}</span>
      </div>
      <div className="rounded-[28px] bg-white border border-[#f6e4ea] p-4 shadow-[0_10px_30px_rgba(22,19,20,0.04)]">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-[18px] bg-[#fff4d8] flex items-center justify-center text-2xl shrink-0">{tone.icon}</div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#e23b78]">FLORIA</p>
            <h2 className="text-[26px] font-black leading-none mt-1">{tone.name}</h2>
            <p className="text-sm font-bold text-[#e23b78] mt-1">{tone.sub}</p>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed text-[#6d5a60] mt-3">{SCREEN_DESCRIPTION[title] ?? tone.sub}</p>
      </div>
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] bg-white border border-[#f3e7eb] p-[18px] shadow-[0_10px_30px_rgba(22,19,20,0.04)] space-y-3">
      {children}
    </div>
  );
}

export interface LifeProps {
  phase: CyclePhase;
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
  onBack: () => void;
}
function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function cycleDayOn(lastPeriodDate: string, cycleLength: number, date: Date): number | null {
  const start = parseLocalISO(lastPeriodDate);
  if (!start || cycleLength < 1) return null;
  const diff = Math.round((startOfDay(date).getTime() - startOfDay(start).getTime()) / 86400000);
  if (diff < 0) return null;
  return (diff % cycleLength) + 1;
}

function workFit(day: number, periodLength: number, cycleLength: number) {
  const ovulation = Math.max(periodLength + 1, cycleLength - 14);
  if (day <= Math.max(1, periodLength)) {
    return { tag: 'Hafif iş', score: 34, note: 'Derin analiz, sunum ve imza için zayıf gün.' };
  }
  if (day < ovulation - 1) {
    return { tag: 'Analiz', score: 90, note: 'Odak yüksek. Sözleşme, tablo ve karar için güçlü gün.' };
  }
  if (day <= ovulation + 1) {
    return { tag: 'Sunum', score: 96, note: 'Özgüven penceresi. Toplantı, mülakat ve sunum için en uygun aralık.' };
  }
  if (day >= cycleLength - 4) {
    return { tag: 'Ertele', score: 28, note: 'Beyin sisi riski. Yoğun işi bu günden kaydır.' };
  }
  return { tag: 'Rutin', score: 60, note: 'Alışılmış iş olur. Büyük kararı analiz gününe bırak.' };
}

function periodStarts(lastPeriodDate: string, cycleLength: number): Date[] {
  const start = parseLocalISO(lastPeriodDate);
  if (!start) return [];
  const today = startOfDay(new Date());
  const diff = Math.round((today.getTime() - startOfDay(start).getTime()) / 86400000);
  const first = diff < 0 ? 0 : Math.floor(diff / cycleLength);
  return Array.from({ length: 8 }, (_, index) => addDays(startOfDay(start), (first + index) * cycleLength));
}

function NeedDate({ lastPeriodDate }: { lastPeriodDate: string }) {
  if (lastPeriodDate) return null;
  return (
    <p className="text-[11px] text-[#b0004a]">
      Hesap için döngü başlangıcını kurulumda veya profilden kaydet.
    </p>
  );
}

export function LifeScreen(props: LifeProps & { id: LifeId }) {
  if (props.id === 'mind') return <Mind {...props} />;
  if (props.id === 'meeting') return <Meeting {...props} />;
  if (props.id === 'fog') return <Fog {...props} />;
  if (props.id === 'trip') return <Trip {...props} />;
  if (props.id === 'delay') return <Delay {...props} />;
  if (props.id === 'travel') return <TravelNight {...props} />;
  if (props.id === 'libido') return <Libido {...props} />;
  if (props.id === 'social') return <Social {...props} />;
  if (props.id === 'talk') return <Talk {...props} />;
  return null;
}

export function RehberAlerts({ phase }: { phase: CyclePhase }) {
  const libido = readFlag('flora-guide-libido');
  const fog = readList('flora-guide-fog').filter((item) => item.day >= toLocalISO(new Date()));
  if (!libido && fog.length === 0) return null;
  return (
    <div className="mb-3 space-y-1.5">
      {libido && phase === 'ovulasyon' && (
        <p className="rounded-2xl bg-[#1f1a1c] text-white text-[11px] px-3 py-2">
          Libido ve çekicilik penceresi açık. Bugün zirve günü.
        </p>
      )}
      {fog.slice(0, 2).map((item) => (
        <p key={item.day} className="rounded-2xl bg-amber-50 border border-amber-200 text-[11px] px-3 py-2">
          Yoğun iş hatırlatması: {formatTrDate(item.day)}
        </p>
      ))}
    </div>
  );
}

function readFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function readList(key: string): { day: string }[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function Mind({ phase, cycleLength, periodLength, lastPeriodDate, onBack }: LifeProps) {
  const days = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 14 }, (_, index) => {
      const date = addDays(today, index);
      const day = cycleDayOn(lastPeriodDate, cycleLength, date);
      const fit = day ? workFit(day, periodLength, cycleLength) : null;
      return { date, day, fit };
    });
  }, [cycleLength, periodLength, lastPeriodDate]);
  const [picked, setPicked] = useState(0);
  const current = days[picked];
  return (
    <Shell title="Zihin takvimi" phase={phase} onBack={onBack}>
      <NeedDate lastPeriodDate={lastPeriodDate} />
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {days.map((item, index) => (
          <button
            key={item.date.toISOString()}
            onClick={() => setPicked(index)}
            className={`shrink-0 w-16 rounded-2xl px-1 py-2 text-center cursor-pointer border ${
              picked === index ? 'bg-[#1f1a1c] text-white border-[#1f1a1c]' : 'bg-white border-sky-100'
            }`}
          >
            <span className="block text-[10px] font-bold">{item.date.getDate()}</span>
            <span className="block text-[9px] mt-0.5">{item.fit?.tag ?? '—'}</span>
          </button>
        ))}
      </div>
      {current?.fit && (
        <div className="rounded-[32px] bg-[#121820] text-white p-6">
          <p className="text-[11px] text-sky-200">{formatTrDate(toLocalISO(current.date))} · döngü {current.day}. gün</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-5xl font-semibold tracking-tight">{current.fit.score}</p>
            <p className="text-sm font-black text-sky-200">{current.fit.tag}</p>
          </div>
          <p className="text-sm leading-relaxed mt-3 text-white/80">{current.fit.note}</p>
        </div>
      )}
    </Shell>
  );
}

function Meeting({ phase, cycleLength, periodLength, lastPeriodDate, onBack }: LifeProps) {
  const [date, setDate] = useState(toLocalISO(addDays(new Date(), 1)));
  const picked = parseLocalISO(date);
  const day = picked ? cycleDayOn(lastPeriodDate, cycleLength, picked) : null;
  const fit = day ? workFit(day, periodLength, cycleLength) : null;
  const better = useMemo(() => {
    if (!lastPeriodDate) return [];
    const today = startOfDay(new Date());
    const found: { iso: string; tag: string }[] = [];
    for (let index = 1; index <= 28 && found.length < 3; index += 1) {
      const next = addDays(today, index);
      const cycleDay = cycleDayOn(lastPeriodDate, cycleLength, next);
      if (!cycleDay) continue;
      const score = workFit(cycleDay, periodLength, cycleLength);
      if (score.score >= 88) found.push({ iso: toLocalISO(next), tag: score.tag });
    }
    return found;
  }, [cycleLength, lastPeriodDate, periodLength]);
  return (
    <Shell title="Toplantı danışmanı" phase={phase} onBack={onBack}>
      <NeedDate lastPeriodDate={lastPeriodDate} />
      <Card>
        <label className="text-xs font-black block">Toplantı veya mülakat günü</label>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-pink-200 px-3 py-2 text-xs" />
        {fit ? (
          <div className="rounded-2xl bg-[#102033] text-white p-4">
            <p className="text-3xl font-black">{fit.score}</p>
            <p className="text-sm font-black text-sky-200">{fit.tag}</p>
            <p className="text-xs leading-relaxed mt-2 text-white/80">{fit.note}</p>
          </div>
        ) : (
          <p className="text-xs text-[#805062]">Tarih, kayıtlı başlangıçtan sonra olmalı.</p>
        )}
      </Card>
      <Card>
        <p className="text-xs font-black">Daha uygun günler</p>
        {better.length === 0 ? (
          <p className="text-xs text-[#805062]">Önümüzdeki ay içinde sunum veya analiz günü çıkmadı.</p>
        ) : (
          better.map((item) => (
            <button key={item.iso} onClick={() => setDate(item.iso)} className="w-full text-left text-xs py-1 cursor-pointer">
              {formatTrDate(item.iso)} · {item.tag}
            </button>
          ))
        )}
      </Card>
    </Shell>
  );
}

function Fog({ phase, cycleDay, cycleLength, onBack }: LifeProps) {
  const foggy = phase === 'pms' || phase === 'regl' || cycleDay >= cycleLength - 5;
  const [items, setItems] = useState(() => readList('flora-guide-fog'));
  const [day, setDay] = useState(toLocalISO(addDays(new Date(), 1)));
  const save = (next: { day: string }[]) => {
    setItems(next);
    try {
      localStorage.setItem('flora-guide-fog', JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };
  return (
    <Shell title="Beyin sisi" phase={phase} onBack={onBack}>
      <div className={`rounded-[28px] p-5 text-white ${foggy ? 'bg-gradient-to-br from-slate-800 to-indigo-700' : 'bg-gradient-to-br from-emerald-700 to-teal-500'}`}>
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">{foggy ? 'Erken uyarı' : 'Bugün net'}</p>
        <p className="text-2xl font-black mt-1">{foggy ? 'Yoğun işi kaydır' : 'Odak açık'}</p>
        <p className="text-sm leading-relaxed mt-2 text-white/80">
          {foggy
            ? 'Bu fazda odak dağılabilir. Yeni sözleşme, uzun sunum ve gece mesaisini kaydır.'
            : 'Yoğun iş için engel görünmüyor. Yine de öğleden sonra tek bir derin iş seç.'}
        </p>
      </div>
      <Card>
        <label className="text-xs font-black block">Yoğun işi şu güne ertele</label>
        <input type="date" value={day} onChange={(event) => setDay(event.target.value)} className="w-full rounded-xl border border-pink-200 px-3 py-2 text-xs" />
        <button
          onClick={() => {
            if (!day || items.some((item) => item.day === day)) return;
            soundEngine.playDropletSound();
            save([...items, { day }].sort((a, b) => a.day.localeCompare(b.day)));
          }}
          className="px-3 py-1.5 rounded-full bg-[#b0004a] text-white text-[11px] font-bold cursor-pointer"
        >
          Hatırlatmayı kaydet
        </button>
        {items.map((item) => (
          <div key={item.day} className="flex items-center justify-between text-xs">
            <span>{formatTrDate(item.day)}</span>
            <button onClick={() => save(items.filter((row) => row.day !== item.day))} className="text-[#b0004a] cursor-pointer">Sil</button>
          </div>
        ))}
      </Card>
    </Shell>
  );
}

function Trip({ phase, cycleLength, periodLength, lastPeriodDate, onBack }: LifeProps) {
  const [from, setFrom] = useState(toLocalISO(addDays(new Date(), 14)));
  const [days, setDays] = useState(5);
  const stay = Math.max(1, Math.min(60, Number.isFinite(days) ? days : 1));
  const overlaps = useMemo(() => {
    const start = parseLocalISO(from);
    if (!start || !lastPeriodDate) return [];
    const end = addDays(start, stay - 1);
    return periodStarts(lastPeriodDate, cycleLength).flatMap((bleed) => {
      const bleedEnd = addDays(bleed, Math.max(0, periodLength - 1));
      if (startOfDay(end) < bleed || bleedEnd < startOfDay(start)) return [];
      const fromDay = bleed > startOfDay(start) ? bleed : startOfDay(start);
      const toDay = bleedEnd < startOfDay(end) ? bleedEnd : startOfDay(end);
      return [`${formatTrDate(toLocalISO(fromDay))} – ${formatTrDate(toLocalISO(toDay))}`];
    });
  }, [from, stay, lastPeriodDate, cycleLength, periodLength]);
  const start = parseLocalISO(from);
  const dayAtStart = start ? cycleDayOn(lastPeriodDate, cycleLength, start) : null;
  const phaseAtStart = dayAtStart ? phaseForCycleDay(dayAtStart, periodLength, cycleLength) : phase;
  const mood =
    phaseAtStart === 'folikuler' || phaseAtStart === 'ovulasyon'
      ? 'Yüksek enerjili, hafif ve keyifli bir tatil dönemi sizi bekliyor!'
      : phaseAtStart === 'luteal'
        ? 'Tempo biraz düşer. Planı sıkı tutma, akşamları boş bırak.'
        : 'Dinlenme ağırlıklı bir tatil daha iyi gelir. Çantaya yedek ped koy.';
  return (
    <Shell title="Tatil çakışması" phase={phase} onBack={onBack}>
      <NeedDate lastPeriodDate={lastPeriodDate} />
      <Card>
        <p className="text-sm font-black flex items-center gap-2">
          <span>🧳</span> Tatil & Regl Çakışma Hesaplayıcı
        </p>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[11px] font-semibold text-[#6d5a60]">Tatil Başlangıç Tarihi</span>
            <input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-pink-100 bg-[#fff8f8] px-3 py-3 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-semibold text-[#6d5a60]">Tatil Süresi (Gün)</span>
            <input
              type="number"
              min={1}
              max={60}
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
              className="mt-1 w-full rounded-2xl border border-pink-100 bg-[#fff8f8] px-3 py-3 text-sm"
            />
          </label>
        </div>
        <div className={`rounded-2xl p-4 ${overlaps.length ? 'bg-rose-50' : 'bg-[#e9f8ef]'}`}>
          <p className={`text-sm font-black ${overlaps.length ? 'text-rose-700' : 'text-emerald-800'}`}>
            {overlaps.length ? 'Dikkat: Regl çakışması görünüyor' : 'Harika: Regl Çakışması Görünmüyor'}
          </p>
          <p className="text-xs leading-relaxed mt-2 text-[#3f4a3c]">
            {dayAtStart
              ? `Tatil başlangıcında tahmini döngü gününüz: Gün ${dayAtStart}. ${mood}`
              : 'Başlangıç kaydı yoksa gün hesaplanamaz.'}
            {overlaps.length ? ` Çakışan günler: ${overlaps.join(' · ')}` : ''}
          </p>
        </div>
      </Card>
    </Shell>
  );
}

function Delay({ phase, cycleLength, periodLength, lastPeriodDate, onBack }: LifeProps) {
  const [event, setEvent] = useState(toLocalISO(addDays(new Date(), 20)));
  const eventDate = parseLocalISO(event);
  const nearest = eventDate
    ? periodStarts(lastPeriodDate, cycleLength).find((bleed) => addDays(bleed, periodLength) >= startOfDay(eventDate))
    : undefined;
  let gap = '';
  if (nearest && eventDate) {
    const bleedEnd = addDays(nearest, Math.max(0, periodLength - 1));
    if (startOfDay(eventDate) >= nearest && startOfDay(eventDate) <= bleedEnd) {
      const shift = toLocalISO(addDays(bleedEnd, 1));
      gap = `Etkinlik kanama aralığına denk geliyor. En yakın boş gün ${formatTrDate(shift)}.`;
    } else {
      const days = Math.round((nearest.getTime() - startOfDay(eventDate).getTime()) / 86400000);
      gap = days > 0 ? `Sonraki kanama ${days} gün sonra. Etkinlik şimdilik dışında.` : 'Etkinlik, tahmin edilen aralığın dışında.';
    }
  }
  return (
    <Shell title="Tarih kaydırma" phase={phase} onBack={onBack}>
      <div className="rounded-[28px] bg-[#3a2414] text-white p-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-amber-200">Hesap, vaat değil</p>
        <p className="text-sm leading-relaxed mt-2">İlaçsız 2-3 gün ötelemek güvenilir değildir. İlaçla kaydırma yalnızca hekimle konuşulur.</p>
      </div>
      <NeedDate lastPeriodDate={lastPeriodDate} />
      <Card>
        <label className="text-xs font-black block">Özel gün</label>
        <input type="date" value={event} onChange={(eventTarget) => setEvent(eventTarget.target.value)} className="w-full rounded-xl border border-pink-200 px-3 py-2 text-xs" />
        <p className="text-sm font-black leading-relaxed">{gap || 'Tarih seç.'}</p>
      </Card>
    </Shell>
  );
}

function TravelNight({ phase, cycleLength, periodLength, lastPeriodDate, onBack }: LifeProps) {
  const [mode, setMode] = useState<'ucus' | 'gece'>('ucus');
  const [when, setWhen] = useState(toLocalISO(addDays(new Date(), 10)));
  const [shift, setShift] = useState(3);
  const picked = parseLocalISO(when);
  const day = picked ? cycleDayOn(lastPeriodDate, cycleLength, picked) : null;
  const thatPhase = day ? phaseForCycleDay(day, periodLength, cycleLength) : null;
  const daysLeft = picked ? Math.round((startOfDay(picked).getTime() - startOfDay(new Date()).getTime()) / 86400000) : 0;
  const bloat = thatPhase === 'luteal' || thatPhase === 'pms';
  return (
    <Shell title="Uçuş ve özel gece" phase={phase} onBack={onBack}>
      <div className="flex gap-2">
        {(['ucus', 'gece'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${mode === key ? 'bg-[#b0004a] text-white' : 'bg-white border border-pink-100'}`}
          >
            {key === 'ucus' ? 'Uçuş' : 'Özel gece'}
          </button>
        ))}
      </div>
      <Card>
        <input type="date" value={when} onChange={(event) => setWhen(event.target.value)} className="w-full rounded-xl border border-pink-200 px-3 py-2 text-xs" />
        {mode === 'ucus' ? (
          <>
            <label className="flex items-center justify-between text-xs">
              Saat farkı
              <input type="number" min={0} max={14} value={shift} onChange={(event) => setShift(Number(event.target.value) || 0)} className="w-16 rounded-lg border border-pink-200 px-2 py-1 text-right" />
            </label>
            {[
              ['Yatış', `Uçuştan ${Math.max(1, Math.round(shift / 2))} gece önce uykuyu ${Math.max(1, Math.round(shift / 2))} saat kaydır.`],
              ['Kabin', 'Her saat su. Alkol ve yeni kahve yok.'],
              ['İniş', 'Gün ışığına çık. İlk gece oda karanlık olsun.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-sky-50 px-3 py-2">
                <p className="text-[11px] font-black text-sky-800">{title}</p>
                <p className="text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className={`rounded-2xl p-3 text-white ${bloat ? 'bg-rose-700' : 'bg-emerald-700'}`}>
              <p className="text-sm font-black">{daysLeft >= 0 ? `${daysLeft} gün kaldı` : 'Tarih geçti'}</p>
              <p className="text-xs mt-1 text-white/80">{thatPhase ? (bloat ? 'Şişlik riski var. Erken ye, yürüyüş ekle.' : 'Cilt daha sakin olabilir. Yeni ürün deneme.') : 'Başlangıç kaydı yok.'}</p>
            </div>
            <p className="text-xs leading-relaxed">{daysLeft > 5 ? 'Tuzu azalt. Akşam yemeği hafif olsun.' : 'Yeni asit ve peeling yok. Bildiğin nem yeter.'}</p>
          </>
        )}
      </Card>
    </Shell>
  );
}

function Libido({ phase, cycleLength, periodLength, lastPeriodDate, onBack }: LifeProps) {
  const [on, setOn] = useState(() => readFlag('flora-guide-libido'));
  const peak = Math.max(periodLength + 1, cycleLength - 14);
  const windowDays = [peak - 1, peak, peak + 1].filter((value) => value >= 1 && value <= cycleLength);
  const today = startOfDay(new Date());
  const day = cycleDayOn(lastPeriodDate, cycleLength, today);
  const inside = day != null && windowDays.includes(day);
  const until = day == null || inside ? 0 : (windowDays[0] - day + cycleLength) % cycleLength;
  const when = day == null ? null : addDays(today, inside ? 0 : until);
  return (
    <Shell title="Libido penceresi" phase={phase} onBack={onBack}>
      <div className="rounded-[28px] bg-white border border-pink-100 p-5 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b0004a]">
          {day == null ? 'Kayıt yok' : inside ? 'Pencerenin içindesin' : 'Sonraki pencere'}
        </p>
        <p className="text-4xl font-black mt-2 tracking-tight">
          {day == null ? '—' : inside ? 'Bugün' : `${until} gün`}
        </p>
        <p className="text-sm text-[#5a4044] mt-2 leading-relaxed">
          {when ? formatTrDate(toLocalISO(when)) : 'Başlangıç tarihi yok, pencere hesaplanamaz.'}
          {' '}Bu aralık döngüdeki doğurgan pencereyle aynıdır. İstek ölçümü değildir.
        </p>
        <div className="flex gap-2 mt-4">
          {windowDays.map((value) => (
            <div key={value} className={`flex-1 rounded-2xl px-2 py-3 text-center ${value === day ? 'bg-[#b0004a] text-white' : value === peak ? 'bg-rose-50 text-[#b0004a]' : 'bg-[#fff8f8] text-[#1f1a1c]'}`}>
              <p className="text-[10px] font-bold">{value === peak ? 'Zirve' : 'Yan'}</p>
              <p className="text-lg font-black">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          const nextOn = !on;
          setOn(nextOn);
          try {
            localStorage.setItem('flora-guide-libido', nextOn ? '1' : '0');
          } catch {
            /* ignore */
          }
          soundEngine.playDropletSound();
        }}
        className={`w-full rounded-[26px] px-4 py-4 text-left cursor-pointer border ${on ? 'bg-[#1f1a1c] text-white border-[#1f1a1c]' : 'bg-white border-pink-100'}`}
      >
        <p className="text-sm font-black">{on ? 'Zirve notu açık' : 'Zirve notu kapalı'}</p>
        <p className="text-[11px] mt-1 opacity-70">Rehber açıkken kısa bir satır. Ana bildirim yok.</p>
      </button>
    </Shell>
  );
}

function socialScore(phase: CyclePhase) {
  if (phase === 'ovulasyon') return 88;
  if (phase === 'folikuler') return 74;
  if (phase === 'luteal') return 48;
  if (phase === 'pms') return 30;
  return 36;
}

function socialText(score: number) {
  if (score >= 75) return 'Pil dolu. İnsan görmek iyi gelir. Süreyi iki saatle sınırla, gece düşer.';
  if (score >= 50) return 'Yarım pil. Bir kişi, bildiğin yer, erken dönüş. Kalabalık ikinci plana.';
  return 'Pil düşük. Ev, kısa mesaj, erken yatış. Zorunlu çıkış varsa tek saat ve sessiz dönüş.';
}

function Social({ phase, cycleDay, cycleLength, periodLength, onBack }: LifeProps) {
  const score = socialScore(phase);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setShown(score));
    return () => window.cancelAnimationFrame(frame);
  }, [score]);
  const today = toLocalISO(new Date());
  const [plan, setPlan] = useState(() => {
    try {
      return localStorage.getItem(`flora-guide-social-${today}`) || '';
    } catch {
      return '';
    }
  });
  const choose = (value: string) => {
    setPlan(value);
    try {
      localStorage.setItem(`flora-guide-social-${today}`, value);
    } catch {
      /* ignore */
    }
  };
  const forecast = Array.from({ length: 6 }, (_, index) => {
    const day = ((cycleDay - 1 + index) % cycleLength) + 1;
    const nextPhase = phaseForCycleDay(day, periodLength, cycleLength);
    const value = socialScore(nextPhase);
    const date = new Date();
    date.setDate(date.getDate() + index);
    return { label: index === 0 ? 'Bugün' : `${date.getDate()}`, value, phase: nextPhase };
  });
  return (
    <Shell title="Sosyal pil" phase={phase} onBack={onBack}>
      <style>{`@keyframes flora-battery { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-8px); } }`}</style>
      <Card>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-36 rounded-[22px] border-2 border-fuchsia-200 bg-fuchsia-50 overflow-hidden">
            <div
              className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#b0004a] via-rose-400 to-fuchsia-200"
              style={{ height: `${shown}%`, transition: 'height 1s ease', animation: 'flora-battery 2.6s ease-in-out infinite' }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-[#1f1a1c]">{score}</span>
          </div>
          <div>
            <p className="text-xs font-black">Bugünkü pil</p>
            <p className="text-xs leading-relaxed mt-1">{socialText(score)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {['Dışarı', 'Evde'].map((item) => (
            <button
              key={item}
              onClick={() => choose(item)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${plan === item ? 'bg-[#b0004a] text-white' : 'bg-pink-50'}`}
            >
              {item}
            </button>
          ))}
        </div>
        {plan && <p className="text-[11px] text-[#805062]">Bugünkü seçim kaydedildi: {plan}.</p>}
      </Card>
      <Card>
        <p className="text-xs font-black">Altı günlük tahmin</p>
        <p className="text-[11px] text-[#805062]">Pil, döngü gününe göre iner ve çıkar. Bu bir duygu ölçümü değil, faz tahmini.</p>
        <div className="flex items-end justify-between gap-1 h-28">
          {forecast.map((day) => (
            <div key={day.label + day.value} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[9px] font-bold text-[#b0004a]">{day.value}</span>
              <div className="w-full rounded-full bg-pink-50 overflow-hidden" style={{ height: '72px' }}>
                <div className="w-full bg-gradient-to-t from-[#b0004a] to-fuchsia-300 rounded-full" style={{ height: `${day.value}%`, marginTop: `${100 - day.value}%` }} />
              </div>
              <span className="text-[9px] text-[#805062]">{day.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs leading-relaxed">
          {forecast[1]
            ? `Yarın pil ${forecast[1].value}. ${forecast[1].value >= score ? 'Biraz daha dışarı uygun.' : 'Yarına daha sakin bir plan bırak.'}`
            : ''}
        </p>
      </Card>
    </Shell>
  );
}

function Talk({ phase, onBack }: LifeProps) {
  const tactics: Record<CyclePhase, string> = {
    regl: 'Kısa yaz. Yeni tartışma açma. "Bunu yarın konuşalım" yeterli.',
    folikuler: 'Net ve sıcak ol. Plan teklif etmek kolay gelir.',
    ovulasyon: 'Göz teması ve kısa cümle yeter. Fazla açıklama çekiciliği düşürür.',
    luteal: 'Niyetini bir cümlede söyle. İma bırakma.',
    pms: 'Göndermeden önce ye, uyu, on dakika bekle.',
  };
  const [draft, setDraft] = useState('');
  const [soft, setSoft] = useState('');
  const [checks, setChecks] = useState({ food: false, sleep: false, wait: false });
  const tense = phase === 'pms' || phase === 'regl';
  const ready = !tense || (checks.food && checks.sleep && checks.wait);
  return (
    <Shell title="İletişim" phase={phase} onBack={onBack}>
      <div className="rounded-[28px] bg-gradient-to-br from-violet-800 to-fuchsia-600 text-white p-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Bu faz</p>
        <p className="text-lg font-black mt-1 leading-snug">{tactics[phase]}</p>
      </div>
      <Card>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Göndermeden önce yaz" className="w-full min-h-24 rounded-2xl border border-pink-200 p-3 text-sm" />
        {tense && (
          <div className="flex flex-wrap gap-1.5">
            {[
              ['food', 'Yedim'],
              ['sleep', 'Uykum yerinde'],
              ['wait', 'On dakika'],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setChecks((prev) => ({ ...prev, [key]: !prev[key as 'food'] }))}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${checks[key as 'food'] ? 'bg-violet-700 text-white' : 'bg-violet-50 text-violet-800'}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        <button
          disabled={!ready || !draft.trim()}
          onClick={() => {
            const cleaned = draft.replace(/!+/g, '.').replace(/\b(asla|her zaman)\b/gi, 'bu kez');
            setSoft(tense ? `Bunu sakin söylemek istiyorum. ${cleaned}` : cleaned);
            soundEngine.playDropletSound();
          }}
          className="px-4 py-2 rounded-full bg-[#1f1a1c] text-white text-xs font-bold cursor-pointer disabled:opacity-40"
        >
          {ready ? 'Yumuşat' : 'Önce üç işareti seç'}
        </button>
        {soft && <p className="text-sm leading-relaxed bg-violet-50 rounded-2xl p-3">{soft}</p>}
      </Card>
    </Shell>
  );
}
