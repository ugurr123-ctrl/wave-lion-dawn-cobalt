// Google'ın resmi test birimleri. Yayında kendi ca-app-pub kimliğinle değiştir.
// Test kimliğiyle yayına çıkma. Kendi kimliğinde isTesting false kalmalı.
export const ADMOB_APP_ID = 'ca-app-pub-3940256099942544~3347511713';
export const ADMOB_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';

const TEST_PUBLISHER = '3940256099942544';

type AdMobPlugin = {
  initialize: (options: { initializeForTesting?: boolean }) => Promise<void>;
  showBanner: (options: Record<string, unknown>) => Promise<void>;
  removeBanner: () => Promise<void>;
};

type CapacitorBridge = {
  isNativePlatform?: () => boolean;
  Plugins?: { AdMob?: AdMobPlugin };
};

function bridge(): AdMobPlugin | null {
  if (typeof window === 'undefined') return null;
  const cap = (window as unknown as { Capacitor?: CapacitorBridge }).Capacitor;
  if (!cap?.isNativePlatform?.()) return null;
  return cap.Plugins?.AdMob ?? null;
}

let shown = false;

export function admobIsTestUnit(): boolean {
  return ADMOB_BANNER_ID.includes(TEST_PUBLISHER);
}

export async function showAdMobBanner(): Promise<boolean> {
  const admob = bridge();
  if (!admob) return false;
  await admob.initialize({ initializeForTesting: admobIsTestUnit() });
  await admob.showBanner({
    adId: ADMOB_BANNER_ID,
    adSize: 'ADAPTIVE_BANNER',
    position: 'BOTTOM_CENTER',
    margin: 78,
    isTesting: admobIsTestUnit(),
    npa: true,
  });
  shown = true;
  return true;
}

export async function hideAdMobBanner(): Promise<void> {
  if (!shown) return;
  const admob = bridge();
  shown = false;
  if (!admob) return;
  try {
    await admob.removeBanner();
  } catch {
    /* banner already gone */
  }
}
