import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CreateNewLeave from "./CreateNewLeave";

import StyledDatePicker from "../materialUI/StyledDatePicker";
import {
  useCreateleaveMutation,
  useFetchleaveMutation,
} from "../services/LeaveManagement";

import { SnackbarProvider, useSnackbar } from "notistack";
import { IconButton } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import dayjs from "dayjs";

const Row = (props) => {
  const { row } = props;
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
        <TableCell>{row.is_admin ? "Admin" : "Employee"}</TableCell>
        <TableCell>{row.leave_type}</TableCell>
        <TableCell>{row.from_date}</TableCell>
        <TableCell>{row.to_date}</TableCell>
        <TableCell>
          <span
            style={{
              background:
                row.status === "APPROVED"
                  ? "#0094E7"
                  : row.status === "PENDING"
                  ? "#FF9600"
                  : row.status === "REJECTED"
                  ? "#FF0743"
                  : "transparent",
              padding: "9px 20px",
              fontSize: ".8rem",
              borderRadius: "20px",
              color: "white",
            }}
          >
            {row.status}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <div className="p-4"> */}
            <Table size="small" aria-label="details">
              <TableBody>
                <TableRow>
                  <div className="felx justify-start">
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        borderBottom: "none",
                        minWidth: "150px",
                        fontWeight: "600",
                      }}
                    >
                      Reason :
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      {row.reason ? row.reason : "None"}
                    </TableCell>
                  </div>
                </TableRow>
                <TableRow>
                  <div className="felx justify-start">
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        borderBottom: "none",
                        minWidth: "150px",
                        fontWeight: "600",
                      }}
                    >
                      Pending Work :
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      {row.pending_work_of_employee
                        ? row.pending_work_of_employee
                        : "None"}
                    </TableCell>
                  </div>
                </TableRow>
              </TableBody>
            </Table>
            {/* </div> */}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

// Main Component

