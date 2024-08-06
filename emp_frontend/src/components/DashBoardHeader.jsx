// import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
// import DashboardBox from "./DashboardBox";
import { Outlet } from "react-router-dom";
import { useFetchprofileMutation } from "../services/UserAuthApi";
import { storeUserProfile } from "../services/LocalStorageServices";

const DashboardHeader = () => {
  const [fetchprofile] = useFetchprofileMutation();

  const username = localStorage.getItem("username");

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchprofile(access_token);

        if (response.error) {
          console.log(response.error);
          // if (response.error.data.errors.non_field_errors) {
          //   enqueueSnackbar(response.error.data.errors.non_field_errors[0], {
          //     variant: "error",
          //     autoHideDuration: 3000,
          //   });
          // } else if (response.error.data.errors.detail) {
          //   enqueueSnackbar(response.error.data.errors.detail, {
          //     variant: "error",
          //     autoHideDuration: 3000,
          //   });
          // } else {
          //   setServerError(response.error.data.errors);
          // }
        }

        if (response.data) {
          storeUserProfile(response.data);
        }
      } catch (error) {
        console.error("Dashboard Profile fetch error:", error);
      }
    };

    fetchData();
  }, [access_token]);

  return (
    <>
      <div className="hidden mt-6 ml-3 md:flex lg:flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <div className="md:flex lg:flex flex-col">
          <h1 className="text-3xl font-bold">
            Hello {username}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="text-gray-600">You can manage your things from here</p>
        </div>
        <div className="md:flex lg:flex items-center">
          <AiOutlineUser className="text-2xl mr-2" />
          <h1 className="text-lg font-medium">Welcome</h1>
        </div>
      </div>
      <Outlet />
    </>
  );
};

DashboardHeader.propTypes = {
  username: PropTypes.string.isRequired,
};

export default DashboardHeader;
