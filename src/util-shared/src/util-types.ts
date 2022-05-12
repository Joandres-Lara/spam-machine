export enum Periocities {
 inmediatly,
 late,
 daily,
 weekly,
 yearly,
 monthly,
}

export enum Months {
 january,
 february,
 march,
 april,
 may,
 june,
 july,
 august,
 september,
 october,
 november,
 december,
}

export enum WeeklyDays {
 monday,
 tuesday,
 wednesday,
 thursday,
 friday,
 saturday,
 sunday,
}

export interface Cron {
 periocity: keyof typeof Periocities;
 hours: string[];
 weekly_day: keyof typeof WeeklyDays;
 month: keyof typeof Months;
 tz: string;
}
