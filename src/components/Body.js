import {
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

const Body = () => {
  // storage

  return (
    <div>
      <div className="flex justify-center border-r-yellow-600">
        <ButtonGroup>
          <Link
            to="/home"
            style={{ textDecoration: "none" }}
          >
            <Button className="font-semibold " style={{}}>
              Youtube Videos
            </Button>
          </Link>

          <Link
            to="/home/websites"
            style={{ textDecoration: "none" }}
          >
          <Button className="font-semibold " style={{}}>
            Websites
          </Button>
          </Link>

          <Link
            to="/home/paidcourse"
            style={{ textDecoration: "none" }}
          >
          <Button className="font-bold " style={{}}>
            Paid Courses
          </Button>
          </Link>

          <Link
            to="/home/books"
            style={{ textDecoration: "none" }}
          >
          <Button className=" font-semibold " style={{}}>
            Books
          </Button>
          </Link>
        </ButtonGroup>
      </div>
      <Typography variant="" className="mt-6 font-bold text-3xl">
        Web Development
      </Typography>

      <div className="mt-10">
        <Button variant="contained" color="secondary">
          Show All Courses
        </Button>
      </div>
    </div>
  );
};

export default Body;
