import { Cron, Months, WeeklyDays } from "@bot-messages/util-shared";
import { Range, RecurrenceRule } from "node-schedule";

export default function parseCron({
 hours = [],
 periocity,
 tz,
 weekly_day,
 month,
}: Cron) {
 if (periocity === "inmediatly") {
  // Wait 30 seconds
  return new Date(Date.now() + 1000 * 30);
 }

 const rule = new RecurrenceRule();

 if (hours.length === 1) {
  const [hourString] = hours;
  const [hour, minute, second] = hourString.split(":");
  rule.hour = hour;
  rule.minute = minute;
  rule.second = second;
 }

 if (periocity === "late") {
  rule.year = new Date().getFullYear();
  return rule;
 }

 if (periocity === "daily") {
  rule.dayOfWeek = new Range(0, 6);
  return rule;
 }

 if (weekly_day) {
  rule.dayOfWeek = WeeklyDays[weekly_day];
 }

 if (month) {
  rule.month = Months[month];
 }

 rule.tz = tz;

 return rule;
}
