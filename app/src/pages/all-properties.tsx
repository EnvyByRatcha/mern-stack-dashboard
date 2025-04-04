import React, { useMemo } from "react";
import { CustomButton, PropertyCard } from "../components";
import { useNavigate } from "react-router";
import {
  Box,
  Grid2,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BaseRecord, useTable } from "@refinedev/core";
import type { Property } from "../interfaces/home";
import { Add } from "@mui/icons-material";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    pageCount,
    sorter,
    setSorters,
    filters,
    setFilters,
    pageSize,
    setPageSize,
  } = useTable();

  const currentPrice = sorter.find((item) => item.field === "price")?.order;

  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  const currentFilters = useMemo(() => {
    const logical = filters.flatMap((item) => ("field" in item ? item : []));

    return {
      title: logical.find((item) => item.field === "title")?.value || "",
      properType:
        logical.find((item) => item.field === "propertyType")?.value || "",
    };
  }, [filters]);

  const allProperties: BaseRecord = data?.data ?? [];
  let resultProperties: Property[] = [];
  if (allProperties.properties) {
    resultProperties = allProperties.properties;
  }

  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;

  const hasNext = current < pageCount;
  const hasPrev = current > 1;

  return (
    <Box padding={1} my={"8px"}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Stack direction={"column"} width={"100%"} gap={2}>
          <Typography fontSize={25} fontWeight={700} color={"#11142d"}>
            {resultProperties.length > 0
              ? "All Properties"
              : "Not Found Properties"}
          </Typography>
          <Box display={"flex"} width={"100%"} flexWrap={"wrap"}>
            <Box display={"flex"} gap={{ xs: 1, sm: 2 }} flexWrap={"wrap"}>
              <TextField
                variant="outlined"
                color="info"
                label="Search Property"
                value={currentFilters.title}
                size="small"
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              ></TextField>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilters.properType}
                size="small"
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "propertyType",
                        operator: "contains",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
              >
                {" "}
                <MenuItem value="">All</MenuItem>
                {["Apartment", "Villa", "Condo", "Studio"].map((item) => (
                  <MenuItem key={item} value={item.toLowerCase()}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <CustomButton
                title={`Sort Price ${currentPrice === "asc" ? "↓" : "↑"}`}
                color="#fcfcfc"
                handleClick={() => toggleSort("price")}
                backgroundColor={"#475be8"}
              />
            </Box>
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <CustomButton
              title="Add Property"
              color="#fcfcfc"
              handleClick={() => navigate("/properties/create")}
              backgroundColor={"#475be8"}
              icon={<Add />}
            />
          </Stack>
        </Stack>
        <Grid2
          width={"100%"}
          mt={2}
          container
          spacing={{ xs: 1, sm: 2 }}
          columns={{ xs: 12 }}
        >
          {resultProperties.map((property) => {
            return (
              <Grid2
                sx={{
                  borderRadius: "8px",
                  boxShadow: "0 22px 45px 2px rgba(0, 0, 0, 0.1)",
                }}
                key={property._id}
                size={{ xs: 6, sm: 4, md: 3 }}
              >
                <PropertyCard
                  id={property._id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  photo={property.photo}
                ></PropertyCard>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>

      <Box
        display={"flex"}
        gap={2}
        mt={3}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <CustomButton
          title="Previous"
          handleClick={() => setCurrent((prev) => prev - 1)}
          backgroundColor="#475be8"
          color="#fcfcfc"
          disable={!hasPrev}
        />
        <Box
          display={{ xs: "hidden", sm: "flex" }}
          alignItems={"center"}
          gap={"4px"}
        >
          Page{" "}
          <strong>
            {current} of {pageCount}
          </strong>
        </Box>
        <CustomButton
          title="next"
          handleClick={() => setCurrent((prev) => prev + 1)}
          backgroundColor="#475be8"
          color="#fcfcfc"
          disable={!hasNext}
        />
        <Select
          variant="outlined"
          color="info"
          displayEmpty
          required
          inputProps={{ "aria-label": "Without label" }}
          value={pageSize}
          size="small"
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : 10;
            setPageSize(value);
          }}
        >
          {[5, 10, 15, 20].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default AllProperties;
