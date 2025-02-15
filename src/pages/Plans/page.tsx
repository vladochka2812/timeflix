import { useMemo, useCallback, ReactNode } from "react";

import { UserEventType } from "../../types/UserEventType";

import { useEventsActions } from "../../hooks/useEventsActions";

import { findAvailableMovies } from "../../helpers/findAvailableMovies";
import { getGroupSessions } from "../../helpers/getGroupSessions";
import { handleGroupPlans } from "../../helpers/handleGroupPlans";
import { handleSortDates } from "../../helpers/helperDate";

import EventForm from "../../components/EventForm/EventForm";
import Modal from "../../components/Modal/Modal";
import ConfirmPopup from "../../components/ConfirmPopup/ConfirmPopup";
import Sheet from "../../components/Sheet/Sheet";
import MovieRecommendations from "../../components/MovieRecommendations/MovieRecommendations";
import PlansMainContent from "../../components/PlansMainContent/PlansMainContent";
import { movieSessions } from "../../data/movieSessions";

const PlansPage = () => {
  const {
    handleAddEvent,
    handleUpdateEvent,
    handleDateClick,
    handleDelete,
    plans,
    isOpen,
    content,
    setContent,
    selectedDate,
    handleClose,
    openModal,
    isSheetOpen,
    setIsSheetOpen,
  } = useEventsActions();

  const groupedPlans = useMemo(() => handleGroupPlans(plans), [plans]);

  const sortedDates = useMemo(
    () => handleSortDates(groupedPlans),
    [groupedPlans]
  );

  const handleEditEvent = useCallback(
    (event?: UserEventType) => {
      openModal(
        <EventForm
          handleSave={handleAddEvent}
          eventToEdit={event}
          handleUpdate={handleUpdateEvent}
          date={selectedDate}
        />
      );
    },
    [handleAddEvent, handleUpdateEvent, selectedDate, openModal]
  );

  const handleConfirmDelete = useCallback(
    (id: number) => {
      openModal(
        <ConfirmPopup
          title="Are you sure you want to delete this event?"
          handleClose={handleClose}
          handleSubmit={() => handleDelete(id)}
        />
      );
    },
    [handleDelete, handleClose, openModal]
  );

  const handleAddPlan = useCallback(() => {
    openModal(<EventForm handleSave={handleAddEvent} />);
  }, [handleAddEvent, openModal]);

  const handleConfirmSelectedMovie = useCallback(
    (movie: UserEventType) => {
      setIsSheetOpen(false);
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

  const handleFindMovies = useCallback(
    (date?: string) => {
      const movies =
        typeof date === "string"
          ? findAvailableMovies(plans, movieSessions, date)
          : findAvailableMovies(plans, movieSessions);
      if (movies.length) {
        setContent(
          <MovieRecommendations
            movieList={movies.map((movie) => ({
              ...movie,
              groupedSessions: getGroupSessions(movie.sessions),
            }))}
            handleSelectShowtime={handleConfirmSelectedMovie}
          />
        );
        setIsSheetOpen(true);
      } else {
        openModal(
          <ConfirmPopup title="Oops! No movies match your schedule." />
        );
      }
    },
    [plans, handleConfirmSelectedMovie, openModal]
  );
  const handleOpenSidebar = (content: ReactNode) => {
    setContent(
      <div className="flex items-stretch justify-center w-full h-full py-14 -mt-8">
        {content}
      </div>
    );
    setIsSheetOpen(true);
  };

  return (
    <div>
      <PlansMainContent
        markedDates={sortedDates}
        handleDateClick={handleDateClick}
        handleAddPlan={handleAddPlan}
        selectedDate={selectedDate}
        handleFindMovie={handleFindMovies}
        groupedPlans={groupedPlans}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleConfirmDelete}
        handleFindMovies={handleFindMovies}
        handleOpenSidebar={handleOpenSidebar}
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        {content}
      </Modal>
      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        position="right"
      >
        {content}
      </Sheet>
    </div>
  );
};

export default PlansPage;
