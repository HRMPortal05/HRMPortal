import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Row = ({ row, is_admin, openEditForm }) => {
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
        <TableCell>{row.emp_id}</TableCell>
        <TableCell>{row.working_emailid}</TableCell>
        <TableCell>{row.department}</TableCell>
        <TableCell>{row.working_designation}</TableCell>
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
        <TableCell>
          <IconButton onClick={() => openEditForm(row)}>Edit</IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="details">
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                      minWidth: "150px",
                      fontWeight: "600",
                    }}
                  >
                    Full Name:
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {`${row.first_name} ${row.last_name}`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                      minWidth: "150px",
                      fontWeight: "600",
                    }}
                  >
                    Personal Email:
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {row.personal_mailid || "None"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                      minWidth: "150px",
                      fontWeight: "600",
                    }}
                  >
                    Phone Number:
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {row.phone_number || "None"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                      minWidth: "150px",
                      fontWeight: "600",
                    }}
                  >
                    Date of Birth:
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {row.date_of_birth || "None"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                      minWidth: "150px",
                      fontWeight: "600",
                    }}
                  >
                    Date of Joining:
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {row.date_of_joining || "None"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                      minWidth: "150px",
                      fontWeight: "600",
                    }}
                  >
                    Address:
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {row.address || "None"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
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
    status: "PENDING",
  });

  useEffect(() => {
    // Fetch employees data here
    // For now, we'll use dummy data
    setEmployees([
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        emp_id: "EMP001",
        working_emailid: "john.doe@example.com",
        department: "IT",
        working_designation: "Developer",
        status: "APPROVED",
      },
      {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        emp_id: "EMP002",
        working_emailid: "jane.smith@example.com",
        department: "HR",
        working_designation: "Manager",
        status: "PENDING",
      },
    ]);
  }, []);

  const handleRegistrationInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmployeeInputChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setEmployeeData({ ...employeeData, [name]: date });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log("Registration data:", registrationData);
    setIsRegistrationOpen(false);
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    if (currentEmployee) {
      // Update existing employee
      console.log("Updated employee data:", employeeData);
    } else {
      // Add new employee
      console.log("New employee data:", employeeData);
    }
    setIsEditOpen(false);
  };

  const openEditForm = (employee) => {
    setCurrentEmployee(employee);
    setEmployeeData(employee);
    setIsEditOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="p-6 font-roboto bg-elight_primary min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-primary_color">
          Employee Details
        </h1>

        <div className="mb-4 flex justify-between items-center">
          <Button
            onClick={() => setIsRegistrationOpen(true)}
            variant="contained"
            color="primary"
          >
            Register New User
          </Button>
          <Button
            onClick={() => {
              setCurrentEmployee(null);
              setEmployeeData({});
              setIsEditOpen(true);
            }}
            variant="contained"
            color="secondary"
          >
            Add New Employee
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Employee ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <Row
                  key={employee.id}
                  row={employee}
                  is_admin={true}
                  openEditForm={openEditForm}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Registration Dialog */}
        <Dialog
          open={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
        >
          <DialogTitle>Register New User</DialogTitle>
          <DialogContent>
            <form onSubmit={handleRegistration} className="space-y-4">
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
                onChange={handleRegistrationInputChange}
              />
              <TextField
                label="Username"
                name="username"
                required
                fullWidth
                onChange={handleRegistrationInputChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
                onChange={handleRegistrationInputChange}
              />
              <TextField
                label="Confirm Password"
                name="password2"
                type="password"
                required
                fullWidth
                onChange={handleRegistrationInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsRegistrationOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              onClick={handleRegistration}
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </DialogActions>
        </Dialog>

        {/* Employee Details Dialog */}
        <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <DialogTitle>
            {currentEmployee ? "Edit Employee Details" : "Add New Employee"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              <TextField
                label="First Name"
                name="first_name"
                value={employeeData.first_name || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="last_name"
                value={employeeData.last_name || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Personal Email"
                name="personal_mailid"
                type="email"
                value={employeeData.personal_mailid || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Work Email"
                name="working_emailid"
                type="email"
                value={employeeData.working_emailid || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Employee ID"
                name="emp_id"
                value={employeeData.emp_id || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Department"
                name="department"
                value={employeeData.department || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Designation"
                name="working_designation"
                value={employeeData.working_designation || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Salary"
                name="salary"
                type="number"
                value={employeeData.salary || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phone_number"
                value={employeeData.phone_number || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
              <DatePicker
                label="Date of Birth"
                value={employeeData.date_of_birth}
                onChange={(date) => handleDateChange("date_of_birth", date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="Date of Joining"
                value={employeeData.date_of_joining}
                onChange={(date) => handleDateChange("date_of_joining", date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <TextField
                label="Address"
                name="address"
                multiline
                rows={3}
                value={employeeData.address || ""}
                onChange={handleEmployeeInputChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              onClick={handleEmployeeSubmit}
              variant="contained"
              color="primary"
            >
              {currentEmployee ? "Save Changes" : "Add Employee"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default EmployeeDetails;
