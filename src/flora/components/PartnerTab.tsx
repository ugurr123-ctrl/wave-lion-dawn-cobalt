import React, { useState } from 'react';
import { DayInfo, UserProfile, CyclePhase, defaultPartnerShare } from '../types';

const CARE: Record<CyclePhase, string> = {
  regl: 'Bugün bedeni yavaş olabilir. Sıcak bir şey ve kısa bir yürüyüş yeter.',
  folikuler: 'Enerjisi toparlanıyor. Hafif bir plan iyi gelebilir.',
  ovulasyon: 'Tahmini doğurgan pencere. Bu bir test değildir.',
  luteal: 'Tempo düşebilir. Akşamı sade tutmak iyi gelir.',
  pms: 'Daha hassas olabilir. Sert konuşmayı ertelemek iyi gelir.',
};

const PHASE_NAME: Record<CyclePhase, string> = {
  regl: 'Kanama',
  folikuler: 'Foliküler faz',
  ovulasyon: 'Doğurgan pencere',
  luteal: 'Luteal faz',
  pms: 'Adet öncesi',
};

function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function PartnerTab({
  profile,
  phase,
  cycleDay,
  days,
}: {
  profile: UserProfile;
  phase: CyclePhase;
  cycleDay: number;
  days: DayInfo[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onLogToday: () => void;
}) {
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);
  const [wrong, setWrong] = useState(false);
  const share = { ...defaultPartnerShare(), ...profile.partnerShare };
  const today = days.find((day) => day.date === todayISO());
  const name = profile.partnerName?.trim() || 'Partner';

  const tryOpen = () => {
    if (!profile.partnerCode) {
      setWrong(true);
      setOpen(false);
      return;
    }
    if (code === profile.partnerCode) {
      setOpen(true);
      setWrong(false);
      return;
    }
    setWrong(true);
    setOpen(false);
  };

  if (!open) {
    return (
      <div className="space-y-4 pb-28 pt-2">
        <div className="rounded-[28px] bg-white border border-pink-100 p-5">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#b0004a]">PARTNER</p>
          <h2 className="text-2xl font-semibold mt-1">6 haneli kod</h2>
          <p className="text-sm text-[#805062] mt-2 leading-relaxed">
            Kod doğruysa yalnız izin verilenler görünür. Belirti, not ve ilişki kapalıysa burada yoktur.
          </p>
          <input
            value={code}
            onChange={(event) => {
              setWrong(false);
              setCode(event.target.value.replace(/\D/g, '').slice(0, 6));
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && code.length === 6) tryOpen();
            }}
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            className="mt-4 w-full rounded-2xl border border-pink-100 px-3 py-3 text-center text-2xl tracking-[0.4em] outline-none"
          />
          {wrong && <p className="mt-2 text-xs text-[#b0004a]">{profile.partnerCode ? 'Kod eşleşmedi. Doğru kod Profil’de.' : 'Kod henüz yok. Profil’den aç.'}</p>}
          <button
            type="button"
            onClick={tryOpen}
            disabled={code.length !== 6}
            className="mt-4 w-full rounded-full bg-[#1f1a1c] text-white py-3 text-sm font-semibold cursor-pointer disabled:opacity-40"
          >
            Bak
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28 pt-2">
      <div className="rounded-[28px] bg-white border border-pink-100 p-5">
        <p className="text-[11px] font-bold tracking-[0.16em] text-[#b0004a]">{name}</p>
        <h2 className="text-2xl font-semibold mt-1">Bugün</h2>
        <p className="text-[11px] text-[#805062] mt-1">Yalnızca açık bırakılan bilgiler.</p>
        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          {!share.phase && !share.mood && !share.flow && !share.pain && !share.symptoms && !share.intimacy && !share.note && (
            <p>Bugün için açık bilgi yok. Hepsi gizli.</p>
          )}
          {share.phase && (
            <p><span className="font-semibold">{PHASE_NAME[phase]}</span> · {cycleDay}. gün. {CARE[phase]}</p>
          )}
          {share.mood && <p>Ruh hali: {today?.mood || 'bugün yazılmadı'}</p>}
          {share.flow && (
            <p>Kanama: {today?.flow || 'bugün yazılmadı'}{today?.clots && today.clots !== 'Yok' ? `, pıhtı ${today.clots}` : ''}</p>
          )}
          {share.pain && (
            <p>Ağrı: {today?.pain || 'bugün yazılmadı'}{today?.crampWhere && today.crampWhere !== 'Yok' ? `, yer ${today.crampWhere}` : ''}</p>
          )}
          {share.symptoms && (
            <p>Belirtiler: {today?.symptoms?.length ? today.symptoms.join(', ') : 'bugün yazılmadı'}</p>
          )}
          {share.intimacy && <p>İlişki: {today?.intimacy && today.intimacy !== 'Yok' ? today.intimacy : 'paylaşılmadı ya da yok'}</p>}
          {share.note && <p>Not: {today?.note || 'bugün yazılmadı'}</p>}
        </div>
      </div>
      <button type="button" onClick={() => { setOpen(false); setCode(''); }} className="w-full text-xs font-semibold text-[#805062] cursor-pointer">
        Kodu kapat
      </button>
    </div>
  );
}
