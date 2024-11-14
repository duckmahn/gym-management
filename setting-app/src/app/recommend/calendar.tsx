import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const header = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>&lt;</button>
        <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>&gt;</button>
      </div>
    );
  };

  const daysOfWeek = () => {
    const days = [];
    const start = startOfWeek(new Date());
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-sm font-semibold">
          {format(addDays(start, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const dates = () => {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);
    const start = startOfWeek(startMonth);
    const end = endOfWeek(endMonth);

    const days = [];
    let day = start;
    while (day <= end) {
      const isToday = isSameDay(day, new Date());
      const isSelected = isSameDay(day, selectedDate);
      const isCurrentMonth = isSameMonth(day, currentDate);

      days.push(
        <div
        key={day.toString()}
          onClick={() => setSelectedDate(day)}
          className={`p-2 text-center text-sm cursor-pointer ${
            isCurrentMonth ? "" : "text-gray-400"
          } ${isToday ? "bg-blue-500 text-white rounded-full" : ""} ${
            isSelected ? "bg-blue-200 rounded-full" : ""
          }`}
        >
          {format(day, "d")}
        </div>
      );
      day = addDays(day, 1);
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  return (
    <div className="w-64 p-4 border rounded-lg shadow-md">
      {header()}
      {daysOfWeek()}
      {dates()}
    </div>
  );
};

export default Calendar;