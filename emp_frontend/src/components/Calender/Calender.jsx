import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useFetchAttendanceMutation } from "../../services/Attendance";

const Calendar = () => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [attendanceData, setAttendanceData] = useState([]);
  const [fetchAttendance] = useFetchAttendanceMutation();

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    generateCalendar(selectedYear, selectedMonth);
    fetchAttendanceData();
  }, [selectedYear, selectedMonth]);

  const fetchAttendanceData = async () => {
    try {
      const data = await fetchAttendance(access_token).unwrap();
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const generateCalendar = (year, month) => {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const days = [];
    const startDay = monthStart.getDay();
    const totalDays = monthEnd.getDate();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }
    setDaysInMonth(days);
    setMonthName(dayjs(monthStart).format("MMMM YYYY"));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getAttendanceStatus = (date) => {
    if (!date) return null;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const attendance = attendanceData.find((att) =>
      dayjs(att.created_date).isSame(formattedDate, "day")
    );
    return attendance ? (attendance.is_present ? "present" : "absent") : null;
  };

  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMMM")
  );

  return (
    <div className="max-w-full sm:max-w-3xl mx-auto mt-4 sm:mt-10 p-2 sm:p-6 bg-white shadow-lg rounded-lg">
      {/* Month and Year Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="w-full sm:w-auto p-2 text-base sm:text-lg bg-elight_primary text-primary_color rounded-md focus:outline-none"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <h2 className="text-xl sm:text-2xl font-semibold text-primary_color">
          {monthName}
        </h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full sm:w-auto p-2 text-base sm:text-lg bg-elight_primary text-primary_color rounded-md focus:outline-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-semibold mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div
            key={day}
            className="uppercase text-light_primary text-xs sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {daysInMonth.map((date, index) => {
          const attendanceStatus = getAttendanceStatus(date);
          const isPast = date && date < currentDate;

          return (
            <div
              key={index}
              className={`relative aspect-square flex items-center justify-center border rounded-lg text-xs sm:text-base ${
                attendanceStatus === "present"
                  ? "bg-green-500 text-white"
                  : attendanceStatus === "absent"
                  ? "bg-red-500 text-white"
                  : isToday(date)
                  ? "bg-primary_color text-white shadow-lg border-light_primary"
                  : isPast
                  ? "bg-elight_primary text-primary_color"
                  : "bg-white text-light_primary"
              } hover:bg-light_primary hover:text-white transition duration-300`}
            >
              {date ? (
                <div className="text-xl font-semibold">{date.getDate()}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
