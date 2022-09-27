import { Add, DoubleArrow, EmojiEmotions } from "@mui/icons-material";
import io from "socket.io-client";
import {
  Badge,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { bgcolor } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { useMatch } from "react-router-dom";
import axios from "axios";
import { async } from "@firebase/util";

const socket = io.connect("http://localhost:4000");

const Messages = (props) => {
  // user typed message is store in a given state
  const [message, setmessage] = useState();
  const [myid, setmyid] = useState();
  const [chatdata, setchatdata] = useState([]);
  const [rid, setrid] = useState(props.id);

  // connect socket with server;

  // emit event using usememo to set users socketid to database

  // const memo = useMemo(() => {
  //   // get id of present user from backend
  //   // get all chats when page get loaded
  // }, [rid]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/getmyid", {
        token: localStorage.getItem("auth"),
      })
      .then((e) => {
        if (e.data) {
          console.log("id get from backend and send to save socketid");
          // emit event with name set_socketid
          setmyid(e.data.id);
          socket.emit("ghemyid", { myid: e.data.id });
          console.log(e.data.id);
          axios
            .post("http://localhost:4000/getmychats", {
              myid: e.data.id,
              oid: rid,
            })
            .then((e) => {
              if (e) {
                console.log(e.data);
                setchatdata(e.data);
              } else {
                console.log("no data err");
              }
            });
        }
      });
  }, [rid]);

  // accept chats
const updatechat = useMemo(()=>{
  socket.on("private-message", (data) => {
    console.log(data.text);

  });
},[])
  

  // function to send chats emi t event to send chats
  async function sendchats() {
    
    const allchatdata = chatdata;
    allchatdata.push({text:message,id:rid,sid:myid})

    socket.emit("ghemsg", { msg: message, rid: rid, sid: myid });
  }

  return (
    <div>
      <div className="flex flex-col justify-center p-2">
        <div
          style={{ textAlign: "center" }}
          className=" text-2xl rounded-full flex  justify-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 align-middle "
          sx={{ color: "red" }}
        >
          <div className="rounded-full">User Name</div>
        </div>
      </div>

      <div>
        {/* posts */}

        <Container className="rounded overflow-y-auto pl-2 pr-2">
          {chatdata.map((data, i) => {
           return <div key={i}>
              {data.sid == myid ? (
                <div className="flex justify-end  pl-3">
                  <div
                    className="bg-green-500 rounded p-2"
                    style={{ textAlign: "right" }}
                  >
                    {data.text}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start pr-3">
                  <div
                    className=" bg-emerald-500 rounded p-2"
                    style={{ textAlign: "left" }}
                  >
                    {data.text}
                  </div>
                </div>
              )}
            </div>;
          })}
        </Container>
      </div>

      <div
        className="m-auto flex justify-center p-2  row-auto w-md"
        style={{ alignItems: "center" }}
      >
        <div className="fixed bottom-0 p-4">
          <ButtonGroup>
            <EmojiEmotions
              sx={{ color: "yellow", bgcolor: "black", height: 49, width: 49 }}
              className="rounded-full"
            />
            <input
              type=""
              name=""
              className="h-12 w-64 bg-slate-600 text-white text-xl "
              onChange={(e) => {
                setmessage(e.target.value);
              }}
            ></input>
            <Button variant="contained" onClick={sendchats}>
              Post
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Messages;

// const getpeopledata = useMemo(()=>{
//     axios.post('/getmessages',{
//         id:props.id
//     }).then((data)=>{

//     })
// },[]);



