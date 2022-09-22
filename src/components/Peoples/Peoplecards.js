import { Card, CardContent, CardHeader, CardMedia, Paper } from "@mui/material";
import React, { useState } from "react";
import { Avatar, Chip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Peoplecards = (props) => {
  const namee = props.name;
  const domaine = props.domain;
  const college = props.college;
  const conditionforconnect = props.conditionforconnect;
  const ifconnect = props.connected;

  const setusercokie = () => {
    localStorage.setItem("usercardname", `${namee}`);
    localStorage.setItem("usercarddomain", `${domaine}`);
    localStorage.setItem("usercardcollege", `${college}`);
  };

  return (
    <>
      <Card style={{ textAlign: "center" }}>
        <CardMedia>
          <Avatar
            className="m-auto mt-2"
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            sx={{ width: 100, height: 100 }}
          />
        </CardMedia>
        <Paper>
          <div onClick={setusercokie}>
            <Link to="/peoples/info" style={{ textDecoration: "none" }}>
              <CardHeader
                title={`${namee}`}
                subheader={`Student at ${college}`}
              />
            </Link>
          </div>

          <CardContent>
            <Chip label={`Domain: ${domaine}`} />
          </CardContent>
          <CardContent>
            <Chip
              label={`${!conditionforconnect|| ifconnect ? "Message" : "Connect"}`}
              color="secondary"
              className="hover:cursor-pointer"
              icon={<Add />}
            />
          </CardContent>
        </Paper>
      </Card>
    </>
  );
};

export default Peoplecards;
