import { IconType } from 'react-icons';
import { GiArmoredPants, GiBeerBottle, GiMeal } from 'react-icons/gi';

export enum CalendarEventTag {
  Ouvve = 'OUVVE',
  Alcohol = 'ALCOHOL',
  Food = 'FOOD',
}

export const TagIcons: Record<CalendarEventTag, IconType> = {
  OUVVE: GiArmoredPants,
  ALCOHOL: GiBeerBottle,
  FOOD: GiMeal,
};

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  tags: CalendarEventTag[];
};

export type CalendarResponse = {
  date: string;
  events: CalendarEvent[];
};
