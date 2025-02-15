import dayjs from "dayjs";
import { GroupEventType } from "../types/UserEventType";

export const helperDateConverter = (date: string, time: string) =>
  dayjs(`${date} ${time}`, "DD MMM YYYY HH:mm").format("YYYY-MM-DDTHH:mm");

export const isPastDate = (date: string) =>
  dayjs(date).isBefore(dayjs(), "day");

export const formatDate = (date: string) => dayjs(date).format("DD MMM YYYY");

export const formatTime = (time: string) => dayjs(time).format("HH:mm");

export const formatDateMonth = (date: string, isFull?: boolean) =>
  dayjs(date).format(isFull ? "DD MMMM" : "DD MMM");

export const handleSortDates = (groupedPlans: GroupEventType) =>
  Object.keys(groupedPlans)
    .sort((a, b) => dayjs(b).diff(dayjs(a)))
    .map((d) => dayjs(d).format("YYYY-MM-DD"));
