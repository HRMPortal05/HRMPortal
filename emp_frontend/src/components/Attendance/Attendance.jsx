import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { FaClipboardCheck } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import Row from "./Row";
import {
  useSubmitAttendanceMutation,
  useFetchDateAttendanceQuery,
  useSubmitDateAttendanceMutation,
  useFetchTodayAttendanceQuery,
} from "../../services/Attendance";
import { useSnackbar } from "notistack";

const Attendance = () => {
  const { enqueueSnackbar } = useSnackbar();

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getNextValidDate = (date, increment) => {
    const newDate = new Date(date);
    do {
      newDate.setDate(newDate.getDate() + increment);
    } while (isWeekend(newDate));
    return newDate;
  };

  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return isWeekend(today) ? getNextValidDate(today, -1) : today;
  });

  const [attendanceData, setAttendanceData] = useState([]);
  const [modifiedAttendance, setModifiedAttendance] = useState([]);

  const access_token = localStorage.getItem("access_token");

  const [submitAttendance, { isLoading: isSubmittingAttendance }] =
    useSubmitAttendanceMutation();
  const [submitDateAttendance, { isLoading: isSubmittingDateAttendance }] =
    useSubmitDateAttendanceMutation();
  const { data: fetchedDateAttendance, refetch: refetchDateAttendance } =
    useFetchDateAttendanceQuery(
      {
        access_token,
        date: currentDate.toISOString().split("T")[0],
      },
      { skip: isToday(currentDate) }
    );
  const { data: fetchedTodayAttendance, refetch: refetchTodayAttendance } =
    useFetchTodayAttendanceQuery(
      { access_token },
      { skip: !isToday(currentDate) }
    );

  useEffect(() => {
    if (isToday(currentDate)) {
      refetchTodayAttendance();
    } else {
      refetchDateAttendance();
    }
  }, [currentDate]);

  useEffect(() => {
    if (isToday(currentDate) && fetchedTodayAttendance) {
      setAttendanceData(fetchedTodayAttendance.attendance);
    } else if (!isToday(currentDate) && fetchedDateAttendance) {
      setAttendanceData(
        fetchedDateAttendance.map((record) => ({
          employee: record.working_emailid,
          status: record.is_present
            ? "PRESENT"
            : record.is_leave
            ? "LEAVE"
            : "ABSENT",
          name: `${record.first_name} ${record.last_name}`,
          is_recorded: true,
        }))
      );
    }
  }, [fetchedTodayAttendance, fetchedDateAttendance, currentDate]);

  const handleStatusChange = (empId, newStatus) => {
    setAttendanceData((prevAttendanceData) =>
      prevAttendanceData.map((record) =>
        record.employee === empId ? { ...record, status: newStatus } : record
      )
    );

    setModifiedAttendance((prev) => {
      if (!prev.includes(empId)) {
        return [...prev, empId];
      }
      return prev;
    });
  };

  const handleDateChange = (increment) => {
    setCurrentDate(getNextValidDate(currentDate, increment));
  };

  const handleDateSelect = (date) => {
    if (!date) return;

    if (isWeekend(date)) {
      enqueueSnackbar("Weekend dates cannot be selected", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }

    if (date > new Date()) {
      enqueueSnackbar("Future dates cannot be selected", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }

    setCurrentDate(date);
  };

  const handleSubmit = async () => {
    try {
      const submissionDate = currentDate.toISOString().split("T")[0];

      const attendanceToSubmit = attendanceData.map(({ employee, status }) => ({
        employee,
        status,
        is_leave: status === "LEAVE",
        created_date: submissionDate,
      }));

      if (isToday(currentDate)) {
        await submitAttendance({
          access_token,
          attendanceData: attendanceToSubmit,
        }).unwrap();
        refetchTodayAttendance();
      } else {
        await submitDateAttendance({
          access_token,
          attendanceData: attendanceToSubmit,
          date: submissionDate,
        }).unwrap();
        refetchDateAttendance();
      }

      setModifiedAttendance([]);
      enqueueSnackbar("Attendance submitted successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      enqueueSnackbar("Error submitting attendance", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const isLoading = isSubmittingAttendance || isSubmittingDateAttendance;
  const isCurrentDateToday = isToday(currentDate);

  const filterWeekends = (date) => {
    return !isWeekend(date) && date <= new Date();
  };

  const CustomDatePickerInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex items-center bg-gray-100 rounded-md px-3 py-2 hover:bg-gray-200 transition-colors duration-200"
      onClick={onClick}
      ref={ref}
    >
      <Calendar className="w-5 h-5 text-primary_color mr-2" />
      <span className="text-primary_color font-semibold">{value}</span>
    </button>
  ));

  return (
    <div className="font-roboto max-w-fit md:max-w-full lg:max-w-full mt-5 p-0 md:p-6 lg:p-6 overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-bold text-primary_color flex items-center mb-7">
        <FaClipboardCheck className="mr-2 text-form_base" size={28} />
        Attendance
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleDateChange(-1)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-primary_color" />
          </button>

          <DatePicker
            selected={currentDate}
            onChange={handleDateSelect}
            dateFormat="MMMM d, yyyy"
            filterDate={filterWeekends}
            customInput={<CustomDatePickerInput />}
            maxDate={new Date()}
          />

          <button
            onClick={() => handleDateChange(1)}
            disabled={isCurrentDateToday}
            className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 ${
              isCurrentDateToday ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronRight className="w-5 h-5 text-primary_color" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-w-[333px] md:max-w-screen-md lg:max-w-screen-xl">
        <TableContainer
          sx={{ boxShadow: "none" }}
          className="mt-7"
          component={Paper}
        >
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow sx={{ background: "#00008af0", color: "white" }}>
                <TableCell />
                <TableCell sx={{ color: "white" }}>Employee Email</TableCell>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((employee) => (
                <Row
                  key={employee.employee}
                  empId={employee.employee}
                  name={employee.name}
                  status={employee.status}
                  onStatusChange={handleStatusChange}
                  isEditable={true}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-form_base hover:bg-primary_color text-white font-bold py-2 px-6 mr-0 md:mr-10 lg:mr-10 rounded-md transition duration-300 shadow-md ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } flex items-center`}
        >
          {isLoading && (
            <CircularProgress
              size={20}
              color="inherit"
              style={{ marginRight: 8 }}
            />
          )}
          {isLoading ? "Submitting..." : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
};

export default Attendance;
