import React from "react";
import type { PieChartProps } from "../../interfaces/home";
import { Box, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display={"flex"}
      bgcolor={"#F9F7F7"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={4}
      py={2}
      gap={2}
      borderRadius={"12px"}
      minHeight={"120px"}
      width={"fit-content"}
    >
      <Stack direction={"column"}>
        <Typography fontSize={24} color={"#808191"}>
          {title}
        </Typography>
        <Typography
          fontSize={24}
          color={"#11142d"}
          fontWeight={700}
          mt={1}
        >
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: "donut" },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width={"120px"}
      />
    </Box>
  );
};

export default PieChart;
