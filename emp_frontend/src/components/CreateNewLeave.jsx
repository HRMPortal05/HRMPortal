import React, { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import StyledDateForLeave from "../materialUI/StyledDateForLeave";

function CreateNewLeave({ handleClose, handleSubmit, serverError }) {
  const access_token = localStorage.getItem("access_token");

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const email = useRef();
  const leave_type = useRef();
  const reason = useRef();
  const pending_work_of_employee = useRef();

  return (
    <div className="bg-white p-3 md:p-8 lg:p-8 mb-4 rounded-lg shadow-xl w-full max-w-lg mx-3 mt-12 sm:mt-24">
      <h2 className="text-2xl font-semibold mb-6 text-primary_color text-center">
        Create New Leave
      </h2>
      {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
      <div className="mb-4">
        <label htmlFor="email" className="block roboto-regular text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          ref={email}
          className={`w-full py-2 mt-2 border border-[#aaa] rounded-md focus:outline-none focus:ring-1 ${
            serverError
              ? "border-red-500 focus:ring-red-600"
              : "focus:ring-blue-600"
          }`}
        />
        {serverError && (
          <p className="text-red-500 text-sm mt-1">{serverError.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="leave_type"
          className="block roboto-regular text-gray-700"
        >
          Leave Type
        </label>
        <input
          type="text"
          id="leave_type"
          ref={leave_type}
          className={`w-full px-4 py-2 mt-2 border border-[#aaa] rounded-md focus:outline-none focus:ring-1 ${
            serverError
              ? "border-red-500 focus:ring-red-600"
              : "focus:ring-blue-600"
          }`}
        />
        {serverError && (
          <p className="text-red-500 text-sm mt-1">{serverError.leave_type}</p>
        )}
      </div>
      <div className="flex justify-between w-full mb-5">
        <StyledDateForLeave
          label="From Date"
          onChange={(newValue) => setFromDate(newValue)}
          error={serverError && !!serverError.from_date}
          helperText={serverError && serverError.from_date}
          className="w-full sm:w-auto mb-4 sm:mb-0"
          format="YYYY-MM-DD"
        />
        <StyledDateForLeave
          label="To Date"
          onChange={(newValue) => setToDate(newValue)}
          error={serverError && !!serverError.to_date}
          helperText={serverError && serverError.to_date}
          className="w-full sm:w-auto mb-4 sm:mb-0"
          format="YYYY-MM-DD"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reason" className="block roboto-regular text-gray-700">
          Reason
        </label>
        <input
          type="text"
          id="reason"
          ref={reason}
          className={`w-full px-4 py-2 mt-2 border border-[#aaa] rounded-md focus:outline-none focus:ring-1`}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="pending_work_of_employee"
          className="block roboto-regular text-gray-700"
        >
          Pending Work
        </label>
        <input
          type="text"
          id="pending_work_of_employee"
          ref={pending_work_of_employee}
          className={`w-full px-4 py-2 mt-2 border border-[#aaa] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600`}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200 ease-in-out"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={(event) =>
            handleSubmit({
              event,
              email,
              leave_type,
              fromDate,
              toDate,
              reason,
              pending_work_of_employee,
            })
          }
          className="px-4 py-2 bg-primary_color text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </div>
      {/* </form> */}
    </div>
  );
}

export default CreateNewLeave;
