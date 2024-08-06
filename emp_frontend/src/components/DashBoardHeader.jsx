// import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiOutlineUser } from "react-icons/ai";
// import DashboardBox from "./DashboardBox";
import { Outlet } from "react-router-dom";

const DashboardHeader = () => {
  // const [currentUsername, setCurrentUsername] = useState(username);

  // useEffect(() => {
  //   setCurrentUsername(username);
  // }, [username]);

  return (
    <>
      <div className="hidden mt-6 ml-3 md:flex lg:flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <div className="md:flex lg:flex flex-col">
          <h1 className="text-3xl font-bold">
            Hello
            {"Tanishq"}
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
