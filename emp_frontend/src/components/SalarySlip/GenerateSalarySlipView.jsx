// // SalarySlipView.js
// import React from "react";
// import PropTypes from "prop-types";
// import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
// import dayjs from "dayjs";

// const GenerateSalarySlipView = ({
//   employeeDetails,
//   netSalary,
//   convertNumberToWords,
//   onDownloadClick,
//   onViewClick,
// }) => (
//   <div className="flex justify-center items-center h-screen bg-white p-4">
//     <Card className="w-full max-w-2xl bg-white rounded-lg overflow-hidden">
//       <CardContent>
//         <h2 className="text-2xl font-semibold mb-6 text-primary_color text-center">
//           Salary Slip For The Month of {dayjs().format("MMMM")}
//         </h2>
//         <div className="p-6">
//           <Grid container spacing={4}>
//             <Grid item xs={12} sm={6}>
//               <Typography className="text-gray-700 font-medium">
//                 Name:{" "}
//                 <span className="font-normal">{employeeDetails.name}</span>
//               </Typography>
//             </Grid>
//             {/* Include other fields similarly */}
//             <Grid item xs={12} sm={6}>
//               <Typography className="text-gray-700 font-medium">
//                 Basic Salary:{" "}
//                 <span className="font-normal">
//                   ₹ {employeeDetails.basicSalary}
//                 </span>
//               </Typography>
//             </Grid>
//           </Grid>
//           <div className="mt-6 border-t border-gray-300 pt-4">
//             <Typography
//               variant="subtitle1"
//               className="text-gray-800 font-semibold"
//             >
//               Net Salary Amount:{" "}
//               <span className="text-green-600">₹ {netSalary}</span>
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               className="text-gray-800 font-semibold"
//             >
//               Amount in Words:{" "}
//               <span className="text-green-600">
//                 {convertNumberToWords(netSalary)} Only
//               </span>
//             </Typography>
//           </div>
//           <Grid container spacing={4} className="mt-6">
//             <Grid item xs={12} sm={6}>
//               <Typography className="text-gray-700 font-medium">
//                 Prepared By:{" "}
//                 <span className="font-normal">
//                   {employeeDetails.preparedBy}
//                 </span>
//               </Typography>
//             </Grid>
//             {/* Include other fields similarly */}
//           </Grid>
//         </div>
//         <div className="mt-6 flex justify-between">
//           <Button
//             variant="contained"
//             color="primary"
//             className="bg-blue-600 hover:bg-blue-700"
//             onClick={onViewClick}
//           >
//             View Slip
//           </Button>
//           <Button
//             variant="contained"
//             color="secondary"
//             className="bg-red-600 hover:bg-red-700"
//             onClick={onDownloadClick}
//           >
//             Download Slip
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// GenerateSalarySlipView.propTypes = {
//   employeeDetails: PropTypes.shape({
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
//   onDownloadClick: PropTypes.func.isRequired,
//   onViewClick: PropTypes.func.isRequired,
// };

// export default GenerateSalarySlipView;
