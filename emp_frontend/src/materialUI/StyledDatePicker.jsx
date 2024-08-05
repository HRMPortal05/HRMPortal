import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function StyledDatePicker({ label }) {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: {
            variant: "outlined",
            sx: {
              width: "180px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "5px",
                height: "35px",
                color: "#01008A",
                "& fieldset": {
                  borderColor: "#7676DC",
                },
                "&:hover fieldset": {
                  borderColor: "#01008A",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#01008A",
                transform: "translate(14px, 6px) scale(0.9)",
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              },
              "& .MuiSvgIcon-root": {
                color: "#01008A",
              },
            },
          },
        }}
        format="DD/MM/YY"
      />
    </LocalizationProvider>
  );
}
