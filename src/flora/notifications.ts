import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { morningLine, supplementLine } from './dailyTips';
import type { SupplementItem } from './types';

export type NotifyState = 'granted' | 'denied' | 'default' | 'unsupported';

const CHANNEL = 'floria';

function native(): boolean {
  return typeof window !== 'undefined' && Capacitor.isNativePlatform();
}

function parseTime(value: string): { hour: number; minute: number } | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return { hour, minute };
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

export async function syncReminders(supplements: SupplementItem[]) {
  if (!native()) return;
  const status = await LocalNotifications.checkPermissions();
  if (status.display !== 'granted') return;
  try {
    const exact = await LocalNotifications.checkExactNotificationSetting();
    if (exact.exact_alarm !== 'granted') await LocalNotifications.changeExactNotificationSetting();
  } catch {
    /* older android builds still schedule */
  }
  await ensureChannel();
  const pending = await LocalNotifications.getPending();
  const ours = pending.notifications
    .filter((item) => (item.id >= 901 && item.id <= 920) || (item.id >= 1200 && item.id < 1800))
    .map((item) => ({ id: item.id }));
  if (ours.length) await LocalNotifications.cancel({ notifications: ours });
  const notifications: {
    id: number;
    title: string;
    body: string;
    channelId: string;
    schedule: { at: Date; allowWhileIdle: true };
  }[] = [];
  for (let offset = 0; offset < 10; offset += 1) {
    const at = new Date();
    at.setDate(at.getDate() + offset);
    at.setHours(9, 0, 0, 0);
    if (at.getTime() < Date.now() + 30_000) continue;
    notifications.push({
      id: 901 + offset,
      title: 'Floria',
      body: morningLine(at),
      channelId: CHANNEL,
      schedule: { at, allowWhileIdle: true },
    });
  }
  supplements.forEach((item, index) => {
    if (!item.reminderEnabled) return;
    const time = parseTime(item.time);
    if (!time) return;
    for (let offset = 0; offset < 7; offset += 1) {
      const at = new Date();
      at.setDate(at.getDate() + offset);
      at.setHours(time.hour, time.minute, 0, 0);
      if (at.getTime() < Date.now() + 30_000) continue;
      notifications.push({
        id: 1200 + index * 10 + offset,
        title: 'Floria',
        body: supplementLine(item.name, item.dose, at),
        channelId: CHANNEL,
        schedule: { at, allowWhileIdle: true },
      });
    }
  });
  if (notifications.length) await LocalNotifications.schedule({ notifications });
}

export async function askNotifyPermission(supplements: SupplementItem[] = []): Promise<NotifyState> {
  if (!native()) return 'unsupported';
  const perm = await LocalNotifications.requestPermissions();
  if (perm.display !== 'granted') return perm.display === 'denied' ? 'denied' : 'default';
  await syncReminders(supplements);
  window.dispatchEvent(new Event('floria-notify'));
  await LocalNotifications.schedule({
    notifications: [{
      id: 902,
      title: 'Floria',
      body: 'Hatırlatmalar açık. Uygulama kapalıyken de gelir.',
      channelId: CHANNEL,
      schedule: { at: new Date(Date.now() + 1500), allowWhileIdle: true },
    }],
  });
  return 'granted';
}

export function showSystemNotification(title: string, body: string) {
  if (!native()) return;
  void LocalNotifications.schedule({
    notifications: [{
      id: Math.floor(Date.now() % 100000) + 2000,
      title,
      body,
      channelId: CHANNEL,
      schedule: { at: new Date(Date.now() + 800), allowWhileIdle: true },
    }],
  });
}