const ApplyForLeave = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reset, setReset] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const select = useRef(null);

  const [createleave] = useCreateleaveMutation();
  const [fetchleave] = useFetchleaveMutation();
  const [row, setRow] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [serverError, setServerError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const access_token = localStorage.getItem("access_token");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearch = () => {
    // if (!fromDate || !toDate) {
    //   enqueueSnackbar("Please select both From Date and To Date", {
    //     variant: "warning",
    //     autoHideDuration: 3000,
    //   });
    //   return;
    // }

    const formattedFromDate = dayjs(fromDate).startOf("day");
    const formattedToDate = dayjs(toDate).endOf("day");
    const selectedStatus = select.current.value;

    const filtered = filteredData.filter((item) => {
      const itemFromDate = dayjs(item.from_date).startOf("day");
      const itemToDate = dayjs(item.to_date).endOf("day");

      const dateOverlaps =
        (itemFromDate.isSame(formattedFromDate) ||
          itemFromDate.isAfter(formattedFromDate)) &&
        (itemToDate.isSame(formattedToDate) ||
          itemToDate.isBefore(formattedToDate));

      const statusMatches =
        selectedStatus === "Select" || item.status === selectedStatus;

      return dateOverlaps && statusMatches;
    });

    setRow(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchleave(access_token);

        if (response.error) {
          if (response.error.data.errors.non_field_errors) {
            enqueueSnackbar(response.error.data.errors.non_field_errors[0], {
              variant: "error",
              autoHideDuration: 3000,
            });
          } else if (response.error.data.errors.detail) {
            enqueueSnackbar(response.error.data.errors.detail, {
              variant: "error",
              autoHideDuration: 3000,
            });
          } else {
            setServerError(response.error.data.errors);
          }
        }

        if (response.data) {
          setRow(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error("Leave fetch error:", error);
      }
    };

    fetchData();
  }, [access_token, setRow, reset]);

  const handleSubmit = async ({
    event,
    email,
    leave_type,
    fromDate,
    toDate,
    reason,
    pending_work_of_employee,
  }) => {
    event.preventDefault();

    const data = {
      email: email.current.value,
      leave_type: leave_type.current.value,
      from_date: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
      to_date: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
      reason: reason.current.value,
      pending_work_of_employee: pending_work_of_employee.current.value,
    };

    try {
      const response = await createleave({ data, access_token });

      if (response.error) {
        if (response.error.data.errors.non_field_errors) {
          console.log(response.error.data.errors.non_field_errors);
          enqueueSnackbar(response.error.data.errors.non_field_errors[0], {
            variant: "error",
            autoHideDuration: 3000,
          });
        } else {
          setServerError(response.error.data.errors);
        }
      }
      if (response.data) {
        enqueueSnackbar(response.data.msg, {
          variant: "success",
          autoHideDuration: 3000,
        });
        handleCloseModal();
      }
    } catch (error) {
      console.error("Create Leave error:", error);
    }
  };

  return (
    <div className="md:ml-5 my-10 roboto-regular max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl overflow-hidden">
      <div className="flex flex-col items-center w-full mb-3">
        <div className="flex justify-center md:justify-end lg:justify-end w-full mb-6">
          <button
            onClick={handleOpenModal}
            className="bg-primary_color text-white h-[35px] px-4 sm:px-7 rounded-md sm:text-base"
          >
            Create New
          </button>
        </div>
        {row && (
          <div className="flex flex-col sm:flex-row justify-between items-center sm:text-base w-full space-y-4 sm:space-y-0 sm:space-x-4">
            <StyledDatePicker
              label={"From Date"}
              className="w-full sm:w-auto mb-4 sm:mb-0"
              value={fromDate}
              onChange={(newValue) => {
                console.log("New From Date:", newValue);
                setFromDate(newValue);
              }}
            />

            <StyledDatePicker
              label={"To Date"}
              className="w-full sm:w-auto mb-4 sm:mb-0"
              value={toDate}
              onChange={(newValue) => {
                console.log("New To Date:", newValue);
                setToDate(newValue);
              }}
            />
            <select
              className="border border-primary_color text-[#01008A] rounded-md px-4 h-[35px] w-[180px] mb-4 sm:mb-0"
              ref={select}
            >
              <option>Select</option>
              <option>APPROVED</option>
              <option>PENDING</option>
              <option>REJECTED</option>
            </select>
            <button
              className="bg-primary_color text-white h-[35px] px-6 sm:px-10 rounded-md w-[180px] mb-4 sm:mb-0"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="border border-primary_color bg-[#F0F0FF] text-primary_color h-[35px] w-[180px] rounded-md mb-4 sm:mb-0"
              onClick={() => setReset(!reset)}
            >
              Reset
            </button>
            <div className="flex justify-center w-full sm:w-auto">
              <button className="border border-primary_color text-primary_color h-[35px] w-[43px] rounded-md mr-1">
                &lt;
              </button>
              <button className="bg-primary_color text-white h-[35px] w-[43px] rounded-md mr-1">
                1
              </button>
              <button className="border border-primary_color text-primary_color h-[35px] w-[43px] rounded-md">
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
      {row && (
        <div className="mt-5 max-w-[358px] md:max-w-screen-md lg:max-w-screen-xl overflow-x-hidden">
          <TableContainer
            component={Paper}
            className="overflow-x-auto mt-4 custom-scrollbar"
          >
            <Table className="min-w-full">
              <TableHead className="bg-primary_color">
                <TableRow>
                  <TableCell style={{ width: "50px" }}></TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.1rem" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.1rem" }}>
                    Leave Type
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.1rem" }}>
                    From Date
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.1rem" }}>
                    To Date
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "1.1rem",
                      paddingLeft: "35px",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((rowData, index) => (
                  <Row key={index} row={rowData} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
          <SnackbarProvider maxSnack={3}>
            <CreateNewLeave
              handleClose={handleCloseModal}
              handleOpen={handleCloseModal}
              handleSubmit={handleSubmit}
              serverError={serverError}
            />
          </SnackbarProvider>
        </div>
      )}
    </div>
  );
};

export default ApplyForLeave;
