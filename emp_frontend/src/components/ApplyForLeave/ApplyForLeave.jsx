import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CreateNewLeave from "../ApplyForLeave/CreateNewLeave";

import StyledDatePicker from "../../materialUI/StyledDatePicker";
import {
  useCreateleaveMutation,
  useFetchAdminleaveMutation,
  useFetchleaveMutation,
  useUpdateLeaveStatusMutation,
} from "../../services/LeaveManagement";

import { SnackbarProvider, useSnackbar } from "notistack";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import Row from "./Row";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Skeleton } from "@mui/material";

const LoadingTableRow = () => (
  <TableRow>
    <TableCell style={{ width: "50px" }}>
      <Skeleton variant="circular" width={20} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={150} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={120} height={36} />
    </TableCell>
  </TableRow>
);

const ROWS_PER_PAGE = 7;

const ApplyForLeave = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reset, setReset] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const select = useRef(null);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState({});

  const [createleave] = useCreateleaveMutation();
  const [fetchleave] = useFetchleaveMutation();
  const [fetchAdminleave] = useFetchAdminleaveMutation();
  const [updateLeaveStatus] = useUpdateLeaveStatusMutation();

  const [row, setRow] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [serverError, setServerError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const [currentPage, setCurrentPage] = useState(0);

  const [statuses, setStatuses] = useState({});

  const access_token = localStorage.getItem("access_token");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(token);
  const [isAdmin, setIsAdmin] = useState(false);

  if (decodedToken.is_admin && !isAdmin) {
    setIsAdmin(true);
  } else if (!decodedToken.is_admin && isAdmin) {
    setIsAdmin(false);
  }

  const handleSearch = () => {
    const selectedStatus = select.current.value;

    const filtered = filteredData.filter((item) => {
      let dateOverlaps = true;

      if (fromDate && toDate) {
        const formattedFromDate = dayjs(fromDate).startOf("day");
        const formattedToDate = dayjs(toDate).endOf("day");

        const itemFromDate = dayjs(item.from_date).startOf("day");
        const itemToDate = dayjs(item.to_date).endOf("day");

        dateOverlaps =
          (itemFromDate.isSame(formattedFromDate) ||
            itemFromDate.isAfter(formattedFromDate)) &&
          (itemToDate.isSame(formattedToDate) ||
            itemToDate.isBefore(formattedToDate));
      }

      const statusMatches =
        selectedStatus === "Select" || item.status === selectedStatus;

      return dateOverlaps && statusMatches;
    });

    setRow(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;

        if (isAdmin) {
          response = await fetchAdminleave(access_token);
        } else {
          response = await fetchleave(access_token);
        }

        if (response.error) {
          const errors = response.error.data?.errors || {};
          if (errors.non_field_errors) {
            enqueueSnackbar(errors.non_field_errors[0], {
              variant: "error",
              autoHideDuration: 3000,
            });
          } else if (errors.detail) {
            enqueueSnackbar(errors.detail, {
              variant: "error",
              autoHideDuration: 3000,
            });
          } else {
            setServerError(errors);
          }
        }

        if (response.data) {
          setRow(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        enqueueSnackbar("An error occurred while fetching data.", {
          variant: "error",
          autoHideDuration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    setFromDate(null);
    setToDate(null);
    select.current.value = "Select";
  }, [access_token, isAdmin, reset]);

  const handleNextPage = () => {
    if ((currentPage + 1) * ROWS_PER_PAGE < row.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const rowsToDisplay = row.slice(
    currentPage * ROWS_PER_PAGE,
    (currentPage + 1) * ROWS_PER_PAGE
  );

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
    setIsSubmitting(true);

    const data = {
      email: email,
      leave_type,
      from_date: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
      to_date: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
      reason,
      pending_work_of_employee,
    };

    try {
      const response = await createleave({ data, access_token });

      if (response.error) {
        if (response.error.data.errors.non_field_errors) {
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
        // Refresh the data
        setReset(!reset);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred while submitting the leave request.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelect = async (id, newStatus) => {
    try {
      setIsStatusUpdating((prev) => ({ ...prev, [id]: true }));
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: newStatus,
      }));

      const response = await updateLeaveStatus({
        status: newStatus,
        leave_id: id,
        access_token,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to update status");
      }

      enqueueSnackbar("Status updated successfully", { variant: "success" });
      setRow(
        row.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: row.find((item) => item.id === id)?.status,
      }));

      enqueueSnackbar(error.message || "Failed to update status", {
        variant: "error",
      });
    } finally {
      setIsStatusUpdating((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="md:ml-5 my-10 roboto-regular max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl overflow-hidden">
      <div className="flex flex-col items-center w-full mb-3">
        <div className="flex justify-center md:justify-end lg:justify-between w-full mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary_color flex items-center">
            <FaRegCalendarAlt className="mr-2 text-form_base" size={28} />
            Apply For Leave
          </h2>
          <button
            onClick={handleOpenModal}
            disabled={isLoading}
            className="bg-primary_color text-white h-[50px] md:h-[35px] lg:h-[35px] px-4 sm:px-7 rounded-md sm:text-base"
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
                setFromDate(newValue);
              }}
              disabled={isLoading}
            />

            <StyledDatePicker
              label={"To Date"}
              className="w-full sm:w-auto mb-4 sm:mb-0"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
              disabled={isLoading}
            />
            <select
              className="border border-primary_color text-[#01008A] rounded-md px-4 h-[35px] w-[180px] mb-4 sm:mb-0"
              ref={select}
              disabled={isLoading}
            >
              <option>Select</option>
              <option>APPROVED</option>
              <option>PENDING</option>
              <option>REJECTED</option>
            </select>
            <button
              className="bg-primary_color text-white h-[35px] px-6 sm:px-10 rounded-md w-[180px] mb-4 sm:mb-0"
              onClick={handleSearch}
              disabled={isLoading}
            >
              Search
            </button>
            <button
              className="border border-primary_color bg-[#F0F0FF] text-primary_color h-[35px] w-[180px] rounded-md mb-4 sm:mb-0"
              onClick={() => setReset(!reset)}
              disabled={isLoading}
            >
              Reset
            </button>
            <div className="flex justify-center w-full sm:w-auto">
              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0 || isLoading}
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
                  (currentPage + 1) * ROWS_PER_PAGE >= row.length || isLoading
                }
                className={`border border-primary_color text-primary_color h-[35px] w-[43px] rounded-md ${
                  (currentPage + 1) * ROWS_PER_PAGE >= row.length
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
      {row && (
        <div className="mt-5 max-w-[320px] md:max-w-screen-md lg:max-w-screen-xl overflow-x-hidden">
          <TableContainer
            component={Paper}
            className="overflow-x-auto mt-4 custom-scrollbar"
          >
            <Table className="min-w-full">
              <TableHead className="bg-primary_color">
                <TableRow>
                  <TableCell style={{ width: "50px" }}></TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.1rem" }}>
                    Employee
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
                {isLoading ? (
                  // Show loading skeleton rows while data is being fetched
                  Array.from(new Array(ROWS_PER_PAGE)).map((_, index) => (
                    <LoadingTableRow key={index} />
                  ))
                ) : rowsToDisplay.length > 0 ? (
                  rowsToDisplay.map((rowData) => (
                    <Row
                      key={rowData.ID}
                      row={rowData}
                      is_admin={isAdmin}
                      handleSelect={handleSelect}
                      selectedStatus={statuses[rowData.ID] || rowData.status}
                      isStatusUpdating={isStatusUpdating[rowData.ID]}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="flex justify-center items-center h-96">
                        <p className="text-gray-500 text-lg">No data found!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
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
