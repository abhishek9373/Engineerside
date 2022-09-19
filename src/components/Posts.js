import { Add, DoubleArrow, EmojiEmotions } from "@mui/icons-material";
import { Button, ButtonGroup, Chip, Container, Paper, TextField } from "@mui/material";
import { bgcolor } from "@mui/system";
import React from "react";

const Posts = () => {
  return (
    <div>
      <div className="flex flex-col justify-center p-2">
        <Container className="w-auto">
          <Paper
            style={{ textAlign: "center" }}
            className="m-6 text-2xl p-3"
            sx={{ color: "red" }}
          >
            Posts
          </Paper>
        </Container>

        {/* posts */}

        <Container className="w-md bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800 rounded ">
          refer
        </Container>
      </div>

      <div
        className="m-auto flex justify-center p-2  right- row-auto w-96"
        style={{ alignItems: "center" }}
      >
        <div className="fixed bottom-0 p-4">
          <ButtonGroup>
            <EmojiEmotions sx={{color:'yellow' ,bgcolor:'black',height:49,width:49}}  className='rounded-full'/>
            <input
              type=""
              name=""
              className="h-12 bg-slate-600 text-white text-xl"
              style={{ width: "50vh" }}
            ></input>
            <Button variant="contained">Post</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Posts;
