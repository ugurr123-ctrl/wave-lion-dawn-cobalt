export type PremiumPlanId = 'week' | 'month' | 'year';

export type PremiumReceipt = {
  plan: PremiumPlanId;
  price: number;
  until: string;
};

export const PREMIUM_PLANS: { id: PremiumPlanId; name: string; price: number; days: number; note: string }[] = [
  { id: 'week', name: 'Haftalık', price: 50, days: 7, note: '7 gün' },
  { id: 'month', name: 'Aylık', price: 99, days: 30, note: '30 gün' },
  { id: 'year', name: 'Yıllık', price: 499, days: 365, note: 'En seçilen' },
];

export const PREMIUM_INCLUDES = [
  { title: 'Rehber', text: 'Beslenme, egzersiz, ses, nefes, cilt, iş, seyahat ve sosyal. Altı başlık, on sekiz ekran.' },
  { title: 'PDF özet', text: 'Döngü ve belirti kayıtlarından indirilen kişisel özet.' },
  { title: 'Reklamsız', text: 'Premium açıkken alt şeritteki reklam kalkar.' },
];

export const FREE_LINE = 'Bugün, döngü takvimi, su, belirti ve rapor rakamları ücretsiz kalır.';

export function formatUntil(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return new Date(year, month - 1, day).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

const KEY = 'flora-store-receipt';

function todayISO(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function readReceipt(): PremiumReceipt | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PremiumReceipt;
    if (!parsed?.until || !parsed.plan) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isPremiumActive(now = new Date()): boolean {
  const receipt = readReceipt();
  return Boolean(receipt && receipt.until >= todayISO(now));
}

export function planName(id: PremiumPlanId): string {
  return PREMIUM_PLANS.find((plan) => plan.id === id)?.name ?? 'Premium';
}

export function purchasePlan(id: PremiumPlanId): PremiumReceipt {
  const plan = PREMIUM_PLANS.find((item) => item.id === id) ?? PREMIUM_PLANS[1];
  const until = new Date();
  until.setDate(until.getDate() + plan.days);
  const receipt: PremiumReceipt = { plan: plan.id, price: plan.price, until: todayISO(until) };
  localStorage.setItem(KEY, JSON.stringify(receipt));
  window.dispatchEvent(new Event('flora-premium'));
  return receipt;
}

export function restorePlan(): PremiumReceipt | null {
  const receipt = readReceipt();
  if (!receipt) return null;
  if (receipt.until < todayISO()) return null;
  window.dispatchEvent(new Event('flora-premium'));
  return receipt;
}
