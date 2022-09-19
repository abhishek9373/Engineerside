import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "./firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { async } from "@firebase/util";
import Login from "./Login";

export default function Signup() {
  // mongodb

  const auth = getAuth(app);
  const usenavigate = useNavigate();
  const senddt = async () => {
    console.log(
      Name +
        email +
        pass +
        depart +
        yearofstudy +
        domain +
        college +
        contact +
        repass
    );

    axios
      .post("http://localhost:4000/getdata", {
        Name,
        email,
        pass,
        depart,
        yearofstudy,
        domain,
        college,
        contact,
        repass,
      })
      .then((e) => {
        console.log(e.data);
        createUserWithEmailAndPassword(auth, email, pass)
          .then(() => {
            alert("Account Created Login Now");
            navigate("/");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Signup with google
  const provider = new GoogleAuthProvider();
  function signupwithgoogle() {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        navigate("/home");
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function setuser() {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        // navigate("/");
        console.log("login success");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const navigate = useNavigate();
  //storage
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [depart, setdepartment] = useState("");
  const [yearofstudy, setyearofstudy] = useState("");
  const [domain, setdomain] = useState("");
  const [college, setcollege] = useState("");
  const [contact, setcontact] = useState("");
  const [repass, setrepass] = useState("");

  function next() {
    navigate("/");
  }

  //   Autocomplete data
  const department = [
    { label: "COMPUTER" },
    { label: "MECHANICAL" },
    { label: "CIVIL" },
    { label: "IT" },
    { label: "ENTC" },
    { label: "CHEMICAL" },
    { label: "ELECTRONICS" },
    {
      label: "BCA",
    },
    { label: "BCS" },
  ];
  const [departforselect, setdepartforselect] = React.useState(
    department[null]
  );

  const years = [
    {
      label: "1st",
    },
    { label: "2nd" },
    { label: "3rd" },
    {
      label: "4th",
    },
  ];
  const [yearsforselect, setyearsforselect] = React.useState(years[null]);

  const Domain = [
    {
      label: "DATASTRUCTUTRES AND ALGORITHMS",
    },
    { label: "WEB DEVELOPMENT" },
    { label: "ANDROID DEVELOPMENT" },
    {
      label: "DATA SCIENCE",
    },
    {
      label: "MACHINE LEARINING",
    },
    { label: "CLOUD COMPUTING" },
    { label: "CYBERSECURITY" },
    {
      label: "BLOCKCHAIIN",
    },
  ];
  const [domainforselect, setdomainforselect] = React.useState(Domain[null]);

  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ marginTop: "30px" }} className="text-2xl">
        Sign Up
      </h2>
      <div
        style={{
          display: "inline-flex",
          width: "60%",
          marginTop: "0px",
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
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              required
              onChange={(item) => {
                setName(item.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              required
              onChange={(item) => {
                setemail(item.target.value);
              }}
            />
          </div>
          <div className="mb-3 flex justify-center">
            <Autocomplete
              disablePortal
              required
              id="combo-box-demo"
              value={departforselect}
              onChange={(event, newValue) => {
                setdepartforselect(newValue);
                console.log(newValue.label);
                setdepartment(newValue.label);
              }}
              options={department}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select department" />
              )}
            />
            <Autocomplete
              disablePortal
              required
              id="combo-box-demo"
              options={years}
              sx={{ width: 300 }}
              value={yearsforselect}
              onChange={(event, newValue) => {
                setyearsforselect(newValue);
                console.log(newValue.label);
                setyearofstudy(newValue.label);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Year of study" />
              )}
            />
          </div>
          <div className="mb-3 flex justify-center">
            <Autocomplete
              disablePortal
              required
              id="combo-box-demo"
              options={Domain}
              sx={{ width: 300 }}
              value={domainforselect}
              onChange={(event, newValue) => {
                setdomainforselect(newValue);
                console.log(newValue.label);
                setdomain(newValue.label);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Choose your domain" />
              )}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              College Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="exampleInputPassword1"
              onChange={(item) => {
                setcollege(item.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contact No
            </label>
            <input
              type="number"
              required
              className="form-control"
              id="exampleInputPassword1"
              onChange={(item) => {
                setcontact(item.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                required
                className="form-control"
                id="exampleInputPassword1"
                onChange={(item) => {
                  setpass(item.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Re-enter password
              </label>
              <input
                type="password"
                required
                className="form-control"
                id="exampleInputPassword1"
                onChange={(item) => {
                  setrepass(item.target.value);
                }}
              />
            </div>
          </div>
          <button onClick={senddt} className="btn btn-primary">
            Submit
          </button>
          &nbsp;&nbsp;
          <br />
          <span>Already a user&nbsp;&nbsp;</span>
          <button
            className="btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <br />
          <br />
          <button className="btn btn-danger" onClick={signupwithgoogle}>
            Signin with google
          </button>
        </form>
      </div>
    </div>
  );
}
