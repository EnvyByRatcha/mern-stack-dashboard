import React from "react";
import { useList } from "@refinedev/core";

import { PieChart, PropertyReferral, TotalRevenue } from "../components";
import { Box, Stack, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color={"#11142d"}>
        Dashboard
      </Typography>
      <Box mt={"20px"} display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for sale"
          value={30}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />

        <PieChart
          title="Properties for rent"
          value={30}
          series={[70, 30]}
          colors={["#275be8", "#c4e8ef"]}
        />

        <PieChart
          title="Total customers"
          value={320}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />

        <PieChart
          title="Properties of citys"
          value={405}
          series={[40, 60]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>
      <Stack mt={"24px"} width={"100%"} direction={{ xs: "column", lg: "row" }} gap={4}>
        <TotalRevenue />
        <PropertyReferral />
      </Stack>
    </Box>
  );
};

export default Home;
