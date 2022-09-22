import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Peoples from "./components/Peoples";
import Posts from "./components/Posts";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Middlewere from "./components/Middlewere";
import Youtubevideo from "./components/courses/Youtubevideo";
import Websites from "./components/courses/Websites";
import Paidcourse from "./components/courses/Paidcourse";
import Books from "./components/courses/Books";
import Info from "./components/Peoples/Info";
import Afterpopup from "./components/Afterpopup";
import { useState } from "react";

function App() {

  // const navigate = useNavigate();
  // const [cond,setcond] = useState();

  // function data (dt){
  //   setcond(dt);
  // }
 
  return (
    <div className="App" >
      <BrowserRouter>
        {<Navbar />}
        <Routes>
          <Route path="/" element={<Middlewere Comp={Login} />}></Route>
          <Route path="/home" element={<Middlewere Comp={Youtubevideo} />}></Route>
          <Route path="/peoples" element={<Middlewere Comp={Peoples} />} />
          <Route path="/posts" element={<Middlewere Comp={Posts} />} />         
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home/websites" element={<Websites />}></Route>
          <Route path="/home/paidcourse" element={<Paidcourse />}></Route>
          <Route path="/home/books" element={<Books />}></Route>
          <Route path="/peoples/info" element={<Info/>}/>
          <Route path="/signup/afterpopup" element={<Afterpopup />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
