import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../services/LocalStorageServices";
import { useUserLogoutMutation } from "../services/UserAuthApi";
import { RxDashboard } from "react-icons/rx";
import { TbFileDescription } from "react-icons/tb";
import { CiMemoPad } from "react-icons/ci";
import { LuFolderMinus } from "react-icons/lu";
import { HiOutlineTicket } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineCoPresent, MdOutlineFreeCancellation } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { RiLogoutBoxLine } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";

const Sidebar = ({ isOpen }) => {
  const [userLogout] = useUserLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setIsAdmin(decodedToken.is_admin);
      } catch (error) {}
    }
  }, [accessToken]);

  const handleLogout = async () => {
    if (!refreshToken) {
      return;
    }

    setIsLoggingOut(true);

    try {
      const response = await userLogout({
        refresh: refreshToken,
        access_token: accessToken,
      });

      if (response.error) {
        if (
          response.error.data &&
          response.error.data.exception === "Token is blacklisted"
        ) {
          removeToken("access_token");
          removeToken("refresh_token");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          navigate("/login");
        } else {
          enqueueSnackbar("Logout failed. Please try again.", {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } else {
        enqueueSnackbar("Logout successful", {
          variant: "success",
          autoHideDuration: 3000,
        });
        removeToken("access_token");
        removeToken("refresh_token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        navigate("/login");
      }
    } catch (error) {
      enqueueSnackbar("Logout failed. Please try again.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActiveLink = (path) => location.pathname.includes(path);
  const isDashboardActive = location.pathname === "/";

  return (
    <div
      className={`fixed top-0 left-0 w-72 h-full bg-white overflow-auto shadow-md p-5 z-[999] transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0`}
    >
      <ul className="list-none p-0 mt-24">
        <li className={`${isDashboardActive ? "bg-[#E8E8FF]" : ""} rounded-md`}>
          <Link
            to="/"
            className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
          >
            <RxDashboard className="mr-3 text-xl text-[#01008A]" /> Dashboard
          </Link>
        </li>
        <li
          className={`${
            isActiveLink("/notice") ? "bg-[#E8E8FF]" : ""
          } rounded-md`}
        >
          <Link
            to="/notice"
            className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
          >
            <CiMemoPad className="mr-3 text-xl text-[#01008A]" /> Notice
          </Link>
        </li>
        <li
          className={`${
            isActiveLink("applyForLeave") ? "bg-[#E8E8FF]" : ""
          } rounded-md`}
        >
          <Link
            to="/applyForLeave"
            className="flex items-center text-black text-lg mb-4 px-5 py-2"
          >
            <TbFileDescription className="mr-3 text-xl text-[#01008A]" /> Apply
            for leave
          </Link>
        </li>
        <li
          className={`${
            isActiveLink("/library") ? "bg-[#E8E8FF]" : ""
          } rounded-md`}
        >
          <Link
            to="/library"
            className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
          >
            <LuFolderMinus className="mr-3 text-xl text-[#01008A]" /> Library
          </Link>
        </li>
        <li
          className={`${
            isActiveLink("/salarySlip") ? "bg-[#E8E8FF]" : ""
          } rounded-md`}
        >
          <Link
            to={isAdmin ? "/salarySlip" : "/salarySlipView"}
            className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
          >
            <HiOutlineTicket className="mr-3 text-xl text-[#01008A]" /> Salary
            Slip
          </Link>
        </li>

        {/* Admin-only links */}
        {isAdmin && (
          <>
            <li
              className={`${
                isActiveLink("/attendance") ? "bg-[#E8E8FF]" : ""
              } rounded-md`}
            >
              <Link
                to="/attendance"
                className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
              >
                <MdOutlineCoPresent className="mr-3 text-xl text-[#01008A]" />{" "}
                Attendance
              </Link>
            </li>
            <li
              className={`${
                isActiveLink("/employeeDetail") ? "bg-[#E8E8FF]" : ""
              } rounded-md`}
            >
              <Link
                to="/employeeDetail"
                className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
              >
                <IoPersonOutline className="mr-3 text-xl text-[#01008A]" />{" "}
                Employee detail
              </Link>
            </li>
          </>
        )}
        <li
          className={`${
            isActiveLink("/holiday") ? "bg-[#E8E8FF]" : ""
          } rounded-md`}
        >
          <Link
            to="/holiday"
            className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
          >
            <MdOutlineFreeCancellation className="mr-3 text-xl text-[#01008A]" />{" "}
            Holiday
          </Link>
        </li>
        <li
          className={`${
            isActiveLink("/calendar") ? "bg-[#E8E8FF]" : ""
          } rounded-md`}
        >
          <Link
            to="/calendar"
            className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
          >
            <SlCalender className="mr-3 text-xl text-[#01008A]" /> Calendar
          </Link>
        </li>
      </ul>
      <ul className="list-none p-0 mt-8">
        <li className="mb-8">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center w-full text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RiLogoutBoxLine className="mr-3 text-xl text-[#01008A]" />
            Logout
            {isLoggingOut && (
              <div className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
