import dayjs from "dayjs";
import { TimeSlotType } from "../types/TimeSlotType";
import { UserEventType } from "../types/UserEventType";

export const findFreeTimeSlots = (
  schedule: UserEventType[],
  date?: string
): TimeSlotType[] => {
  const uniqueDates = date
    ? [date]
    : [...new Set(schedule.map((event) => event.start.split("T")[0]))];

  return uniqueDates.flatMap((currentDate) => {
    const cinemaOpen = `${currentDate}T10:00`;
    const cinemaClose = `${currentDate}T23:59`;

    const sortedSchedule = schedule
      .filter((event) => event.start.startsWith(currentDate))
      .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

    if (!sortedSchedule.length)
      return [{ start: cinemaOpen, end: cinemaClose }];

    const freeSlots: TimeSlotType[] = [];

    if (dayjs(sortedSchedule[0].start).isAfter(cinemaOpen)) {
      freeSlots.push({ start: cinemaOpen, end: sortedSchedule[0].start });
    }

    for (let i = 0; i < sortedSchedule.length - 1; i++) {
      const { end: currentEnd } = sortedSchedule[i];
      const { start: nextStart } = sortedSchedule[i + 1];

      if (dayjs(currentEnd).isBefore(nextStart)) {
        freeSlots.push({ start: currentEnd, end: nextStart });
      }
    }

    if (
      dayjs(sortedSchedule[sortedSchedule.length - 1].end).isBefore(cinemaClose)
    ) {
      freeSlots.push({
        start: sortedSchedule[sortedSchedule.length - 1].end,
        end: cinemaClose,
      });
    }

    return freeSlots;
  });
};
