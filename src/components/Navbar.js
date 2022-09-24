import { AccountBox } from "@mui/icons-material";
import { Badge, Button, ButtonGroup, Hidden } from "@mui/material";
import { height } from "@mui/system";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Body from "./Body";
import { app } from "./firebase/Firebase";
import MailIcon from "@mui/icons-material/Mail";

const Navbar = (props) => {
  const navigate = useNavigate();
  // signout function
  //

  const auth = getAuth(app);
  const [hidemenu,sethidemenu] = useState(false);

  useEffect(()=>{
    console.log("from navbar")
    if(localStorage.getItem('auth')!= 'null'){
      sethidemenu(true);
    }
  })

  const signout = async () => {
    // if (localStorage.getItem("auth") == null) {

    // } else {
    localStorage.setItem("auth", "null");
    sethidemenu(false);
    navigate("/");
    // }
  };


  const [temp, settemp] = useState(false);
  const [hidenbox, sethidenbox] = useState(true);

  const visibility = () => {
    if (!hidenbox) {
      document.getElementById("visibilityi1").className =
        "h-auto w-32 fixed top-12 right-0 rounded text-white border-2 hidden";
      sethidenbox(false);
    } else {
      document.getElementById("visibilityi1").className =
        "h-auto w-32 fixed top-12 right-0 rounded text-white border-2";
      sethidenbox(true);
    }
  };

  window.addEventListener("mousedown", (event) => {
    if (hidenbox) {
      document.getElementById("visibilityi1").className =
        "h-auto w-32 fixed top-12 right-0 rounded text-white border-2 hidden";
      sethidenbox(true);
    }
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className={`navbar-brand text-3xl ${!hidemenu ? 'hidden' : ''}`} to="/home" id="i1">
          Engineerside
        </Link>

        <span
          className="navbar-brand text-3xl fixed top-1 right-16 cursor-pointer"
          onClick={visibility}
        >
          <AccountBox sx={{ fontSize: 50 }} />
        </span>
        <span className=" text-3xl fixed top-3 right-36 cursor-pointer">
          <Badge color="secondary" badgeContent={69}>
            <MailIcon sx={{ fontSize: 50 }} />
          </Badge>
        </span>

        <div
          className="h-auto w-32 fixed top-10 right-10 rounded text-white border-2 hidden"
          id="visibilityi1"
        >
          <ButtonGroup orientation="vertical" variant="text">
            <Button className="text-white">Account Info</Button>
            <Button className="text-white">Setting</Button>
            <Button className="text-white">Help</Button>
            <Button className="text-white">Logout</Button>
          </ButtonGroup>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-2xl"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav m-6">
            <Link className={`nav-link m-2 ${!hidemenu ? 'hidden' : ''}`} to="/peoples" id="i2">
              Peoples
            </Link>
            <Link className={`nav-link m-2 ${!hidemenu ? 'hidden' : ''}`} to="/posts" id="i3">
              Posts
            </Link>
            <Link className={`nav-link m-2 ${!hidemenu ? 'hidden' : ''}`} to="/home" id="i4">
              Projects
            </Link>
            <span
              className={`nav-link m-2 hover:cursor-pointer ${!hidemenu ? 'hidden' : ''}`}
              onClick={signout}
              id="i5"
            >
              Signout
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
