import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { CreateResponse, UpdateResponse } from "@refinedev/core";
import React, { FormEventHandler } from "react";
import { FieldValues } from "react-hook-form";
import CustomButton from "./CustomButton";
import type { FormProps } from "../../interfaces/home";

const CustomForm = ({
  type,
  register,
  onFinish,
  formLoading,
  handlesubmit,
  handleImageChange,
  onFinishHandler,
  propertyImages,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color={"#11142d"}>
        {type} a Property
      </Typography>
      <Box mt={2} borderRadius={"20px"} padding={"20px"} bgcolor={"#fcfcfc"}>
        <form
          style={{
            marginTop: "29px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handlesubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0px",
                fontSize: "16px",
                color: "#11142d",
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              variant="outlined"
              placeholder="Please insert property name"
              {...register("title", { require: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0px",
                fontSize: "16px",
                color: "#11142d",
              }}
            >
              Enter property description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Please insert description"
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: "4px  ",
                padding: "8px",
                color: "#919191",
              }}
              {...register("description", { require: true })}
            ></TextareaAutosize>
          </FormControl>
          <Stack direction={"row"} gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0px",
                  fontSize: "16px",
                  color: "#11142d",
                }}
              >
                Select property type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "without-label" }}
                defaultValue="apartment"
                sx={{ textTransform: "capitalize" }}
                {...register("propertyType", { require: true })}
              >
                <MenuItem value="apartment">apartment</MenuItem>
                <MenuItem value="villa">villa</MenuItem>
                <MenuItem value="condo">condo</MenuItem>
                <MenuItem value="studio">studio</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0px",
                  fontSize: "16px",
                  color: "#11142d",
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                color="info"
                variant="outlined"
                placeholder="Please insert property price"
                {...register("price", { require: true })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0px",
                fontSize: "16px",
                color: "#11142d",
              }}
            >
              Enter property location
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              variant="outlined"
              placeholder="Please insert property location"
              {...register("location", { require: true })}
            />
          </FormControl>
          <Stack direction={"column"} gap={1} justifyContent={"center"} mb={2}>
            <Stack direction={"row"} gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my={"8px"}
              >
                Property Photo
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
              >
                Upload *
                <input
                  hidden
                  type="file"
                  accept="images/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{
                wordBreak: "break-all",
              }}
            >
              {propertyImages?.name}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            title={formLoading ? "Summiting..." : "Submit"}
            backgroundColor="#3F72AF"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default CustomForm;
