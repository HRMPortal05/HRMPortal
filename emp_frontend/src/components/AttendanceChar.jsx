// import { PieChart, Pie, Cell } from "recharts";

// const AttendanceChart = ({ percentage }) => {
//   const data = [{ value: percentage }, { value: 100 - percentage }];

//   return (
//     <div className="relative w-full h-full flex items-center justify-start">
//       <PieChart width={200} height={200}>
//         <Pie
//           data={data}
//           cx={100}
//           cy={100}
//           innerRadius={60}
//           outerRadius={80}
//           fill="#7676DC"
//           dataKey="value"
//           startAngle={90}
//           endAngle={-250}
//         >
//           <Cell key="cell-0" fill="#2196F3" />
//           <Cell key="cell-1" fill="#E0E0E0" />
//         </Pie>
//       </PieChart>
//       <div className="absolute inset-0 flex flex-col justify-center ml-16">
//         <span className="text-2xl font-bold">12/23</span>
//       </div>
//     </div>
//   );
// };

// export default AttendanceChart;

import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

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
          endAngle={-250}
        >
          <Cell key="cell-0" fill="#2196F3" />
          <Cell key="cell-1" fill="#E0E0E0" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">12/23</span>
      </div>
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
      <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
          Add
        </button>
      </form>
      <ul className="overflow-auto flex-grow">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? "line-through" : ""}>
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
      <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>
      <div className="overflow-auto flex-grow">
        {performanceData.map(({ metric, value }) => (
          <div key={metric} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{metric}</span>
              <span>{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded">
              <div
                className="bg-blue-600 rounded h-2"
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UpcomingHolidays = () => {
  const holidays = [
    { date: "2024-05-27", name: "Memorial Day" },
    { date: "2024-07-04", name: "Independence Day" },
    { date: "2024-09-02", name: "Labor Day" },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Upcoming Holidays</h2>
      <ul className="overflow-auto flex-grow">
        {holidays.map(({ date, name }) => (
          <li key={date} className="mb-2">
            <span className="font-semibold">{name}</span>
            <br />
            <span className="text-sm text-gray-600">{date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const attendancePercentage = 52;
  const totalDays = 23;
  const attendedDays = 12;

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-100 min-h-screen w-full p-4 my-4">
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
              <h2 className="text-2xl font-bold">Attendance Overview</h2>
              <p className="text-4xl font-bold text-blue-600">
                {attendancePercentage}%
              </p>
              <p>Total Days: {totalDays}</p>
              <p>Days Attended: {attendedDays}</p>
              <p>Days Missed: {totalDays - attendedDays}</p>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded ${
                    attendancePercentage >= 75
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
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
        {/* Top Section (Short) - Upcoming Holidays */}
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
