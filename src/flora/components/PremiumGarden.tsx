import React, { useState } from 'react';
import { FREE_LINE, formatUntil, isPremiumActive, planName, PREMIUM_INCLUDES, PREMIUM_PLANS, purchasePlan, readReceipt, restorePlan } from '../premium';

export function PremiumGarden({
  compact = false,
  showToast,
  onChange,
}: {
  compact?: boolean;
  showToast?: (title: string, message: string, type?: 'success' | 'info' | 'water') => void;
  onChange?: () => void;
}) {
  const [receipt, setReceipt] = useState(readReceipt);
  const [note, setNote] = useState('');
  const active = isPremiumActive();

  const buy = (id: (typeof PREMIUM_PLANS)[number]['id']) => {
    const next = purchasePlan(id);
    setReceipt(next);
    const message = `${planName(id)} açıldı. ${formatUntil(next.until)} tarihine kadar. Yeni plan bugünden sayılır.`;
    setNote(message);
    showToast?.('Premium', message, 'success');
    onChange?.();
  };

  const restore = () => {
    const found = restorePlan();
    setReceipt(readReceipt());
    const message = found
      ? `${planName(found.plan)} geri yüklendi. ${formatUntil(found.until)} tarihine kadar.`
      : 'Bu cihazda geçerli bir satın alma bulunamadı.';
    setNote(message);
    showToast?.(found ? 'Geri yüklendi' : 'Satın alma yok', message, 'info');
    onChange?.();
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#4a1230] via-[#8e2458] to-[#f3b7c9] text-white p-5 shadow-[0_18px_40px_rgba(142,36,88,0.28)]">
      <span className="absolute left-3 top-3 text-lg">🌸</span>
      <span className="absolute right-4 top-6 text-base">🌺</span>
      <span className="absolute left-6 bottom-5 text-base">🌼</span>
      <span className="absolute right-5 bottom-4 text-lg">🌷</span>
      <span className="absolute left-1/2 top-2 -translate-x-1/2 text-xs opacity-80">✿</span>
      <div className="relative flex flex-col items-center text-center pt-4">
        <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-3xl shadow-[0_0_24px_rgba(255,214,140,0.45)]">
          👑
        </div>
        <p className="mt-3 text-[11px] tracking-[0.22em] uppercase text-rose-100">Kraliçe</p>
        <h3 className="text-2xl font-semibold tracking-tight">Floria Premium</h3>
        <p className="mt-2 text-sm text-white/80 max-w-[32ch] leading-relaxed">
          {active && receipt
            ? `${planName(receipt.plan)} açık. ${formatUntil(receipt.until)} tarihine kadar Rehber, PDF ve reklamsız kullanım açık.`
            : 'Kraliçe planı Rehber’i ve PDF özetini açar, reklamı kaldırır. Döngüyü kaydetmek buna bağlı değil.'}
        </p>
        <ul className="mt-4 w-full space-y-2 text-left">
          {PREMIUM_INCLUDES.map((item) => (
            <li key={item.title} className="rounded-2xl bg-white/10 border border-white/20 px-3 py-2">
              <p className="text-xs font-semibold">👑 {item.title}</p>
              <p className="text-[11px] text-white/80 mt-0.5 leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-white/75 leading-relaxed">{FREE_LINE}</p>
      </div>
      <div className={`relative mt-4 grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {PREMIUM_PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => buy(plan.id)}
            className={`rounded-2xl px-3 py-3 text-left cursor-pointer border ${
              plan.id === 'year' ? 'bg-white text-[#4a1230] border-white' : 'bg-white/10 border-white/25'
            }`}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-wide opacity-70">{plan.note}</span>
            <span className="block text-sm font-semibold mt-1">{plan.name}</span>
            <span className="block text-lg font-semibold">{plan.price} TL</span>
          </button>
        ))}
      </div>
      <button type="button" onClick={restore} className="relative mt-3 w-full text-xs font-semibold underline underline-offset-4 cursor-pointer">
        Satın almayı geri yükle
      </button>
      {note && <p className="relative mt-2 text-center text-[11px] text-white/85">{note}</p>}
    </div>
  );
}

export function PremiumRibbon({ active, onOpen }: { active: boolean; onOpen: () => void }) {
  const receipt = readReceipt();
  if (active && receipt) {
    return (
      <button type="button" onClick={onOpen} className="w-full rounded-[24px] bg-[#4a1230] text-white px-4 py-3 text-left cursor-pointer">
        <p className="text-sm font-semibold">👑 Kraliçe açık</p>
        <p className="text-[11px] text-white/75 mt-0.5">{planName(receipt.plan)} · {formatUntil(receipt.until)} tarihine kadar. Rehber ve PDF açık.</p>
      </button>
    );
  }
  return (
    <button type="button" onClick={onOpen} className="w-full rounded-[24px] bg-white border border-[#f3c3d4] px-4 py-3 text-left cursor-pointer">
      <p className="text-sm font-semibold text-[#4a1230]">👑 Kraliçe planı</p>
      <p className="text-[11px] text-[#805062] mt-1 leading-relaxed">Rehber ve PDF özeti bu planda. Haftalık 50 TL, aylık 99 TL, yıllık 499 TL.</p>
      <p className="text-[11px] text-[#805062] mt-1">{FREE_LINE}</p>
    </button>
  );
}
