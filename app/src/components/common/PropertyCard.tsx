import React from "react";
import type { CardProps } from "../../interfaces/home";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { Place } from "@mui/icons-material";

const PropertyCard = ({ id, title, location, price, photo }: CardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
      sx={{
        textDecoration: "none",
        maxWidth: "320px",
        padding: "8px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
      elevation={0}
    >
      <CardMedia
        component={"img"}
        width={"100%"}
        height={210}
        image={photo}
        alt={title}
        sx={{ borderRadius: "8px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "8px",
          padding: "4px",
        }}
      >
        <Stack direction={"column"} gap={1} mt={1}>
          <Typography fontSize={16} fontWeight={500} color={"#11142d"}>
            {title}
          </Typography>
          <Stack direction={"row"} gap={0.5} alignItems={"flex-start"}>
            <Place
              sx={{
                fontSize: "18px",
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={16} fontWeight={500} color={"#11142d"}>
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor={"#dadefa"}
          height="fit-content"
        >
          <Typography fontSize={16} fontWeight={500} color={"#476be8"}>
            {price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
