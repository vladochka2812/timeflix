import dayjs from "dayjs";
import { GroupEventType, UserEventType } from "../types/UserEventType";

export const handleGroupPlans = (plans: UserEventType[]): GroupEventType =>
  plans.reduce((acc, event) => {
    const date = dayjs(event.start).format("YYYY-MM-DD");
    acc[date] = [...(acc[date] || []), event].sort((a, b) =>
      dayjs(a.start).diff(dayjs(b.start))
    );
    return acc;
  }, {} as GroupEventType);
