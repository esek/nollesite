export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
};

export type CalendarResponse = {
  date: string;
  events: CalendarEvent[];
};
