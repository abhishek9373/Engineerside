import React, { useState } from "react";
import { app } from "./firebase/Firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Loadingbar from "./assets/Loadingbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Middlewere = (props) => {
  const { Comp } = props;
  const auth = getAuth(app);
  const [show, setshow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth") != 'null') {
      axios
        .post("http://localhost:4000/middlewarecheck", {
          token: localStorage.getItem("auth"),
        })
        .then((e) => {
          if (e.data) {
            console.log("Comp is visible")
            setshow(true);
          }
          else{
            localStorage.setItem('auth',null);
            console.log("problem")
            // window.location.reload();
            navigate('/');
          }
        }).catch((e)=>{
          console.log(e)
        })
    } else {
      setshow(false)
      navigate('/');    }
  },[show]);

  return <>{show ? <Comp /> : ''}</>;
};

export default Middlewere;
