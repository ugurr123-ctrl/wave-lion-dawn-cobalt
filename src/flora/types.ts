export const PARTNER_ENABLED = false;

export type TabType = 'bugun' | 'dongu' | 'rehber' | 'raporlar' | 'profil' | 'partner';

export type CyclePhase = 'regl' | 'folikuler' | 'ovulasyon' | 'luteal' | 'pms';

export interface DayInfo {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  dayName: string;
  cycleDay: number;
  phase: CyclePhase;
  isToday: boolean;
  bbt?: number;
  heartRate?: number;
  libido?: 'Düşük' | 'Normal' | 'Yüksek';
  symptoms?: string[];
  mood?: string;
  flow?: 'Yok' | 'Hafif' | 'Normal' | 'Yoğun';
  clots?: 'Yok' | 'Az' | 'Belirgin';
  crampWhere?: 'Yok' | 'Karın' | 'Bel' | 'Kasık' | 'Bacak';
  discharge?: 'Yok' | 'Az' | 'Krem' | 'Yumurta akı';
  dischargeColor?: 'Yok' | 'Şeffaf' | 'Beyaz' | 'Sarı' | 'Kahverengi' | 'Pembe';
  intimacy?: 'Yok' | 'Korunarak' | 'Korunmasız';
  sleep?: 'İyi' | 'Bölündü' | 'Az';
  pain?: 'Yok' | 'Hafif' | 'Orta' | 'Şiddetli';
  note?: string;
}

export interface SupplementItem {
  id: string;
  name: string;
  dose: string;
  time: string;
  taken: boolean;
  reminderEnabled: boolean;
}

export interface ReminderSetting {
  id: string;
  title: string;
  desc: string;
  time: string;
  enabled: boolean;
  icon: string;
  category: 'water' | 'supplement' | 'cycle' | 'sleep' | 'pms' | 'follicular';
}

export interface MoodAdvice {
  title: string;
  subtitle: string;
  tag: string;
  colorTheme: string;
  soothingTechnique: string;
  herbalDrink: string;
  nutritionTip: string;
  affirmation: string;
  isHighAlert?: boolean;
}

export interface ConceptionInfo {
  percentage: number;
  label: string;
  status: 'Zirve' | 'Çok Yüksek' | 'Yüksek' | 'Orta' | 'Düşük' | 'Çok Düşük';
  tagColor: string;
  explanation: string;
  daysToPeak: number;
}

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  age?: number;
  location?: string;
  cycleLength: number; // e.g. 28
  periodLength: number; // e.g. 5
  lastPeriodDate: string; // YYYY-MM-DD
  goal: string;
  waterGoalMl: number; // e.g. 2500
  waterCurrentMl: number;
  autoResetAtMidnight: boolean;
  waterDate?: string;
  quietHoursStart: string; // e.g. 23:00
  quietHoursEnd: string; // e.g. 07:30
  reminderIntervalMin: number; // e.g. 90
  vibrationActive: boolean;
  faceIdActive: boolean;
  anonymousMode: boolean;
  appleHealthConnected?: boolean;
  ouraConnected?: boolean;
  intensity?: string;
  contraception?: string;
  habits?: string[];
  partnerMode?: boolean;
  partnerName?: string;
  partnerCode?: string;
  partnerShare?: PartnerShare;
}

export type PartnerShareKey = 'phase' | 'mood' | 'flow' | 'pain' | 'symptoms' | 'intimacy' | 'note';

export type PartnerShare = Record<PartnerShareKey, boolean>;

export const defaultPartnerShare = (): PartnerShare => ({
  phase: true,
  mood: true,
  flow: false,
  pain: false,
  symptoms: false,
  intimacy: false,
  note: false,
});

export interface CycleRecord {
  start: string;
  cycleLength: number;
  periodLength: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'water';
}
