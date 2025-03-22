import { Box, Stack, Typography } from "@mui/material";
import {
  BaseRecord,
  useDelete,
  useGetIdentity,
  useShow,
} from "@refinedev/core";
import { log } from "console";
import React from "react";
import { useNavigate, useParams } from "react-router";
import type { Property } from "../interfaces/home";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";
import { CustomButton } from "../components";

const checkImage = (url: string | undefined) => {
  if (!url) {
    return false;
  }
  const image = new Image();
  image.src = url;
  return image.width !== 0 && image.height !== 0;
};

const PropertiesDetail = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<any>();

  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;
  const { id } = useParams();

  const { mutate } = useDelete<any>();

  const property: BaseRecord = data?.data ?? [];
  let resultProperty: Property | null = null;

  if (property.property) {
    resultProperty = property.property;
    console.log(resultProperty);
  }

  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;

  const isCurrentUser = user.email === resultProperty?.creator.email;
  const handleDelete = () => {
    const response = confirm("Confirm delete this property");
    if (response) {
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };
  return (
    <Box
      borderRadius={"12px"}
      padding={"20px"}
      bgcolor={"#fcfcfc"}
      width={"100%"}
    >
      <Typography fontSize={24} fontWeight={500} color="#11142d">
        {resultProperty?.title}
      </Typography>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
        mt={"8px"}
        justifyContent={"space-between"}
      >
        <Box flex={1} maxWidth={"100%"}>
          <img
            src={resultProperty?.photo}
            alt={resultProperty?.photo}
            width={"100%"}
            height={540}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <Box mt={1}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={24}
                fontWeight={500}
                color="#11142d"
                textTransform={"capitalize"}
              >
                {resultProperty?.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((i) => {
                  return (
                    <Star
                      key={i}
                      sx={{
                        color: "#F2C94C",
                      }}
                    />
                  );
                })}
              </Box>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={1}
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color="#11142d"
                  textTransform={"capitalize"}
                >
                  {resultProperty?.title}
                </Typography>
                <Stack direction={"row"} gap={0.5} alignItems={"center"}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography
                    fontSize={22}
                    fontWeight={600}
                    color="#11142d"
                    textTransform={"capitalize"}
                  >
                    {resultProperty?.location}
                  </Typography>
                </Stack>
              </Box>
              <Box mt={1}>
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="#11142d"
                  textTransform={"capitalize"}
                >
                  Price
                </Typography>
                <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
                  <Typography
                    fontSize={25}
                    fontWeight={600}
                    color="#475BE8"
                    textTransform={"capitalize"}
                  >
                    {resultProperty?.price}
                  </Typography>
                  <Typography
                    fontSize={14}
                    color="#808191"
                    textTransform={"capitalize"}
                    mb={0.8}
                  >
                    for sell
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction={"column"} alignItems={"flex-start"} gap={1}>
              <Typography
                fontSize={25}
                fontWeight={600}
                color="#11142d"
                mt={"8px"}
              >
                Description
              </Typography>
              <Typography fontSize={16} fontWeight={600} color="#808191">
                {resultProperty?.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          flex={1}
          maxWidth={326}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"16px"}
        >
          <Stack
            p={2}
            width={"100%"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid #E4E4E4"}
          >
            <Stack
              mt={2}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <img
                src={
                  checkImage(resultProperty?.creator.avatar)
                    ? resultProperty?.creator.avatar
                    : "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                }
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <Stack mt={2}>
                <Typography fontSize={16} fontWeight={600} color="#808191">
                  {resultProperty?.creator.name}
                </Typography>
                <Typography fontSize={14} fontWeight={600} color="#808191">
                  Agent
                </Typography>
                <Stack mt={2}>
                  <Typography fontSize={14} fontWeight={600} color="#808191">
                    <Place sx={{ fontSize: "14px", marginRight: "2px" }} />
                    Bangkok, TH
                  </Typography>
                </Stack>
                <Typography
                  mt={"1px"}
                  fontSize={14}
                  fontWeight={600}
                  color="#11142d"
                >
                  {resultProperty?.creator.allProperty.length} Properties
                </Typography>
              </Stack>
              <Stack
                width={"100%"}
                mt={"24px"}
                ml={"24px"}
                direction={"row"}
                flexWrap={"wrap"}
                gap={2}
              >
                <CustomButton
                  title={!isCurrentUser ? "Message" : "Edit"}
                  backgroundColor={"#475BE8"}
                  color={"#fcfcfc"}
                  icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                  handleClick={() => {
                    navigate(`/properties/edit/${resultProperty?._id}`);
                  }}
                />
                <CustomButton
                  title={!isCurrentUser ? "Call" : "Delete"}
                  backgroundColor={!isCurrentUser ? "#2ED480" : "#D42E2E"}
                  color={"#fcfcfc"}
                  icon={!isCurrentUser ? <Phone /> : <Delete />}
                  handleClick={() => {
                    if (isCurrentUser) handleDelete();
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Box>
            <Stack width={"100%"}>
              <img
                src="https://www.nsm.or.th/nsm/sites/default/files/2021-12/20200204-2PNG.png"
                alt="googleMap"
              />
            </Stack>
            <Stack mt={2}>
              <CustomButton
                title={"Book Now"}
                backgroundColor={"#475BE8"}
                color={"#fcfcfc"}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default PropertiesDetail;
