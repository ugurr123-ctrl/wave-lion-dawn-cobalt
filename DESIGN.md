# Floria mobile UI

Preserve the existing Turkish, mobile-first pink lotus identity. Runtime styling lives in mobile/styles.css and src/flora components; this change adds no new visual tokens.

The header owns the notification bell and day-scoped notes. Profile settings remain accessible through the bottom Profile tab; there is no redundant header settings shortcut.

Notification read state is stored locally under flora-notes-read by local calendar date. Reopening a panel or relaunching the app must preserve read state for that date. A new day has new unread notes. Opening the bell must not request notification permission or change native schedules.

Native schedules are owned by notifications.ts and the pure reminderPlan.ts planner. Permission setup belongs to onboarding/Profile. Water and general notes respect quiet hours; supplement times remain user-selected. App startup must not show an unsolicited supplement toast.

Tablet layout: at 768 CSS pixels the shared content shell expands to 72rem and primary tab cards use two equal columns. The greeting spans both; phone layouts remain stacked. Navigation stays bounded at 48rem. Fixed dialogs scroll independently within dynamic viewport/safe-area bounds; sticky header must not establish a containing block for fixed dialogs.
Profile photos: permission purpose strings are declared natively. Selected images are cropped/resized to at most 512px before local storage; loading, decoding/storage errors, and retry must preserve the previous photo.
