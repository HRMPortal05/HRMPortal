import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { addYears, format, isAfter, parse } from "date-fns";

const AttendanceChart = ({ percentage }) => {
  const data = [{ value: percentage }, { value: 100 - percentage }];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#7676DC"
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          <Cell key="cell-0" fill="#7676DC" />
          <Cell key="cell-1" fill="#E8E8FF" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-primary_color">12/23</span>
      </div>
    </div>
  );
};

const UpcomingHolidays = () => {
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);

  const allHolidays = [
    { date: "01-01", name: "New Year's Day" },
    { date: "07-04", name: "Independence Day" },
    { date: "11-11", name: "Veterans Day" },
    { date: "12-25", name: "Christmas Day" },
    // Add more fixed-date holidays here
  ];

  const calculateMemorialDay = (year) => {
    // Memorial Day is the last Monday in May
    for (let day = 31; day >= 25; day--) {
      const date = new Date(year, 4, day);
      if (date.getDay() === 1) return format(date, "yyyy-MM-dd");
    }
  };

  const calculateLaborDay = (year) => {
    // Labor Day is the first Monday in September
    for (let day = 1; day <= 7; day++) {
      const date = new Date(year, 8, day);
      if (date.getDay() === 1) return format(date, "yyyy-MM-dd");
    }
  };

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;

    const holidaysThisYear = allHolidays.map((holiday) => ({
      ...holiday,
      date: `${currentYear}-${holiday.date}`,
    }));

    const holidaysNextYear = allHolidays.map((holiday) => ({
      ...holiday,
      date: `${nextYear}-${holiday.date}`,
    }));

    const dynamicHolidays = [
      { date: calculateMemorialDay(currentYear), name: "Memorial Day" },
      { date: calculateLaborDay(currentYear), name: "Labor Day" },
    ];

    const allUpcomingHolidays = [
      ...holidaysThisYear,
      ...holidaysNextYear,
      ...dynamicHolidays,
    ]
      .filter((holiday) =>
        isAfter(parse(holiday.date, "yyyy-MM-dd", new Date()), today)
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    setUpcomingHolidays(allUpcomingHolidays);
  }, []);

  return (
    <div className="h-full flex flex-col p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary_color">
        Upcoming Holidays
      </h2>
      <ul className="overflow-auto flex-grow space-y-4">
        {upcomingHolidays.map(({ date, name }) => (
          <li
            key={date}
            className="bg-elight_primary p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className="font-semibold text-primary_color text-lg">
              {name}
            </span>
            <br />
            <span className="text-sm text-para">
              {format(parse(date, "yyyy-MM-dd", new Date()), "MMMM d, yyyy")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-primary_color">
        Today's Tasks
      </h2>
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded-l text-dark"
        />
        <button
          type="submit"
          className="bg-primary_color text-white p-2 rounded-r"
        >
          Add
        </button>
      </form>
      <ul className="overflow-auto flex-grow space-y-2 p-4 bg-gray-50 rounded-lg shadow-inner">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center p-3 bg-white rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400 mr-3 cursor-pointer"
            />
            <span
              className={`${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              } flex-grow text-lg`}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PerformanceOverview = () => {
  const performanceData = [
    { metric: "Productivity", value: 85 },
    { metric: "Quality of Work", value: 90 },
    { metric: "Team Collaboration", value: 78 },
    { metric: "Goal Achievement", value: 92 },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-primary_color">
        Performance Overview
      </h2>
      <div className="overflow-auto flex-grow">
        {performanceData.map(({ metric, value }) => (
          <div key={metric} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-para">{metric}</span>
              <span className="text-primary_color">{value}%</span>
            </div>
            <div className="w-full bg-elight_primary rounded">
              <div
                className="bg-light_primary rounded h-2"
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const attendancePercentage = 52;
  const totalDays = 23;
  const attendedDays = 12;

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-screen w-full p-4 my-4 border-2 rounded-lg border-elight_primary">
      {/* Left Column */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        {/* Top Section (Tall) - Performance Overview */}
        <div className="bg-white flex-grow h-2/3 rounded-lg shadow-md p-4">
          <PerformanceOverview />
        </div>
        {/* Bottom Section (Short) - Attendance Chart */}
        <div className="bg-white flex-grow h-1/3 rounded-lg shadow-md p-4">
          <div className="flex flex-row items-center justify-between h-full">
            <div className="w-1/2">
              <AttendanceChart percentage={attendancePercentage} />
            </div>
            <div className="w-1/2 flex flex-col items-start justify-center space-y-2">
              <h2 className="text-2xl font-bold text-primary_color">
                Attendance Overview
              </h2>
              <p className="text-4xl font-bold text-light_primary">
                {attendancePercentage}%
              </p>
              <p className="text-para">Total Days: {totalDays}</p>
              <p className="text-para">Days Attended: {attendedDays}</p>
              <p className="text-para">
                Days Missed: {totalDays - attendedDays}
              </p>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded ${
                    attendancePercentage >= 75
                      ? "bg-form_base text-white"
                      : "bg-light_primary text-white"
                  }`}
                >
                  {attendancePercentage >= 75
                    ? "Good Standing"
                    : "Needs Improvement"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        {/* Top Section (Short) */}
        <div className="bg-white flex-grow h-1/3 rounded-lg shadow-md p-4">
          <UpcomingHolidays />
        </div>
        {/* Bottom Section (Tall) - Today's Tasks */}
        <div className="bg-white flex-grow h-2/3 rounded-lg shadow-md p-4">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
