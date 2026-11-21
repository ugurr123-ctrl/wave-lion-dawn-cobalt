# Floria mobile UI

Preserve the existing Turkish, mobile-first pink lotus identity. Runtime styling lives in mobile/styles.css and src/flora components; this change adds no new visual tokens.

The header owns the notification bell and day-scoped notes. Profile settings remain accessible through the bottom Profile tab; there is no redundant header settings shortcut.

Notification read state is stored locally under flora-notes-read by local calendar date. Reopening a panel or relaunching the app must preserve read state for that date. A new day has new unread notes. Opening the bell must not request notification permission or change native schedules.

Native schedules are owned by notifications.ts and the pure reminderPlan.ts planner. Permission setup belongs to onboarding/Profile. Water and general notes respect quiet hours; supplement times remain user-selected. App startup must not show an unsolicited supplement toast.
