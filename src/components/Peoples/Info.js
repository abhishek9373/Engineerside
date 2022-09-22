import { AccountCircle, ArrowBack } from "@mui/icons-material";
import { Button, Chip, Paper, Typography } from "@mui/material";
import { height } from "@mui/system";
import React, { useState } from "react";

const Info = () => {
  const collegename = localStorage.getItem("usercardcollege");
  const doaminname = localStorage.getItem("usercarddomain");
  const name = localStorage.getItem("usercardname");
  const otherskills = "";

  const goback = () =>{
    window.history.back(-1)
  }

  return (
    <div>
      <div className="text-left pl-2">
        <ArrowBack onClick={goback} />
      </div>
      <div className="flex mt-8 justify-center ">
        <div className=" h-40 w-40 rounded-full fixed top-44 md:mt-1 ">
          <AccountCircle sx={{ height: 180, width: 180 }} />
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className="h-96 mt-48 md:w-2/3 md:mt-32 bg-slate-500 pt-5 rounded"
          style={{ width: "80%" }}
        >
          <div className="">
            <div className="text-white font-bold text-2xl">
              {name}
              <br />
              <Typography>
                Student at {collegename}
                <br />
                {doaminname}
              </Typography>
            </div>
          </div>
          <div className="flex flex-wrap justify-center p-3 space-x-2">
            <div className="text-white font-bold text-2xl space-y-2">
              Other Skills
              <br />
              <Chip label="C++" className="text-white" />
              <Chip label="Java" className="text-white" />
              <Chip label="Python" className="text-white" />
              <br />
              <Typography>abhishekgund500@gmail.com</Typography>
              <Button variant="contained" className="mt-3">
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
