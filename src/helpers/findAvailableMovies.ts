import dayjs from "dayjs";
import { MovieSessionType } from "../types/MovieSessionType";
import { UserEventType } from "../types/UserEventType";
import { findFreeTimeSlots } from "./findFreeTimeSlots";

export const findAvailableMovies = (
  schedule: UserEventType[],
  movies: MovieSessionType[],
  selectedDate?: string
) => {
  const today = dayjs().format("YYYY-MM-DD");
  const currentTime = dayjs().format("HH:mm");

  const datesToCheck = selectedDate
    ? [selectedDate]
    : Array.from(
        new Set(
          movies.flatMap((movie) =>
            movie.sessions
              .filter(
                (session) =>
                  session.start.split("T")[0] > today ||
                  (session.start.split("T")[0] === today &&
                    session.start.split("T")[1] >= currentTime)
              )
              .map((session) => session.start.split("T")[0])
          )
        )
      );
  const movieMap = new Map<
    string,
    {
      title: string;
      description: string;
      imageUrl: string;
      duration: number;
      sessions: { start: string; end: string }[];
    }
  >();

  datesToCheck.forEach((date) => {
    const freeSlots = findFreeTimeSlots(schedule, date);
    movies.forEach((movie) => {
      const availableSessions = movie.sessions.filter(
        (session) =>
          session.start.startsWith(date) &&
          freeSlots.some(
            (slot) =>
              dayjs(session.start).isAfter(slot.start) &&
              dayjs(session.end).isBefore(slot.end)
          )
      );
      if (availableSessions.length > 0) {
        if (!movieMap.has(movie.title)) {
          movieMap.set(movie.title, {
            title: movie.title,
            description: movie.description,
            imageUrl: movie.imageUrl,
            duration: movie.duration,
            sessions: [],
          });
        }
        movieMap.get(movie.title)!.sessions.push(...availableSessions);
      }
    });
  });

  return Array.from(movieMap.values());
};
