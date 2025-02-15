import { GroupedSessionsType, TimeSlotType } from "./TimeSlotType";

export type MovieSessionType = {
  title: string;
  imageUrl: string;
  description: string;
  duration: number;
  sessions: TimeSlotType[];
};

export type MoviesGroupType = {
  title: string;
  imageUrl: string;
  description: string;
  duration: number;
  groupedSessions: GroupedSessionsType;
};
