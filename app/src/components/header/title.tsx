import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box, Typography } from "@mui/material";

function Title({ collapsed }: any) {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <AccountBoxIcon sx={{ marginRight: collapsed ? 0 : 2 }} />
      <Typography
        fontSize={14}
        fontWeight={700}
        display={collapsed ? "none" : "block"}
      >
        User
      </Typography>
    </Box>
  );
}

export default Title;
