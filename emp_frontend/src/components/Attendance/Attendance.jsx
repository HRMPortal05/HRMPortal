import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ROWS_PER_PAGE = 5;

const AttendanceRow = ({ empId, name, status, onStatusChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{empId}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>
          <select
            value={status}
            onChange={(e) => onStatusChange(empId, e.target.value)}
            className="form-select block w-24 text-sm rounded-md border-gray-300 shadow-sm focus:border-form_base focus:ring focus:ring-form_base focus:ring-opacity-50"
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="LEAVE">Leave</option>
          </select>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="details">
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                      minWidth: "150px",
                      fontWeight: "600",
                    }}
                  >
                    Additional Info:
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    No additional information available
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    "2024-09-25": [
      { empId: "E001", name: "John Doe", status: "PRESENT" },
      { empId: "E002", name: "Jane Smith", status: "ABSENT" },
      { empId: "E003", name: "Bob Johnson", status: "PRESENT" },
      { empId: "E004", name: "Alice Brown", status: "PRESENT" },
      { empId: "E005", name: "Charlie Davis", status: "PRESENT" },
      { empId: "E006", name: "Eva Wilson", status: "PRESENT" },
      { empId: "E007", name: "Frank Miller", status: "PRESENT" },
      { empId: "E008", name: "Grace Lee", status: "PRESENT" },
    ],
  });
  const [currentPage, setCurrentPage] = useState(0);

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
    setCurrentPage(0); // Reset to first page when changing date

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
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(
        Math.ceil(currentAttendance.length / ROWS_PER_PAGE) - 1,
        prev + 1
      )
    );
  };

  const dateKey = currentDate.toISOString().split("T")[0];
  const currentAttendance = attendanceData[dateKey] || [];
  const paginatedAttendance = currentAttendance.slice(
    currentPage * ROWS_PER_PAGE,
    (currentPage + 1) * ROWS_PER_PAGE
  );

  return (
    <div className="p-6 font-roboto h-fit">
      <h1 className="text-3xl font-bold mb-6 text-primary_color">Attendance</h1>

      <div className="flex justify-between items-center mb-6">
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
        <div className="flex justify-center w-full sm:w-auto">
          {/* Previous Button */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`border border-primary_color text-primary_color h-[35px] w-[43px] rounded-md mr-1 ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &lt;
          </button>

          {/* Display current page number */}
          <span className="border border-primary_color text-primary_color h-[35px] w-[43px] flex items-center justify-center rounded-md mr-1">
            {currentPage + 1}
          </span>

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={
              (currentPage + 1) * ROWS_PER_PAGE >= currentAttendance.length
            }
            className={`border border-primary_color text-primary_color h-[35px] w-[43px] rounded-md ${
              (currentPage + 1) * ROWS_PER_PAGE >= currentAttendance.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            &gt;
          </button>
        </div>
      </div>

      <TableContainer
        sx={{ boxShadow: "none" }}
        className="mt-7"
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#00008af0", color: "white" }}>
              <TableCell />
              <TableCell sx={{ color: "white" }}>Employee ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAttendance.map((row) => (
              <AttendanceRow
                key={row.empId}
                empId={row.empId}
                name={row.name}
                status={row.status}
                onStatusChange={handleStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-end mt-4">
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

export default Attendance;
