import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Loadingbar = () => {
  return (
    <div>
      <Box className="flex justify-center">
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loadingbar;
