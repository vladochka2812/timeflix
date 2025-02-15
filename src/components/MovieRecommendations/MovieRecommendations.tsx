import { FC } from "react";

import { MoviesGroupType } from "../../types/MovieSessionType";
import { UserEventType } from "../../types/UserEventType";

import FilmCard from "../FilmCard/FilmCard";

interface MovieRecommendationsProps {
  movieList: MoviesGroupType[];
  handleSelectShowtime?: (movie: UserEventType) => void;
}
const MovieRecommendations: FC<MovieRecommendationsProps> = ({
  movieList,
  handleSelectShowtime,
}) => {
  return (
    <div className="flex flex-col items-center px-2 py-5 bg-zinc-900">
      <h2 className="text-[24px] text-white">Select Showtime</h2>
      <div className="flex flex-wrap gap-5 justify-center mt-5">
        {movieList.map((movie, index) => (
          <FilmCard
            key={index}
            movie={movie}
            handleSelectShowtime={handleSelectShowtime}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
