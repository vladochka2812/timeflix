import ICAL from "ical.js";
import { savePlanToDB } from "../services/indexedDB";
import { UserEventType } from "../types/UserEventType";

export const uploadButton = (file: File) => {
  return new Promise<UserEventType[]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) {
        reject("Error reading file");
        return;
      }

      try {
        const jcalData = ICAL.parse(e.target.result as string);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents("vevent");

        const parsedEvents = vevents.map((vevent) => {
          const event = new ICAL.Event(vevent);
          return {
            id: event.uid || crypto.randomUUID(),
            title: event.summary || "No name",
            start: event.startDate.toString(),
            end: event.endDate.toString(),
          };
        });

        savePlanToDB(parsedEvents)
          .then(() => console.log("Saved"))
          .catch((err) => console.error("Error during saving", err));

        resolve(parsedEvents);
      } catch (error) {
        reject("Error parsing .ics file");
      }
    };

    reader.readAsText(file);
  });
};
