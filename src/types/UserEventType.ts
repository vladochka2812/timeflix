import { TimeSlotType } from "./TimeSlotType";

export type UserEventType = TimeSlotType & {
  id: number;
  title: string;
};

export type GroupEventType = { [date: string]: UserEventType[] };
