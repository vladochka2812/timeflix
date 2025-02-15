import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";

interface MyCalendarProps {
  markedDates: string[];
  handleDateClick: (date: string) => void;
  selectedDate?: string;
}

const MyCalendar: React.FC<MyCalendarProps> = ({
  markedDates,
  handleDateClick,
  selectedDate,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<Date>(
    selectedDate ? dayjs(selectedDate, "YYYY-MM-DD").toDate() : new Date()
  );

  useEffect(() => {
    if (selectedDate) {
      const newDate = dayjs(selectedDate, "YYYY-MM-DD").toDate();
      setDate(newDate);
      setTimeout(() => {
        document
          .querySelector(".react-calendar__tile--active")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 100);
    }
  }, [selectedDate]);

  return (
    <div className="w-80 overflow-hidden md:mt-0 -mt-1" ref={calendarRef}>
      <Calendar
        onChange={(newDate) => {
          setDate(newDate as Date);
          handleDateClick(dayjs(newDate as Date).format("YYYY-MM-DD"));
        }}
        value={date}
        tileContent={({ date }) => {
          return markedDates.includes(dayjs(date).format("YYYY-MM-DD")) ? (
            <div className="w-1 h-1 bg-[#FF5630] rounded-full mt-0.5 flex justify-center" />
          ) : null;
        }}
      />
    </div>
  );
};

export default MyCalendar;
