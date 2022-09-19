import React, { useState } from "react";
import { app } from "./firebase/Firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Loadingbar from "./assets/Loadingbar";

const Middlewere = (props) => {
  const { Comp } = props;
  const auth = getAuth(app);
  const [show,setshow] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setshow(true);
        // navigate("/home");
      } else {
        setshow(false);
      }
    });
  }, []);

  return (
    <div>
        {show ? <Comp /> : <Login />}
    </div>
  );
};

export default Middlewere;
