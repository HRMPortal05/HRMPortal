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
  useMediaQuery,
  useTheme,
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
import { FaUserTie } from "react-icons/fa";

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
  }, []);

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
        await updateEmployee({
          emp_id: employeeData.emp_id,
          employeeData,
          access_token,
        }).unwrap();
        enqueueSnackbar("Employee updated successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
      } else {
        await addEmployee({
          employeeData,
          access_token,
        }).unwrap();
        enqueueSnackbar("New employee added successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
      setIsEditOpen(false);
      handleFetchEmployees();
    } catch (error) {
      enqueueSnackbar("Failed to save employee details", {
        variant: "error",
        autoHideDuration: 3000,
      });
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
      setIsRegisterOpen(false);
    } catch (error) {
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="min-h-screen mt-8 md:pl-5 lg:pl-5">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary_color flex items-center mb-6">
          <FaUserTie className="mr-2 text-form_base" size={28} />
          Employee Details
        </h2>

        <div className="mb-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
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
            className="bg-light_primary hover:bg-blue-900 w-full sm:w-auto"
            sx={{ background: "#00A189" }}
          >
            Add New Employee
          </Button>
          <Button
            onClick={() => setIsRegisterOpen(true)}
            variant="contained"
            className="w-full sm:w-auto"
            sx={{ background: "#00A189" }}
          >
            Register
          </Button>
        </div>

        <TableContainer
          sx={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
          className="mt-4 sm:mt-7 bg-white rounded-lg overflow-x-hidden"
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#00008af0", color: "white" }}>
                <TableCell />
                {!isMobile && (
                  <>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Employee ID
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Name
                    </TableCell>
                  </>
                )}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Work Email
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Department
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Designation
                    </TableCell>
                  </>
                )}
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
                  isMobile={isMobile}
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
          fullScreen={isMobile} // Only fullscreen for mobile
        >
          <DialogTitle className="bg-blue-800 text-white">
            {currentEmployee ? "Edit Employee Details" : "Add New Employee"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomInput
                  label="First Name"
                  name="first_name"
                  value={employeeData.first_name}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Last Name"
                  name="last_name"
                  value={employeeData.last_name}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Personal Email ID"
                  name="personal_mailid"
                  value={employeeData.personal_mailid}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Work Designation"
                  name="working_designation"
                  value={employeeData.working_designation}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Department"
                  name="department"
                  value={employeeData.department}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Salary"
                  name="salary"
                  type="number"
                  value={employeeData.salary}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Phone Number"
                  name="phone_number"
                  value={employeeData.phone_number}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Work Email ID"
                  name="working_emailid"
                  value={employeeData.working_emailid}
                  onChange={handleEmployeeInputChange}
                />
                <CustomInput
                  label="Employee ID"
                  name="emp_id"
                  value={employeeData.emp_id}
                  onChange={handleEmployeeInputChange}
                />
                <div className="mb-4">
                  <StyledDateForEmployee
                    label="Date of Birth"
                    name="date_of_birth"
                    value={employeeData.date_of_birth}
                    onChange={(date) => handleDateChange("date_of_birth", date)}
                  />
                </div>
                <div className="mb-4">
                  <StyledDateForEmployee
                    label="Date of Joining"
                    name="date_of_joining"
                    value={employeeData.date_of_joining}
                    onChange={(date) =>
                      handleDateChange("date_of_joining", date)
                    }
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={employeeData.address}
                  onChange={handleEmployeeInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button
              onClick={handleEmployeeSubmit}
              variant="contained"
              className="bg-blue-800 hover:bg-blue-900"
            >
              {currentEmployee ? "Save Changes" : "Add Employee"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* User Registration Dialog */}
        <Dialog
          open={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
        >
          <DialogTitle className="bg-green-600 text-white">
            Register New User
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                <CustomInput
                  label="Email"
                  name="email"
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
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsRegisterOpen(false)}>Cancel</Button>
            <Button
              onClick={handleRegisterSubmit}
              variant="contained"
              className="bg-green-600 hover:bg-green-700"
            >
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default EmployeeDetails;
