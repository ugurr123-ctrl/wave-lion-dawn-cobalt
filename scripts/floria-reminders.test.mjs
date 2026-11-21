import test from 'node:test';
import assert from 'node:assert/strict';
import { buildReminderPlan } from '../src/flora/reminderPlan.ts';
test('water and kind notes recur daily without opening the app', () => {
 const plan = buildReminderPlan([]);
 assert.equal(plan.filter(n => n.id >= 1200).length, 9);
 assert.equal(plan.filter(n => n.id < 1200).length, 3);
 assert.ok(plan.every(n => n.schedule.repeats && n.schedule.allowWhileIdle));
 assert.ok(plan.length < 64);
});
test('quiet hours suppress water and notes while preserving chosen supplement times', () => {
 const plan = buildReminderPlan([{id:'a',time:'23:30',reminderEnabled:true}], {quietHoursStart:'20:00',quietHoursEnd:'10:00',reminderIntervalMin:120});
 assert.ok(plan.filter(n=>n.id<2000).every(n => n.schedule.on.hour >= 10 && n.schedule.on.hour < 20));
 assert.equal(plan.find(n=>n.id===2000).schedule.on.hour,23);
});
test('disabled and invalid supplement times are excluded', () => {
 assert.equal(buildReminderPlan([{time:'25:00',reminderEnabled:true},{time:'12:30',reminderEnabled:false}]).filter(n=>n.id>=2000).length,0);
});
test('same-day quiet hours and invalid intervals remain bounded', () => {
 const plan = buildReminderPlan([], {quietHoursStart:'12:00',quietHoursEnd:'15:00',reminderIntervalMin:0});
 assert.ok(plan.every(n=> n.schedule.on.hour < 12 || n.schedule.on.hour >= 15));
 assert.ok(plan.length < 64);
});
