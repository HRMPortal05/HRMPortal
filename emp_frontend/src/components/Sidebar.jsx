import { RxDashboard } from "react-icons/rx";
import { TbFileDescription } from "react-icons/tb";
import { CiMemoPad } from "react-icons/ci";
import { LuFolderMinus } from "react-icons/lu";
import { HiOutlineTicket } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import {
  MdOutlineCoPresent,
  MdOutlineFreeCancellation,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { RiLogoutBoxLine } from "react-icons/ri";
import React from "react";
import { Link } from "react-router-dom";
import { removeToken } from "../services/LocalStorageServices";

const Sidebar = ({ isOpen }) => {
  const handlelogout = () => {
    removeToken("access_token", "refresh_token");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white overflow-auto shadow-md p-5 z-[999] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <ul className="list-none p-0 mt-24">
          <li>
            <Link
              to="/"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <RxDashboard className="mr-3 text-xl text-[#01008A]" /> Dashboard
            </Link>
          </li>
          <li>
            <a
              href="#notice"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <CiMemoPad className="mr-3 text-xl text-[#01008A]" /> Notice
            </a>
          </li>
          <li className="bg-[#E8E8FF] rounded-md">
            <Link
              to="/applyForLeave"
              className="flex items-center text-black text-lg mb-4 px-5 py-2"
            >
              <TbFileDescription className="mr-3 text-xl text-[#01008A]" />{" "}
              Apply for leave
            </Link>
          </li>
          <li>
            <a
              href="#access-asset"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <LuFolderMinus className="mr-3 text-xl text-[#01008A]" />{" "}
              Access/Asset
            </a>
          </li>
          <li>
            <a
              href="#salary-slip"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <HiOutlineTicket className="mr-3 text-xl text-[#01008A]" /> Salary
              Slip
            </a>
          </li>
          <li>
            <a
              href="#attendance"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <MdOutlineCoPresent className="mr-3 text-xl text-[#01008A]" />{" "}
              Attendance
            </a>
          </li>
          <li>
            <a
              href="#holiday"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <MdOutlineFreeCancellation className="mr-3 text-xl text-[#01008A]" />{" "}
              Holiday
            </a>
          </li>
          <li>
            <a
              href="#employee-detail"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <IoPersonOutline className="mr-3 text-xl text-[#01008A]" />{" "}
              Employee detail
            </a>
          </li>
          <li>
            <a
              href="#calendar"
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <SlCalender className="mr-3 text-xl text-[#01008A]" /> Calendar
            </a>
          </li>
        </ul>
        <ul className="list-none p-0 mt-8">
          <li className="mb-8">
            <Link
              to="/login"
              onClick={handlelogout}
              className="flex items-center text-black text-lg mb-4 px-5 py-2 hover:bg-[#E8E8FF] rounded-md"
            >
              <RiLogoutBoxLine className="mr-3 text-xl text-[#01008A]" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
