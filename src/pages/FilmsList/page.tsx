import { getGroupSessions } from "../../helpers/getGroupSessions";
import FilmCard from "../../components/FilmCard/FilmCard";
import { movieSessions } from "../../data/movieSessions";
import { useCallback } from "react";
import { useEventsActions } from "../../hooks/useEventsActions";
import ConfirmPopup from "../../components/ConfirmPopup/ConfirmPopup";
import { UserEventType } from "../../types/UserEventType";
import Modal from "../../components/Modal/Modal";

const FilmsListPage = () => {
  const { handleAddEvent, handleClose, openModal, content, isOpen } =
    useEventsActions();
  const movies = movieSessions
    .map((movie) => {
      return { ...movie, groupedSessions: getGroupSessions(movie.sessions) };
    })
    .filter((movie) => !!Object.keys(movie.groupedSessions).length);

  const handleConfirmSelectedMovie = useCallback(
    (movie: UserEventType) => {
      openModal(
        <ConfirmPopup
          title="Are you sure you want to add this movie to your schedule?"
          handleClose={handleClose}
          handleSubmit={() => handleAddEvent(movie)}
        />
      );
    },
    [handleAddEvent, handleClose, openModal]
  );
  return (
    <div className="w-[100vw]">
      <h1 className="text-white font-bold text-[36px] mt-22 text-center">
        Movies list
      </h1>
      <div className="m-5 flex flex-wrap justify-center gap-10 ">
        {movies.map((movie, index) => (
          <FilmCard
            key={index}
            movie={movie}
            handleSelectShowtime={handleConfirmSelectedMovie}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {content}
      </Modal>
    </div>
  );
};

export default FilmsListPage;
