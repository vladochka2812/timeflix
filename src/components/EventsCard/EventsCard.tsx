import { FC } from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { GoPencil, GoTrash } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { LuPopcorn } from "react-icons/lu";

import { UserEventType } from "../../types/UserEventType";
import { formatTime, isPastDate } from "../../helpers/helperDate";

interface EventsCardProps {
  events: UserEventType[];
  date: string;
  handleEditEvent: (event?: UserEventType) => void;
  handleDeleteEvent: (id: number | string) => void;
  handleFindMovies: (date: string) => void;
}

const EventsCard: FC<EventsCardProps> = ({
  events,
  date,
  handleEditEvent,
  handleDeleteEvent,
  handleFindMovies,
}) => {
  return (
    <div className="sm:w-[500px] w-[340px]  flex flex-col text-white">
      <div className="border-b-2 border-white flex justify-between">
        <h3 className="font-bold text-[18px] py-2">
          {dayjs(date).format("DD.MM.YYYY")} - {dayjs(date).format("dddd")}
        </h3>
        {!isPastDate(date) && (
          <div className="flex gap-3 text-[#FF5630] items-center">
            <LuPopcorn size={25} onClick={() => handleFindMovies(date)} />
            <FiPlus size={25} onClick={() => handleEditEvent()} />
          </div>
        )}
      </div>
      <div>
        {events.map((event: UserEventType) => (
          <div
            className="flex justify-between py-2 border-b border-white w-full"
            key={event.id}
          >
            <div
              className={classNames("flex gap-3", {
                "text-[#FF5630] font-medium": event.id.toString().length === 4,
              })}
            >
              <span>
                {formatTime(event.start)}-{formatTime(event.end)}
              </span>
              <span>{event.title}</span>
            </div>

            <div className="flex justify-end gap-2 items-center">
              <GoPencil size={16} onClick={() => handleEditEvent(event)} />
              <GoTrash size={16} onClick={() => handleDeleteEvent(event.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCard;
