import { Button, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface CustomerButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disable?: boolean;
  handleClick?: () => void;
}

const CustomButton = ({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  disable,
  handleClick,
}: CustomerButtonProps) => {
  return (
    <Button
      disabled={disable}
      type={type == "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : "unset",
        justifyContent: "center",
        alignItems: "center",
        width: fullWidth ? "199%" : "unset",
        backgroundColor,
        color,
        fontSize: "16px",
        fontWeight: 600,
        gap: "8px",
        textTransform: "capitalize",
        "&:hover": {
          opacity: 0.9,
          backgroundColor,
        },
      }}
      onClick={handleClick}
    >
      {icon && <Stack>{icon}</Stack>}
      <Typography>{title}</Typography>
    </Button>
  );
};

export default CustomButton;
