import React, { useEffect, useState } from 'react';
import { hideAdMobBanner, showAdMobBanner } from '../admob';
import { isPremiumActive } from '../premium';

export function AdBanner({ premium, onRemove }: { premium: boolean; onRemove: () => void }) {
  const [hidden, setHidden] = useState(premium || isPremiumActive());
  const [native, setNative] = useState(false);

  useEffect(() => {
    setHidden(premium || isPremiumActive());
  }, [premium]);

  useEffect(() => {
    const sync = () => setHidden(isPremiumActive());
    window.addEventListener('flora-premium', sync);
    return () => window.removeEventListener('flora-premium', sync);
  }, []);

  useEffect(() => {
    if (!import.meta.env.DEV || hidden) {
      void hideAdMobBanner();
      setNative(false);
      return;
    }
    let cancel = false;
    void showAdMobBanner().then((ok) => {
      if (cancel && ok) void hideAdMobBanner();
      if (!cancel) setNative(ok);
    }).catch(() => {
      if (!cancel) setNative(false);
    });
    return () => {
      cancel = true;
      void hideAdMobBanner();
    };
  }, [hidden]);

  if (!import.meta.env.DEV || hidden || native) return null;

  return (
    <div className="pointer-events-auto mb-2 rounded-2xl border border-[#f0e6e8] bg-white px-3 py-2 shadow-sm flex items-center gap-2">
      <span className="shrink-0 rounded-md bg-[#f6ebed] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#9a8088]">ADMOB</span>
      <p className="min-w-0 flex-1 text-[11px] leading-snug text-[#5c4a50]">
        Test reklam birimi bağlı. Bu tarayıcıda dolmaz. Android uygulamasında aynı birim açılır. Döngü bilgisi gitmez.
      </p>
      <button type="button" onClick={onRemove} className="shrink-0 text-[11px] font-semibold text-[#b0004a] cursor-pointer">
        Kaldır
      </button>
    </div>
  );
}
