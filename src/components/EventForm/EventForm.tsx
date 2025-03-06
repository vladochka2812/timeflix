import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { UserEventType } from "../../types/UserEventType";
import { formatTime } from "../../helpers/helperDate";
import {
  errorStyle,
  inputStyle,
  regularButtonStyle,
} from "../../styles/reusableStyles";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

type EventFormProps = {
  handleSave: (event: UserEventType) => void;
  handleUpdate?: (updatedEvent: UserEventType) => void;
  eventToEdit?: UserEventType | null;
  date?: string;
};

const EventForm: React.FC<EventFormProps> = ({
  handleSave,
  handleUpdate,
  eventToEdit,
  date,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    date: string;
    start: string;
    end: string;
  }>({
    defaultValues: {
      title: eventToEdit?.title || "",
      date: eventToEdit
        ? dayjs(eventToEdit.start).format("YYYY-MM-DD")
        : date || "",
      start: eventToEdit ? formatTime(eventToEdit.start) : "",
      end: eventToEdit ? formatTime(eventToEdit.end) : "",
    },
    mode: "all",
  });

  const [displayDate, setDisplayDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isStartTimePickerOpen, setIsStartTimePickerOpen] = useState(false);
  const [startDayPart, setStartDayPart] = useState("");
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = useState(false);
  const [endDayPart, setEndDayPart] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setDisplayDate(new Date(eventToEdit.start));
      setValue("date", dayjs(eventToEdit.start).format("YYYY-MM-DD"));
      setValue("start", formatTime(eventToEdit.start));
      setValue("end", formatTime(eventToEdit.end));
      setValue("title", eventToEdit.title);
    }
  }, [eventToEdit, setValue]);

  const onSubmit = ({
    title,
    date,
    start,
    end,
  }: {
    title: string;
    date: string;
    start: string;
    end: string;
  }) => {
    const formattedStart = `${date}T${start}`;
    const formattedEnd = `${date}T${end}`;
    const newEvent = {
      id: eventToEdit?.id || Date.now(),
      title,
      start: formattedStart,
      end: formattedEnd,
    };

    if (eventToEdit) {
      handleUpdate && handleUpdate(newEvent);
    } else {
      handleSave(newEvent);
      reset();
    }
  };

  const datePickerRef = useRef<HTMLDivElement>(null);
  const startTimePickerRef = useRef<HTMLDivElement>(null);
  const endTimePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDatePickerOpen &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }

      if (
        isStartTimePickerOpen &&
        startTimePickerRef.current &&
        !startTimePickerRef.current.contains(event.target as Node)
      ) {
        setIsStartTimePickerOpen(false);
      }

      if (
        isEndTimePickerOpen &&
        endTimePickerRef.current &&
        !endTimePickerRef.current.contains(event.target as Node)
      ) {
        setIsEndTimePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen, isStartTimePickerOpen, isEndTimePickerOpen]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="z-10 bg-neutral-900 rounded-lg w-[320px] p-3">
        <h2 className="text-center text-[18px] font-semibold text-white">
          Add your plans
        </h2>
        <div className="w-[290px] mx-auto gap-4 mt-2">
          <div className="pb-6 h-15 relative">
            <Controller
              control={control}
              name="title"
              rules={{ required: "Event is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Event"
                  className={classNames(inputStyle, "w-full")}
                  autoComplete="off"
                />
              )}
            />
            {errors.title && (
              <p className={errorStyle}>{errors.title.message}</p>
            )}
          </div>

          <div
            className="pb-6 h-15 relative w-full"
            ref={datePickerRef}
            id="datePicker"
          >
            <Controller
              control={control}
              name="date"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <div className="relative w-full">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between bg-neutral-800 text-white px-4 py-2 rounded-lg"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  >
                    {displayDate
                      ? dayjs(displayDate).format("DD.MM.YYYY")
                      : "Select date"}
                  </button>

                  {isDatePickerOpen && (
                    <DatePicker
                      id="datePicker"
                      {...field}
                      selected={displayDate}
                      onChange={(date: Date | null) => {
                        setDisplayDate(date);
                        setIsDatePickerOpen(false);
                        setValue(
                          "date",
                          date ? dayjs(date).format("YYYY-MM-DD") : ""
                        );
                      }}
                      inline
                      autoComplete="off"
                      minDate={new Date()}
                    />
                  )}
                </div>
              )}
            />
            {errors.date && <p className={errorStyle}>{errors.date.message}</p>}
          </div>
          <div className="pb-6 h-15 relative flex w-full justify-between">
            <div className="w-[140px] pb-6 h-15 relative">
              <div
                ref={startTimePickerRef}
                id="startTimePicker"
                className="relative flex text-white items-center gap-2"
              >
                <Controller
                  control={control}
                  name="start"
                  rules={{ required: "Start time is required" }}
                  render={({ field }) => (
                    <div className="relative gap-2">
                      <button
                        type="button"
                        className="w-[100px] text-[16px] flex items-center justify-between bg-neutral-800 px-4 py-2 rounded-lg"
                        onClick={() => {
                          setIsStartTimePickerOpen(!isStartTimePickerOpen);
                          setStartDayPart("");
                        }}
                      >
                        {watch("start") || "Start"}
                      </button>

                      {isStartTimePickerOpen && (
                        <DatePicker
                          id="startTimePicker"
                          {...field}
                          selected={
                            watch("start")
                              ? new Date(`1970-01-01T${watch("start")}`)
                              : null
                          }
                          onChange={(date: Date | null) => {
                            setStartDayPart(
                              date ? dayjs(date).format("A") : ""
                            );
                            setValue(
                              "start",
                              date ? dayjs(date).format("hh:mm") : ""
                            );
                            setIsStartTimePickerOpen(false);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={5}
                          timeCaption="Time"
                          dateFormat="hh:mm"
                          inline
                          autoComplete="off"
                        />
                      )}
                    </div>
                  )}
                />
                {startDayPart && <div className="">{startDayPart}</div>}
              </div>
              {errors.start && (
                <p className={errorStyle}>{errors.start.message}</p>
              )}
            </div>
            <div className="w-[140px] pb-6 h-15 relative items-start">
              <div
                ref={endTimePickerRef}
                id="endTimePicker"
                className="relative flex text-white items-center gap-2 justify-between"
              >
                <Controller
                  control={control}
                  name="end"
                  rules={{
                    required: "End time is required",
                    validate: (value) =>
                      dayjs(`2024-01-01T${value}`).isAfter(
                        dayjs(`2024-01-01T${watch("start")}`)
                      ) || "End time must be later",
                  }}
                  render={({ field }) => (
                    <div className="relative gap-2">
                      <button
                        type="button"
                        className="w-[100px] text-[16px] flex items-center justify-between bg-neutral-800 px-4 py-2 rounded-lg"
                        onClick={() => {
                          setIsEndTimePickerOpen(!isEndTimePickerOpen);
                          setEndDayPart("");
                        }}
                      >
                        {watch("end") || "End"}
                      </button>

                      {isEndTimePickerOpen && (
                        <DatePicker
                          id="endTimePicker"
                          {...field}
                          selected={
                            watch("end")
                              ? new Date(`1970-01-01T${watch("end")}`)
                              : null
                          }
                          onChange={(date: Date | null) => {
                            setEndDayPart(date ? dayjs(date).format("A") : "");
                            setValue(
                              "end",
                              date ? dayjs(date).format("hh:mm") : ""
                            );
                            setIsEndTimePickerOpen(false);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={5}
                          timeCaption="Time"
                          dateFormat="hh:mm"
                          inline
                          autoComplete="off"
                        />
                      )}
                    </div>
                  )}
                />
                {endDayPart && <div className="">{endDayPart}</div>}
              </div>
              {errors.end && <p className={errorStyle}>{errors.end.message}</p>}
            </div>
          </div>
        </div>

        <button
          id="saveTimeButton"
          type="submit"
          className={classNames(regularButtonStyle, "w-full  mt-2")}
        >
          Save plans
        </button>
      </div>
    </form>
  );
};

export default EventForm;
