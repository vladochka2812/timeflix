import { FC } from "react";
import classNames from "classnames";

import { FiPlus } from "react-icons/fi";
import { LuPopcorn } from "react-icons/lu";

import MyCalendar from "../MyCalendar/MyCalendar";
import { regularButtonStyle } from "../../styles/reusableStyles";

interface SidebarProps {
  markedDates: string[];
  handleDateClick: (date: string) => void;
  handleAddPlan: () => void;
  handleFindMovie: () => void;
  selectedDate?: string;
}

const Sidebar: FC<SidebarProps> = ({
  markedDates,
  handleDateClick,
  handleAddPlan,
  handleFindMovie,
  selectedDate,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-between h-full">
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-[24px] font-semibold text-white text-center">
          Make your plans
        </h2>
        <MyCalendar
          markedDates={markedDates}
          handleDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
        <button
          onClick={handleAddPlan}
          className={classNames(
            regularButtonStyle,
            "flex gap-4 justify-center items-center"
          )}
        >
          <FiPlus size={24} /> Add New Plans
        </button>
      </div>
      <div>
        <h2 className="text-[24px] font-semibold mb-1 text-white text-center">
          Find movie
        </h2>
        <ul className="text-neutral-200 leading-6 text-[16px] text-justify w-full list-disc px-5">
          <li>Schedule a movie night</li>
          <li>Find the perfect time to hit the cinema</li>
          <li>Don't miss out on the best screenings!</li>
        </ul>
        <button
          onClick={handleFindMovie}
          className={classNames(
            regularButtonStyle,
            "flex gap-4 justify-center items-center w-full mt-2"
          )}
        >
          <LuPopcorn size={24} /> Find a Movie
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
