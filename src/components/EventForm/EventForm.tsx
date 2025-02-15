import { useState, useEffect } from "react";
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
    console.log();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="z-10 bg-neutral-900 rounded-lg  w-[320px] p-3">
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

          <div className="pb-6 h-15 relative w-full">
            <Controller
              control={control}
              name="date"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={displayDate}
                  onChange={(date: Date | null) => {
                    setDisplayDate(date);
                    if (date) {
                      setValue("date", dayjs(date).format("YYYY-MM-DD"));
                    }
                  }}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Select date"
                  className={classNames(inputStyle, "w-full")}
                  autoComplete="off"
                  minDate={new Date()}
                />
              )}
            />
            {errors.date && <p className={errorStyle}>{errors.date.message}</p>}
          </div>

          <div className="pb-6 h-15 relative flex w-full justify-between">
            <div className="pb-6 h-15 relative">
              <Controller
                control={control}
                name="start"
                rules={{ required: "Start time is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={
                      watch("start")
                        ? new Date(`1970-01-01T${watch("start")}`)
                        : null
                    }
                    onChange={(date: Date | null) =>
                      setValue("start", date ? dayjs(date).format("HH:mm") : "")
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    placeholderText="Start time"
                    className={classNames(inputStyle, "w-[140px]")}
                    disabled={!watch("date")}
                    autoComplete="off"
                  />
                )}
              />
              {errors.start && (
                <p className={errorStyle}>{errors.start.message}</p>
              )}
            </div>
            <div className="pb-6 h-15 relative">
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
                  <DatePicker
                    {...field}
                    selected={
                      watch("end")
                        ? new Date(`1970-01-01T${watch("end")}`)
                        : null
                    }
                    onChange={(date: Date | null) =>
                      setValue("end", date ? dayjs(date).format("HH:mm") : "")
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    placeholderText="End time"
                    className={classNames(inputStyle, "w-[140px]")}
                    autoComplete="off"
                    disabled={!watch("date")}
                  />
                )}
              />
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
