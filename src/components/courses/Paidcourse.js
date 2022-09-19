import { Button,ButtonGroup } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Paidcourse = () => {
  return (
    <div>
      <div className="flex justify-center border-r-yellow-600">
        <ButtonGroup>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button className="font-semibold " style={{}}>
              Youtube Videos
            </Button>
          </Link>

          <Link to="/home/websites" style={{ textDecoration: "none" }}>
            <Button className="font-semibold " style={{}}>
              Websites
            </Button>
          </Link>

          <Link to="/home/paidcourse" style={{ textDecoration: "none" }}>
            <Button className="font-bold " style={{}}>
              Paid Courses
            </Button>
          </Link>

          <Link to="/home/books" style={{ textDecoration: "none" }}>
            <Button className=" font-semibold " style={{}}>
              Books
            </Button>
          </Link>
        </ButtonGroup>
      </div>
      There is no paid courses
    </div>
  );
};

export default Paidcourse;
