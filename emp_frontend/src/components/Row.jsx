import React from "react";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow className="hover:bg-gray-100">
        <TableCell className="p-2">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="p-2">{row.name}</TableCell>
        <TableCell className="p-2">{row.email}</TableCell>
        <TableCell className="p-2">{row.userType}</TableCell>
        <TableCell className="p-2">
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              row.status === "Pending"
                ? "bg-yellow-500 text-white"
                : row.status === "Approved"
                ? "bg-blue-500 text-white"
                : row.status === "Reimbursed"
                ? "bg-green-500 text-white"
                : row.status === "Rejected"
                ? "bg-red-500 text-white"
                : ""
            }`}
          >
            {row.status}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="m-2">
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Typography
                variant="body1"
                className="font-bold font-handwriting"
              >
                {row.reason}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
