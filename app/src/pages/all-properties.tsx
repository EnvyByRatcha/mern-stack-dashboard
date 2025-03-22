import React, { useMemo } from "react";
import { CustomButton, PropertyCard } from "../components";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
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
        logical.find((item) => item.field === "properType")?.value || "",
    };
  }, [filters]);

  const allProperties: BaseRecord = data?.data ?? [];
  let resultProperties: Property[] = [];
  if (allProperties.properties) {
    resultProperties = allProperties.properties;
  }

  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;

  return (
    <Box>
      <Box mt={"20px"} sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction={"column"} width={"100%"}>
          <Typography>
            {resultProperties.length > 0 ? "All Properties" : "No Properties"}
          </Typography>
          <Box
            mb={2}
            mt={1}
            display={"flex"}
            width={"84%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              gap={2}
              flexWrap={"wrap"}
              mb={{ xs: "20px", sm: "0px" }}
            >
              <CustomButton
                title={`Sort Price ${currentPrice === "asc" ? "↑" : "↓"}`}
                color="#fcfcfc"
                handleClick={() => toggleSort("price")}
                backgroundColor={"#475be8"}
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search Property"
                value={currentFilters.title}
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
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "properType",
                        operator: "contains",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
              >
                {["apartment", "villa", "condo", "studio"].map((item) => (
                  <MenuItem key={item} value={item.toLowerCase()}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
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
        {resultProperties.map((property) => {
          return (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
            ></PropertyCard>
          );
        })}
      </Box>
      <Box display={"flex"} gap={2} mt={3} flexWrap={"wrap"}>
        <CustomButton
          title="Previous"
          handleClick={() => setCurrent((prev) => prev - 1)}
          backgroundColor="#475be8"
          color="#fcfcfc"
          disable={!(current > 1)}
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
          disable={current === pageCount}
        />
        <Select
          variant="outlined"
          color="info"
          displayEmpty
          required
          inputProps={{ "aria-label": "Without label" }}
          defaultValue="10"
          onChange={(e) => {
            // setPageSize(e.target.value);
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
