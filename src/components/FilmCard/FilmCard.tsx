import { FC, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { RiArrowUpWideFill, RiArrowDownWideFill } from "react-icons/ri";
import { SlClock } from "react-icons/sl";

import { MoviesGroupType } from "../../types/MovieSessionType";
import { UserEventType } from "../../types/UserEventType";
import { helperDateConverter } from "../../helpers/helperDate";

interface FilmCardProps {
  movie: MoviesGroupType;
  handleSelectShowtime?: (movie: UserEventType) => void;
}

const FilmCard: FC<FilmCardProps> = ({ movie, handleSelectShowtime }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-neutral-900 text-white rounded-2xl overflow-hidden border-[#FF5630] border-[1px] md:w-[320px] w-[280px]">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-full max-h-[400px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-[#FF5630] text-nowrap truncate">
          {movie.title}
        </h2>
        <div className="mt-2 flex justify-between items-center text-neutral-400">
          <span className="text-[14px] flex gap-2 items-center">
            <SlClock size={16} /> {movie.duration} min
          </span>
        </div>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isOpen ? "0%" : "100%" }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 w-full bg-neutral-900 p-4 rounded-t-lg"
        >
          <div className="relative mb-2">
            {isOpen && (
              <div
                className="absolute -top-6 left-1/2 text-neutral-700 transform -translate-x-1/2 flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <RiArrowDownWideFill size={24} />
              </div>
            )}
            <h2 className="text-[16px] font-semibold text-center mt-2">
              {movie.title}
            </h2>
            <span className="text-[14px] font-semibold">Short Info</span>
            <p className="text-[12px] text-justify leading-4 text-neutral-400">
              {movie.description}
            </p>
            <h3 className="mt-2 text-[14px] font-semibold">Showtime</h3>
            <div className="max-h-[150px] overflow-auto flex flex-col gap-2 ">
              {Object.entries(movie.groupedSessions).map(
                ([date, times], index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="flex font-semibold justify-center text-[12px] text-neutral-200">
                      {date}
                    </span>
                    <ul className="flex flex-wrap gap-3.5 mb-1 mt-0.5 lg:w-[280px] w-[240px]">
                      {times.map((time, idx) => (
                        <li
                          onClick={() =>
                            handleSelectShowtime &&
                            handleSelectShowtime({
                              id: Math.floor(1000 + Math.random() * 9000),
                              title: movie.title,
                              end: helperDateConverter(
                                date,
                                time.split("-")[1]
                              ),
                              start: helperDateConverter(
                                date,
                                time.split("-")[0]
                              ),
                            })
                          }
                          key={idx}
                          className={classNames(
                            "text-[14px] bg-[#FF5630] px-0.5 rounded-md",
                            { "cursor-pointer": !!handleSelectShowtime }
                          )}
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
        {!isOpen && (
          <div
            className="absolute bottom-0 left-1/2 text-neutral-700 transform -translate-x-1/2 flex items-center justify-center cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <RiArrowUpWideFill size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmCard;
