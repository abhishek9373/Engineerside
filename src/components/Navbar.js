import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Body from "./Body";
import { app } from "./firebase/Firebase";

const Navbar = () => {

  const navigate = useNavigate();
  // signout function

  const auth = getAuth(app);
  
  const signout = async () =>{

    await signOut(auth);
    navigate('/');

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-3xl" to='/home'>
          Engineerside
        </Link>
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
            <Link className="nav-link m-2" to="/peoples">
              Peoples
            </Link>
            <Link className="nav-link m-2" to="/posts">
              Posts
            </Link>
            <Link className="nav-link m-2" to="/">
              Projects
            </Link>
            <span className="nav-link m-2 hover:cursor-pointer" onClick={signout}>
              Signout
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
