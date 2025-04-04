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
        maxWidth: "280px",
      }}
      elevation={0}
    >
      <CardMedia
        component={"img"}
        image={photo}
        alt={title}
        sx={{
          borderRadius: "8px 8px 0px 0px",
          height: { xs: 120, sm: 180, md: 220 },
          width: "100%",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "flex-start", md: "space-between" },
          padding: "12px",
          bgcolor: "#fafafa",
          borderRadius: "0px 0px 8px 8px",
        }}
      >
        <Stack direction={"column"} mt={1} gap={1}>
          <Typography fontSize={14} fontWeight={600} color={"#11142d"}>
            {title}
          </Typography>
          <Stack direction={"row"} gap={0.2} alignItems={"flex-start"}>
            <Place
              sx={{
                fontSize: "18px",
                color: "#DD5043",
              }}
            />
            <Typography fontSize={14} fontWeight={500} color={"#808191"}>
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Box mt={1} height="fit-content">
          <Typography fontSize={14} fontWeight={500} color={"#476be8"}>
            {price.toLocaleString("th-TH")} ฿
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
