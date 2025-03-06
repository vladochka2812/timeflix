import dayjs from "dayjs";
import {
  deletePlanFromDB,
  getPlansFromDB,
  savePlanToDB,
  updatePlanInDB,
} from "../services/indexedDB";
import { UserEventType } from "../types/UserEventType";
import { useEffect, useState } from "react";
import { uploadButton } from "../helpers/uploadPlans";

export const useEventsActions = () => {
  const [plans, setPlans] = useState<UserEventType[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [content, setContent] = useState<React.ReactNode>(null);

  const handleClose = () => {
    setIsOpen(false);
    setContent(null);
  };

  const openModal = (modalContent: React.ReactNode) => {
    setIsSheetOpen(false);
    setContent(modalContent);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteEvent(id);
    setIsOpen(false);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate((prev) => (prev === date ? today : date));
    setIsSheetOpen(false);
  };

  const handleAddEvent = (newEvent: UserEventType) => {
    const updatedPlans = [
      ...plans,
      { ...newEvent, id: newEvent?.id || Date.now() },
    ];
    const eventDate = dayjs(newEvent.start).format("YYYY-MM-DD");
    setSelectedDate(eventDate);
    setPlans(updatedPlans);
    savePlanToDB(updatedPlans);
    handleClose();
  };

  const handleUpdateEvent = (updatedEvent: UserEventType) => {
    const updatedPlans = plans.map((plan) =>
      plan.id === updatedEvent.id ? updatedEvent : plan
    );
    setPlans(updatedPlans);
    updatePlanInDB(updatedEvent);
    handleClose();
  };

  const deleteEvent = (id: number) => {
    const updatedPlans = plans.filter((event) => event.id !== id);
    setPlans(updatedPlans);
    deletePlanFromDB(id);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadButton(file);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlansFromDB().then((data) => {
      setPlans(data);
    });
  }, [handleFileUpload]);

  return {
    handleAddEvent,
    handleUpdateEvent,
    deleteEvent,
    handleDateClick,
    handleDelete,
    plans,
    setPlans,
    isOpen,
    setIsOpen,
    content,
    setContent,
    selectedDate,
    setSelectedDate,
    handleClose,
    openModal,
    isSheetOpen,
    setIsSheetOpen,
    handleFileUpload,
  };
};
