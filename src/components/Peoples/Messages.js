import { Add, DoubleArrow, EmojiEmotions, Send } from "@mui/icons-material";
import { useRef } from "react";
import "./Message.css";
import io from "socket.io-client";
import {
  Badge,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Divider,
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
  const [message, setmessage] = useState("");
  const [myid, setmyid] = useState();
  const [chatdata, setchatdata] = useState([]);
  const [rid, setrid] = useState(props.id);
  const [username, setusername] = useState();
  const uname = props.name;

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
  useEffect(() => {
    socket.on("private-message", (data) => {
      setchatdata((p) => [...chatdata, data.schat]);
      console.log(chatdata);
    });
  });

  // function to send chats emi t event to send chats
  function sendchats() {
    if (message == "") {
    } else {
      socket.emit("ghemsg", { msg: message, rid: rid, sid: myid });
      setchatdata((p) => [
        ...chatdata,
        {
          id: myid,
          oid: rid,
          text: message,
          sid: myid,
          rid: rid,
        },
      ]);
      document.getElementById("reset").value = setmessage("");
    }
  }


  return (
    <div
      className="fixed w-screen"
      style={{ height: "88vh", overflow: "auto" }}
    >
      <div className="flex flex-col justify-center p-2">
        <div
          style={{ textAlign: "center" }}
          className=" text-2xl rounded-full flex  justify-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 align-middle "
          sx={{ color: "red" }}
        >
          <div
            className="rounded-full mb-3 font-bold text-slate-600 font-mono"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            {uname}
          </div>
        </div>
        <Divider />
      </div>

      <div style={{ height: "70%", overflow: "auto" }} className="inbrd">
        {/* posts */}

        {chatdata.length == 0 ? (
          <div>
            <h1 className="mt-12 text-3xl">No Messages..!</h1>
          </div>
        ) : (
          <Container className="rounded overflow-y-auto pl-2 pr-2" id="scrollit">
            {chatdata.map((data, i) => {
              return (
                <div key={i} className="font-bold font-sans" >
                  {data.sid == myid ? (
                    <div className="flex justify-end  pl-3 mt-2">
                      <div
                        className="bg-green-500 rounded p-2"
                        style={{ textAlign: "right" }}
                      >
                        {data.text}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start pr-3 mt-2">
                      <div
                        className=" bg-emerald-500 rounded p-2"
                        style={{ textAlign: "left" }}
                      >
                        {data.text}
                      </div>
                    </div>
                  )}
                </div>
                
              );
            })}
          </Container>
        )}
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
              id="reset"
              placeholder="Message..."
              value={message}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendchats();
                }
              }}
              name=""
              className="h-12 w-64 bg-slate-600 text-white text-xl p-1"
              onChange={(e) => {
                setmessage(e.target.value);
              }}
            ></input>
            <Button variant="contained" onClick={sendchats}>
              <Send />
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
