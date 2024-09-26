import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const AttendanceRow = ({ empId, name, status, onStatusChange }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6 text-sm text-para">{empId}</td>
      <td className="py-4 px-6 text-sm text-primary_color font-semibold">
        {name}
      </td>
      <td className="py-4 px-6 text-sm">
        <select
          value={status}
          onChange={(e) => onStatusChange(empId, e.target.value)}
          className="form-select block w-24 text-sm rounded-md border-gray-300 shadow-sm focus:border-form_base focus:ring focus:ring-form_base focus:ring-opacity-50"
        >
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
          <option value="LEAVE">Leave</option>
        </select>
      </td>
    </tr>
  );
};

AttendanceRow.propTypes = {
  empId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["PRESENT", "ABSENT", "LEAVE"]).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

const AttendanceTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    "2024-09-25": [
      { empId: "E001", name: "John Doe", status: "PRESENT" },
      { empId: "E002", name: "Jane Smith", status: "ABSENT" },
      { empId: "E003", name: "Bob Johnson", status: "PRESENT" },
      { empId: "E004", name: "Bob Johnson", status: "PRESENT" },
      { empId: "E005", name: "Bob Johnson", status: "PRESENT" },
      { empId: "E006", name: "Bob Johnson", status: "PRESENT" },
      { empId: "E007", name: "Bob Johnson", status: "PRESENT" },
      { empId: "E008", name: "Bob Johnson", status: "PRESENT" },
    ],
  });

  const handleStatusChange = (empId, newStatus) => {
    const dateKey = currentDate.toISOString().split("T")[0];
    setAttendanceData((prevData) => ({
      ...prevData,
      [dateKey]: prevData[dateKey].map((emp) =>
        emp.empId === empId ? { ...emp, status: newStatus } : emp
      ),
    }));
  };

  const handleDateChange = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment);
    setCurrentDate(newDate);

    // If no data for the new date, initialize it
    const dateKey = newDate.toISOString().split("T")[0];
    if (!attendanceData[dateKey]) {
      setAttendanceData((prevData) => ({
        ...prevData,
        [dateKey]: [
          { empId: "E001", name: "John Doe", status: "PRESENT" },
          { empId: "E002", name: "Jane Smith", status: "PRESENT" },
          { empId: "E003", name: "Bob Johnson", status: "PRESENT" },
        ],
      }));
    }
  };

  const handleSubmit = () => {
    const dateKey = currentDate.toISOString().split("T")[0];
    console.log(
      `Submitting attendance data for ${dateKey}:`,
      attendanceData[dateKey]
    );
    // Add your submission logic here
  };

  const dateKey = currentDate.toISOString().split("T")[0];
  const currentAttendance = attendanceData[dateKey] || [];

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-primary_color">Attendance</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleDateChange(-1)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-primary_color" />
          </button>
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <Calendar className="w-5 h-5 text-primary_color mr-2" />
            <span className="text-primary_color font-semibold">
              {currentDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <button
            onClick={() => handleDateChange(1)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            <ChevronRight className="w-5 h-5 text-primary_color" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-para uppercase tracking-wider">
                Employee ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-para uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-para uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentAttendance.map((row) => (
              <AttendanceRow
                key={row.empId}
                empId={row.empId}
                name={row.name}
                status={row.status}
                onStatusChange={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-form_base hover:bg-primary_color text-white font-bold py-2 px-6 rounded-md transition duration-300 shadow-md"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
