import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";

import { app } from "./firebase/Firebase";
import axios from "axios";
import Loadingbar from "./assets/Loadingbar";
import { async } from "@firebase/util";

export default function Login(props) {
  // constants
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { Comp } = props;

  // storage
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  // check if user login or not
  const [checkstat, setcheckstat] = useState(false);
  const [notdisplayloginpage, setnondisplayloginpage] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("I am directly moving from signup");
        if (Comp) {
          setnondisplayloginpage(true);
        }
         else {
          console.log("loginpage");
          setnondisplayloginpage(true);
          // navigate('/home')
          //mahit nahi kadhu shakto
        }
        // navigate("/home");
      } else {
        console.log("No user");
        setnondisplayloginpage(true);
      }
    });
  }, []);
  useEffect(()=>{

  })

  // login function
  const setuser = async () => {
    axios
      .post("http://localhost:4000/login", {
        email,
        pass,
      })
      .then((e) => {
        console.log(e.data);
        if (e.data) {
          signInWithEmailAndPassword(auth, e.data.email, pass)
            .then(() => {
              console.log("Login Success");
              console.log(e.data);
              localStorage.setItem("myid", `${e.data.id}`);
              setcheckstat(true);
              navigate("/home");
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          console.log(e.data);
          alert("User Not found");
        }
      })
      .catch((e) => {
        console.log("axios error");
      });
  };

  // signinwith popup
  const provider = new GoogleAuthProvider();
  const signupwithgoogle = () => {

    
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = auth.currentUser;
        localStorage.setItem("afterpopupemail", user.email);
        localStorage.setItem("afterpopupName", user.displayName);
        axios
          .post("http://localhost:4000/middle", {
            email: user.email,
          })
          .then((e) => {
            if (e.data.id) {
              localStorage.setItem("myid", e.data.id);
              navigate("/home");
            } else {
              signOut(auth).then(() => {
                navigate("/signup/afterpopup");
              });
            }
          });
        // name and email set to session storage
        console.log("name and email set to session storage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="">
      {Comp ? (
        <Comp />
      ) : (
        <div>
          {notdisplayloginpage ? (
            <div>
              {" "}
              <h2 style={{ marginTop: "30px" }} className="text-2xl">
                Login
              </h2>
              <div
                style={{
                  display: "inline-flex",
                  width: "60%",
                  marginTop: "20px",
                  paddingBottom: "20px",
                  borderRadius: "7px",
                  padding: "20px",
                }}
                className="border border-primary"
              >
                <form
                  style={{ width: "75%", margin: "auto" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      onChange={(item) => {
                        setemail(item.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={(item) => {
                        setpass(item.target.value);
                      }}
                    />
                  </div>
                  {/* onClick={setuser} */}
                  <button className="btn btn-primary" onClick={setuser}>
                    Submit
                  </button>
                  &nbsp;&nbsp;
                  <br />
                  <span>Not a user&nbsp;&nbsp;</span>
                  {/* onClick={next} */}
                  <button
                    className="btn"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign up
                  </button>
                  <br />
                  or
                  <button className="btn" onClick={signupwithgoogle}>
                    Login With google
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Loadingbar />
          )}
        </div>
      )}
    </div>
  );
}
