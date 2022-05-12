import { IconType } from 'react-icons';
import { GiArmoredPants, GiMeal } from 'react-icons/gi';
import { FaBeer } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

export enum CalendarEventTag {
  Ouvve = 'OUVVE',
  Alcohol = 'ALCOHOL',
  Food = 'FOOD',
}

export const TagIcons: Record<CalendarEventTag, IconType> = {
  OUVVE: GiArmoredPants,
  ALCOHOL: FaBeer,
  FOOD: MdFastfood,
};

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  tags: CalendarEventTag[];
  location: string;
  weekNumber: number;
};

export type CalendarEventsGroupedByDay = {
  date: string;
  events: CalendarEvent[];
};

export type CalendarEventsGroupedByWeek = {
  weekNumber: number;
  days: CalendarEventsGroupedByDay[];
};
