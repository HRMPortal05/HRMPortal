import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { format, isAfter, parse } from "date-fns";
import {
  useFetchAttendanceMutation,
  useCreateTaskMutation,
  useFetchTasksMutation,
} from "../services/Dashboard";

const AttendanceChart = ({ percentage, attendanceData }) => {
  const chartData = [{ value: percentage }, { value: 100 - percentage }];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
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
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {attendanceData ? (
          <span className="text-2xl font-bold text-primary_color">
            {attendanceData.present_days}/{attendanceData.totalDays}
          </span>
        ) : (
          <span className="text-2xl font-bold text-primary_color">0/0</span>
        )}
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
  ];

  const calculateMemorialDay = (year) => {
    for (let day = 31; day >= 25; day--) {
      const date = new Date(year, 4, day);
      if (date.getDay() === 1) return format(date, "yyyy-MM-dd");
    }
  };

  const calculateLaborDay = (year) => {
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
    <div className="h-full flex flex-col p-1 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary_color">
        Upcoming Holidays
      </h2>
      <ul className="overflow-auto flex-grow space-y-4 h-72">
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
  const [fetchTasks, { data: fetchedTasks, isLoading, error: fetchError }] =
    useFetchTasksMutation();
  const [createTask] = useCreateTaskMutation();
  const access_token = localStorage.getItem("access_token");
  const newTask = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTasks(access_token);
        if (response?.data?.tasks) {
          setTasks(response.data.tasks);
        } else {
          console.warn("No tasks found in response");
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
      }
    };

    fetchData();
  }, [fetchTasks, access_token]);

  const addTask = async (e) => {
    e.preventDefault();

    if (newTask.current.value) {
      try {
        const data = {
          task_description: newTask.current.value,
        };

        const response = await createTask({
          data,
          access_token,
        });

        if (response.data) {
          console.log("Task created successfully:", response.data);
          setTasks((prevTasks) => [...prevTasks, response.data.task]);
          newTask.current.value = "";
        } else {
          console.error("Failed to create task:", response.error);
        }
      } catch (err) {
        console.error("Failed to add task:", err);
      }
    }
  };

  const toggleTask = (task_description) => {
    setTasks(
      tasks.map((task) =>
        task.task_description === task_description
          ? {
              ...task,
              task_status:
                task.task_status === "COMPLETED" ? "PENDING" : "COMPLETED",
            }
          : task
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
          ref={newTask}
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
        {isLoading ? (
          <li>Loading...</li>
        ) : fetchError ? (
          <li>Error fetching tasks: {fetchError.message}</li>
        ) : tasks.length === 0 ? (
          <li>No tasks available</li>
        ) : (
          tasks.map((task) => {
            if (!task) {
              console.error("Encountered undefined task");
              return null;
            }
            return (
              <li
                key={task.task_description}
                className="flex items-center p-3 bg-white rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <input
                  type="checkbox"
                  checked={task.task_status === "COMPLETED"}
                  onChange={() => toggleTask(task.task_description)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400 mr-3 cursor-pointer"
                />
                <span
                  className={`${
                    task.task_status === "COMPLETED"
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  } flex-grow text-lg`}
                >
                  {task.task_description}
                </span>
              </li>
            );
          })
        )}
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
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const access_token = localStorage.getItem("access_token");

  const currentDayOfMonth = new Date().getDate();

  const totalDays =
    attendanceData && attendanceData.total_days > 0
      ? attendanceData.total_days
      : currentDayOfMonth;

  const [fetchAttendance, { error, isLoading }] = useFetchAttendanceMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAttendance(access_token);
        const { present_days } = response.data;

        const calculatedPercentage =
          totalDays > 0 ? (present_days / totalDays) * 100 : 0;
        setAttendancePercentage(calculatedPercentage.toFixed(2));
        setAttendanceData({ present_days, totalDays });
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      }
    };

    fetchData();
  }, [fetchAttendance, access_token]);

  const attendedDays = attendanceData ? attendanceData.present_days : 0;

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full p-4 my-4 border-2 rounded-lg border-elight_primary">
      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow-md p-4 h-auto md:h-96">
        <PerformanceOverview />
      </div>

      {/* Attendance Overview */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row items-center justify-between h-full">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <AttendanceChart
              percentage={attendancePercentage}
              attendanceData={attendanceData}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-2">
            <h2 className="text-2xl font-bold text-primary_color">
              Attendance Overview
            </h2>
            <p className="text-4xl font-bold text-light_primary">
              {attendancePercentage}%
            </p>
            <p className="text-para">Total Days: {totalDays}</p>
            <p className="text-para">Days Attended: {attendedDays}</p>
            <p className="text-para">Days Missed: {totalDays - attendedDays}</p>
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

      {/* Upcoming Holidays */}
      <div className="bg-white rounded-lg shadow-md p-4 h-auto md:h-64">
        <UpcomingHolidays />
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-lg shadow-md p-4 h-auto md:h-96">
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
