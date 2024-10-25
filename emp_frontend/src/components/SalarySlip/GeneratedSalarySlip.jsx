import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { StyleSheet, pdf } from "@react-pdf/renderer";
import dayjs from "dayjs";
import SalarySlipDocument from "./SalarySlipDocument";
import { useNavigate } from "react-router-dom";

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  greenText: {
    color: "#00796b",
  },
});

const GeneratedSalarySlip = ({
  generatedSlip,
  netSalary,
  convertNumberToWords,
}) => {
  const navigate = useNavigate();

  const handleGenerateNewSlip = () => {
    navigate("/");
  };

  const handleDownloadClick = async () => {
    try {
      const blob = await pdf(
        <SalarySlipDocument salarySlip={generatedSlip} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `salary_slip_${generatedSlip.salary_slip_number}.pdf`;
      link.click();
    } catch (error) {}
  };

  console.log(generatedSlip);

  return (
    <div className="flex roboto-regular justify-center items-center h-screen bg-white p-4">
      <Card className="w-full max-w-2xl bg-white rounded-lg overflow-hidden">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6 text-primary_color text-center">
            Salary Slip For The Month of {dayjs().format("MMMM")}
          </h2>
          <div className="p-6">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Name:{" "}
                  <span className="font-normal">{generatedSlip.employee}</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Employee ID:{" "}
                  <span className="font-normal">{generatedSlip.emp_id}</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Designation:{" "}
                  <span className="font-normal">
                    {generatedSlip.designation}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Department:{" "}
                  <span className="font-normal">
                    {generatedSlip.department}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Date Of Joining:{" "}
                  <span className="font-normal">
                    {generatedSlip.date_of_joining}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Basic Salary:{" "}
                  <span className="font-normal">
                    ₹ {generatedSlip.basic_salary}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Allowances:{" "}
                  <span className="font-normal">
                    ₹ {generatedSlip.allowances}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Deductions:{" "}
                  <span className="font-normal">
                    ₹ {generatedSlip.deductions}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <div className="mt-6 border-t border-gray-300 pt-4">
              <Typography
                variant="subtitle1"
                className="text-gray-800 font-semibold"
              >
                Net Salary Amount:{" "}
                <span className="text-green-600">₹ {netSalary}</span>
              </Typography>
              <Typography
                variant="subtitle1"
                className="text-gray-800 font-semibold"
              >
                Amount in Words:{" "}
                <span className="text-green-600">
                  {convertNumberToWords(netSalary)} Only
                </span>
              </Typography>
            </div>
            <Grid container spacing={4} className="mt-6">
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Prepared By:{" "}
                  <span className="font-normal">
                    {generatedSlip.prepared_by}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="text-gray-700 font-medium">
                  Approved By:{" "}
                  <span className="font-normal">
                    {generatedSlip.approved_by}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className="mt-6 flex justify-between">
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleGenerateNewSlip}
            >
              Generate New Slip
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDownloadClick}
            >
              Download Slip
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// GeneratedSalarySlip.propTypes = {
//   generatedSlip: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     department: PropTypes.string.isRequired,
//     designation: PropTypes.string.isRequired,
//     dateOfJoining: PropTypes.string.isRequired,
//     basicSalary: PropTypes.string.isRequired,
//     allowances: PropTypes.string.isRequired,
//     deductions: PropTypes.string.isRequired,
//     preparedBy: PropTypes.string.isRequired,
//     approvedBy: PropTypes.string.isRequired,
//   }).isRequired,
//   netSalary: PropTypes.number.isRequired,
//   convertNumberToWords: PropTypes.func.isRequired,
// };

export default GeneratedSalarySlip;
