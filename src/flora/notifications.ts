import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import type { SupplementItem } from './types';
import { buildReminderPlan, defaultReminderPreferences, type ReminderPreferences } from './reminderPlan';

export type NotifyState = 'granted' | 'denied' | 'default' | 'unsupported';

const CHANNEL = 'floria';

function native(): boolean {
  return typeof window !== 'undefined' && Capacitor.isNativePlatform();
}

export async function readNotifyState(): Promise<NotifyState> {
  if (!native()) return 'unsupported';
  const status = await LocalNotifications.checkPermissions();
  if (status.display === 'granted') return 'granted';
  if (status.display === 'denied') return 'denied';
  return 'default';
}

async function ensureChannel() {
  await LocalNotifications.createChannel({
    id: CHANNEL,
    name: 'Floria',
    description: 'Kapalıyken de gelen hatırlatma',
    importance: 4,
    visibility: 1,
  });
}

let reminderSync = Promise.resolve();

export function syncReminders(supplements: SupplementItem[], preferences: ReminderPreferences = storedPreferences()) {
  const next = reminderSync.catch(() => {}).then(() => scheduleReminders(supplements, preferences));
  reminderSync = next;
  return next;
}

async function scheduleReminders(supplements: SupplementItem[], preferences: ReminderPreferences) {
  if (!native()) return;
  const status = await LocalNotifications.checkPermissions();
  if (status.display !== 'granted') return;
  if (Capacitor.getPlatform() === 'android') await ensureChannel();
  const pending = await LocalNotifications.getPending();
  const ours = pending.notifications
    .filter((item) => (item.id >= 901 && item.id <= 920) || (item.id >= 1200 && item.id < 1800) || (item.id >= 2000 && item.id < 100000))
    .map((item) => ({ id: item.id }));
  const notifications = buildReminderPlan(supplements, preferences);
  await LocalNotifications.schedule({ notifications });
  const expected = new Set(notifications.map(({ id }) => id));
  const stale = ours.filter(({ id }) => !expected.has(id) && id !== 902);
  if (stale.length) await LocalNotifications.cancel({ notifications: stale });
  const scheduled = await LocalNotifications.getPending();
  const pendingIds = new Set(scheduled.notifications.map(({ id }) => id));
  if (notifications.some(({ id }) => !pendingIds.has(id))) {
    throw new Error('Floria reminders were not registered by the operating system');
  }
}

export async function askNotifyPermission(supplements: SupplementItem[] = storedSupplements(), preferences: ReminderPreferences = storedPreferences()): Promise<NotifyState> {
  if (!native()) return 'unsupported';
  const perm = await LocalNotifications.requestPermissions();
  if (perm.display !== 'granted') return perm.display === 'denied' ? 'denied' : 'default';
  await syncReminders(supplements, preferences);
  return 'granted';
}

export function showSystemNotification(title: string, body: string) {
  if (!native()) return;
  void LocalNotifications.schedule({
    notifications: [{
      id: Math.floor(Date.now() % 100000) + 100000,
      title,
      body,
      channelId: CHANNEL,
      schedule: { at: new Date(Date.now() + 800), allowWhileIdle: true },
    }],
  });
}

function storedPreferences(): ReminderPreferences {
  try { return { ...defaultReminderPreferences, ...JSON.parse(localStorage.getItem('flora-profile') || '{}') }; }
  catch { return defaultReminderPreferences; }
}
function storedSupplements(): SupplementItem[] {
  try { const items = JSON.parse(localStorage.getItem('flora-supplements') || '[]'); return Array.isArray(items) ? items : []; }
  catch { return []; }
}
