// // SalarySlipDialog.js
// import React from "react";
// import PropTypes from "prop-types";
// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Button,
//   Grid,
// } from "@mui/material";
// import dayjs from "dayjs";

// const SalarySlipDialog = ({
//   open,
//   onClose,
//   employeeDetails,
//   netSalary,
//   convertNumberToWords,
// }) => (
//   <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//     <DialogContent>
//       <div className="p-6">
//         <Typography
//           variant="h5"
//           component="div"
//           className="text-center mb-6 font-bold text-gray-800"
//         >
//           Salary Slip For The Month of {dayjs().format("MMMM")}
//         </Typography>
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={6}>
//             <Typography className="text-gray-700 font-medium">
//               Name: <span className="font-normal">{employeeDetails.name}</span>
//             </Typography>
//           </Grid>
//           {/* Include other fields similarly */}
//           <Grid item xs={12} sm={6}>
//             <Typography className="text-gray-700 font-medium">
//               Basic Salary:{" "}
//               <span className="font-normal">
//                 ₹ {employeeDetails.basicSalary}
//               </span>
//             </Typography>
//           </Grid>
//         </Grid>
//         <div className="mt-6 border-t border-gray-300 pt-4">
//           <Typography
//             variant="subtitle1"
//             className="text-gray-800 font-semibold"
//           >
//             Net Salary Amount:{" "}
//             <span className="text-green-600">₹ {netSalary}</span>
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             className="text-gray-800 font-semibold"
//           >
//             Amount in Words:{" "}
//             <span className="text-green-600">
//               {convertNumberToWords(netSalary)} Only
//             </span>
//           </Typography>
//         </div>
//         <Grid container spacing={4} className="mt-6">
//           <Grid item xs={12} sm={6}>
//             <Typography className="text-gray-700 font-medium">
//               Prepared By:{" "}
//               <span className="font-normal">{employeeDetails.preparedBy}</span>
//             </Typography>
//           </Grid>
//           {/* Include other fields similarly */}
//         </Grid>
//       </div>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose} color="primary">
//         Close
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// SalarySlipDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
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
// };

// export default SalarySlipDialog;
