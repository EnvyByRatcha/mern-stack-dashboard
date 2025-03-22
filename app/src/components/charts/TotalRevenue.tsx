import { ArrowCircleUpRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { TotalRevenueOptions, TotalRevenueSeries } from "./Chart.config";

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor={"#F9F7F7"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"12px"}
    >
      <Typography fontSize={18} color={"#11142d"} fontWeight={600}>
        Total Revenue
      </Typography>
      <Stack my={"20px"} direction={"row"} gap={4} flexWrap={"wrap"}>
        <Typography fontSize={28} color={"#11142d"} fontWeight={700}>
          11,200
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: "28px", color: "#3F72AF" }} />
          <Stack>
            <Typography fontSize={12} color={"#808191"}>
              0.8%
            </Typography>
            <Typography fontSize={12} color={"#808191"}>
              Greater than last month.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </Box>
  );
};

export default TotalRevenue;
