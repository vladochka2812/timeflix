import { FC, ReactNode } from "react";
import classNames from "classnames";
import { FiPlus } from "react-icons/fi";
import { LuPopcorn, LuCalendar } from "react-icons/lu";

import Sidebar from "../Sidebar/Sidebar";
import EventsCard from "../EventsCard/EventsCard";

import { GroupEventType, UserEventType } from "../../types/UserEventType";
import { regularButtonStyle } from "../../styles/reusableStyles";
import { formatDateMonth, isPastDate } from "../../helpers/helperDate";

interface PlansMainContentProps {
  markedDates: string[];
  selectedDate: string;
  groupedPlans: GroupEventType;
  handleDateClick: (date: string) => void;
  handleAddPlan: () => void;
  handleFindMovie: () => void;
  handleEditEvent: (event?: UserEventType) => void;
  handleDeleteEvent: (id: number) => void;
  handleFindMovies: (date: string) => void;
  handleOpenSidebar: (content: ReactNode) => void;
}

const PlansMainContent: FC<PlansMainContentProps> = ({
  markedDates,
  selectedDate,
  groupedPlans,
  handleAddPlan,
  handleFindMovie,
  handleDateClick,
  handleDeleteEvent,
  handleEditEvent,
  handleFindMovies,
  handleOpenSidebar,
}) => {
  const sidebar = (
    <Sidebar
      markedDates={markedDates}
      handleDateClick={handleDateClick}
      handleAddPlan={handleAddPlan}
      selectedDate={selectedDate}
      handleFindMovie={handleFindMovie}
    />
  );
  return (
    <div className="relative flex flex-col lg:flex-row mt-5 w-[100vw] h-[calc(100vh-5rem)] overflow-y-scroll lg:justify-between text-black">
      <div className="hidden lg:block fixed left-0 top-[4rem] bg-zinc-900 h-[calc(100vh-4rem)] w-[350px] p-3 border-r-[#FF5630] border-r border-neutral-900 ">
        {sidebar}
      </div>
      <div className="lg:hidden flex mt-5 items-center justify-center border-b-[#FF5630] border-b-[1px]">
        <button
          className="text-white text-[18px] font-medium flex text-nowrap items-center gap-4 cursor-pointer py-1.5"
          onClick={() => handleOpenSidebar(sidebar)}
        >
          Make plans <LuCalendar />
        </button>
      </div>
      <div className="flex flex-col w-full lg:ml-[350px] lg:w-[calc(100vw-350px)] flex-wrap gap-5 items-center lg:mt-10 mt-5">
        {groupedPlans[selectedDate] ? (
          <EventsCard
            events={groupedPlans[selectedDate]}
            date={selectedDate}
            handleEditEvent={handleEditEvent}
            handleDeleteEvent={handleDeleteEvent}
            handleFindMovies={handleFindMovies}
          />
        ) : (
          <div>
            <h2 className="text-[24px] font-semibold sm:mt-68 mt-40 text-center text-neutral-400">
              No plans for {formatDateMonth(selectedDate, true)}.
              <br /> Why not schedule a movie?
            </h2>
            {!isPastDate(selectedDate) && (
              <div className="absolute bottom-3 right-3 flex flex-col gap-4">
                <button
                  onClick={() => handleEditEvent()}
                  className={classNames(
                    "flex flex-nowrap gap-3 justify-between px-5 h-10 w-64",
                    regularButtonStyle
                  )}
                >
                  <FiPlus size={22} /> Add Plans for{" "}
                  {formatDateMonth(selectedDate)}
                </button>
                <button
                  onClick={() => handleFindMovies(selectedDate)}
                  className={classNames(
                    "flex flex-nowrap gap-3 justify-between px-5 h-10 w-64",
                    regularButtonStyle
                  )}
                >
                  <LuPopcorn size={22} /> Find movie for{" "}
                  {formatDateMonth(selectedDate)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansMainContent;
