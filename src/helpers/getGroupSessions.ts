import dayjs from "dayjs";
import { GroupedSessionsType, TimeSlotType } from "../types/TimeSlotType";
import { formatDate, formatTime } from "./helperDate";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const getGroupSessions = (
  sessions: TimeSlotType[]
): GroupedSessionsType => {
  const grouped = sessions
    .filter((session) => dayjs(session.start).isSameOrAfter(dayjs(), "day"))
    ?.reduce((acc, session) => {
      const date = formatDate(session.start);
      const time = `${formatTime(session.start)}-${formatTime(session.end)}`;
      if (!acc[date]) acc[date] = [];
      acc[date].push(time);
      acc[date].sort((a, b) =>
        dayjs(a.split("-")[0], "HH:mm").diff(dayjs(b.split("-")[0], "HH:mm"))
      );
      return acc;
    }, {} as GroupedSessionsType);
  return Object.fromEntries(
    Object.entries(grouped).sort(([dateA], [dateB]) =>
      dayjs(dateA).diff(dayjs(dateB))
    )
  );
};
