import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import StyledDateForEmployee from "../../materialUI/StyledDateForEmployee";
import {
  useAddEmployeeMutation,
  useFetchAllEmployeesMutation,
  useUpdateEmployeeMutation,
} from "../../services/Employee";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { useRegisterUserMutation } from "../../services/UserAuthApi";
import Row from "./Row";

const CustomInput = ({ label, name, value, onChange, type = "text" }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formError, setFormError] = useState(null);
  const [reload, setReload] = useState(0);
  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    personal_mailid: "",
    working_designation: "",
    department: "",
    salary: "",
    phone_number: "",
    working_emailid: "",
    emp_id: "",
    date_of_birth: null,
    date_of_joining: null,
    address: "",
  });
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const handleReload = () => {
    const randomValue = Math.random();
    setReload(randomValue);
  };

  const [fetchAllEmployees] = useFetchAllEmployeesMutation();
  const access_token = localStorage.getItem("access_token");

  const handleFetchEmployees = async () => {
    try {
      const response = await fetchAllEmployees(access_token).unwrap();
      setEmployees(response);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    handleFetchEmployees();
  }, [reload]);

  const handleEmployeeInputChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleRegisterInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;

    setEmployeeData((prevDetails) => ({
      ...prevDetails,
      [name]: formattedDate,
    }));
  };

  const [addEmployee] = useAddEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentEmployee) {
        try {
          const result = await updateEmployee({
            emp_id: employeeData.emp_id,
            employeeData,
            access_token,
          }).unwrap();
          enqueueSnackbar("Employee updated successfully", {
            variant: "success",
            autoHideDuration: 3000,
          });
          handleReload();
        } catch (error) {
          console.error("Failed to update employee:", error);
          enqueueSnackbar("Failed to update employee", {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } else {
        const response = await addEmployee({
          employeeData,
          access_token: access_token,
        }).unwrap();
        enqueueSnackbar("New employee added successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
        handleReload;
      }

      setIsEditOpen(false);
    } catch (error) {
      console.error("Failed to add employee:", error);
      enqueueSnackbar("Failed to add employee", {
        variant: "error",
        autoHideDuration: 3000,
      });
      setFormError(
        error?.data?.message || "An error occurred while adding the employee."
      );
    }
  };

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(registerData).unwrap();

      enqueueSnackbar(response.msg || "User registered successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });

      setIsRegisterOpen(true);

      setTimeout(() => {
        setIsRegisterOpen(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to register user:", error);

      enqueueSnackbar("Failed to register user", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const openEditForm = (employee) => {
    setCurrentEmployee(employee);
    setEmployeeData(employee);
    setIsEditOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="p-6 font-sans min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">
          Employee Details
        </h1>

        <div className="mb-4 flex justify-end space-x-4">
          <Button
            onClick={() => {
              setCurrentEmployee(null);
              setEmployeeData({
                first_name: "",
                last_name: "",
                personal_mailid: "",
                working_designation: "",
                department: "",
                salary: "",
                phone_number: "",
                working_emailid: "",
                emp_id: "",
                date_of_birth: null,
                date_of_joining: null,
                address: "",
              });
              setIsEditOpen(true);
            }}
            variant="contained"
            className="bg-blue-800 hover:bg-blue-900"
          >
            Add New Employee
          </Button>
          <Button
            onClick={() => setIsRegisterOpen(true)}
            variant="contained"
            className="bg-green-600 hover:bg-green-700"
          >
            Register
          </Button>
        </div>

        <TableContainer
          sx={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
          className="mt-7 bg-white rounded-lg"
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#1e40af", color: "white" }}>
                <TableCell />
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Employee ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Work Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Department
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Designation
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <Row
                  key={employee.working_emailid}
                  row={employee}
                  openEditForm={openEditForm}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Employee Details Dialog */}
        <Dialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle className="bg-blue-800 text-white">
            {currentEmployee ? "Edit Employee Details" : "Add New Employee"}
          </DialogTitle>
          <DialogContent className="mt-4">
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  label="First Name"
                  name="first_name"
                  value={employeeData.first_name || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Last Name"
                  name="last_name"
                  value={employeeData.last_name || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Personal Email"
                  name="personal_mailid"
                  type="email"
                  value={employeeData.personal_mailid || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Work Email"
                  name="working_emailid"
                  type="email"
                  value={employeeData.working_emailid || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Employee ID"
                  name="emp_id"
                  value={employeeData.emp_id || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Phone Number"
                  name="phone_number"
                  value={employeeData.phone_number || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Department"
                  name="department"
                  value={employeeData.department || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Designation"
                  name="working_designation"
                  value={employeeData.working_designation || ""}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Salary"
                  name="salary"
                  value={employeeData.salary || ""}
                  onChange={handleEmployeeInputChange}
                />
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                  </label>
                  <StyledDateForEmployee
                    value={employeeData.date_of_birth}
                    onChange={(date) => handleDateChange("date_of_birth", date)}
                    format="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Joining
                  </label>
                  <StyledDateForEmployee
                    value={employeeData.date_of_joining}
                    onChange={(date) =>
                      handleDateChange("date_of_joining", date)
                    }
                    format="YYYY-MM-DD"
                  />
                </div>
              </div>
              <CustomInput
                label="Address"
                name="address"
                value={employeeData.address || ""}
                onChange={handleEmployeeInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsEditOpen(false)}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEmployeeSubmit}
              className="bg-blue-800 text-white hover:bg-blue-900"
            >
              {currentEmployee ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* User Registration Dialog */}
        <Dialog open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
          <DialogTitle className="bg-blue-800 text-white">
            User Registration
          </DialogTitle>
          <DialogContent className="mt-4">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <CustomInput
                label="Email"
                name="email"
                type="email"
                value={registerData.email}
                onChange={handleRegisterInputChange}
              />
              <CustomInput
                label="Username"
                name="username"
                value={registerData.username}
                onChange={handleRegisterInputChange}
              />
              <CustomInput
                label="Password"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterInputChange}
              />
              <CustomInput
                label="Confirm Password"
                name="password2"
                type="password"
                value={registerData.password2}
                onChange={handleRegisterInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsRegisterOpen(false)}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRegisterSubmit}
              disabled={isLoading}
              className="bg-blue-800 text-white hover:bg-blue-900"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default EmployeeDetails;
