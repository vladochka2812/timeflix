import { movieSessions } from "../../data/movieSessions";
import { getGroupSessions } from "../../helpers/getGroupSessions";
import FilmCard from "../../components/FilmCard/FilmCard";

const FilmsListPage = () => {
  const movies = movieSessions.map((movie) => {
    return { ...movie, groupedSessions: getGroupSessions(movie.sessions) };
  });

  return (
    <div>
      <h1 className="text-white font-bold text-[36px] mt-22 text-center">
        Movies list
      </h1>
      <div className="m-5 flex flex-wrap justify-center gap-10 ">
        {movies.map((movie, index) => (
          <FilmCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FilmsListPage;
