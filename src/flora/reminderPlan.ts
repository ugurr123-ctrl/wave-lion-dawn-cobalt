import type { SupplementItem, UserProfile } from './types';

export type ReminderPreferences = Pick<UserProfile, 'quietHoursStart' | 'quietHoursEnd' | 'reminderIntervalMin'>;
export const defaultReminderPreferences: ReminderPreferences = {
  quietHoursStart: '23:00', quietHoursEnd: '07:30', reminderIntervalMin: 90,
};
function minutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match || +match[1] > 23 || +match[2] > 59) return null;
  return +match[1] * 60 + +match[2];
}
export function buildReminderPlan(supplements: SupplementItem[], preferences = defaultReminderPreferences) {
  const start = minutes(preferences.quietHoursStart) ?? 1380;
  const end = minutes(preferences.quietHoursEnd) ?? 450;
  const quiet = (time: number) => start === end ? false : start < end
    ? time >= start && time < end : time >= start || time < end;
  const daily = (id: number, time: number, body: string) => ({
    id, title: 'Floria', body, channelId: 'floria',
    schedule: { on: { hour: Math.floor(time / 60), minute: time % 60, second: 0 }, repeats: true, allowWhileIdle: true },
  });
  const notes = [
    [901, 540, 'Günaydın 🌸 Bugün kendine nazik davran. Günlük kaydın için küçük bir mola verebilirsin.'],
    [903, 840, 'Küçük bir nefes molası 🌷 Omuzlarını bırak; her şeyi bugün bitirmek zorunda değilsin.'],
    [904, 1230, 'Akşam sana kalsın 🌙 Ekrana kısa bir ara ver, kendine sakin bir an ayır.'],
  ] as const;
  const notifications = notes.filter(([, time]) => !quiet(time)).map(([id, time, body]) => daily(id, time, body));
  // Bounded daily calendar triggers keep working when the app is closed and stay below iOS's 64 pending limit.
  const interval = Number.isFinite(preferences.reminderIntervalMin) ? Math.max(90, preferences.reminderIntervalMin) : 90;
  for (let time = 540, index = 0; time <= 1260; time += interval, index++) {
    if (!quiet(time)) notifications.push(daily(1200 + index, time, 'Bir yudum su 💧 Bardağını yanına al; küçük bir su molası iyi gelebilir.'));
  }
  supplements.forEach((item, index) => {
    const time = minutes(item.time);
    if (item.reminderEnabled && time !== null) notifications.push(daily(2000 + index, time, 'Takviye hatırlatıcın var.'));
  });
  if (notifications.length > 60) throw new Error('Too many reminders for the device notification limit');
  return notifications;
}
