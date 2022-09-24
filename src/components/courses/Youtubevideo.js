import {
  Button,
  ButtonGroup,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import React, { useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Youtubevideo = () => {
  const [howdata, sethowdata] = useState("true");
  const [coursedata, setcoursedata] = useState([]);

  const getcdt = useMemo(() => {
    axios
      .post("http://localhost:4000/courses", {
        howdata,
      })
      .then((e) => {
        // all courses
        console.log(e.data);
        setcoursedata(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-center border-r-yellow-600">
        <ButtonGroup>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button className="font-semibold " style={{}}>
              Youtube Videos
            </Button>
          </Link>

          <Link to="/home/websites" style={{ textDecoration: "none" }}>
            <Button className="font-semibold " style={{}}>
              Websites
            </Button>
          </Link>

          <Link to="/home/paidcourse" style={{ textDecoration: "none" }}>
            <Button className="font-bold " style={{}}>
              Paid Courses
            </Button>
          </Link>

          <Link to="/home/books" style={{ textDecoration: "none" }}>
            <Button className=" font-semibold " style={{}}>
              Books
            </Button>
          </Link>
        </ButtonGroup>
      </div>
      <div className="p-2 flex justify-center">
        {coursedata ? (
          <div>
            <div className="flex justify-center p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-2 gap-1 p-2 justify-center">
                {coursedata.map((item, i) => (
                  <div className="" key={i}>
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=gfDE2a7MKjA"
                      width={380}
                      height={300}
                      controls={true}
                      pip={true}
                    />
                    <span className="font-bold text-2xl">Code With Harry</span>
                    <br />
                    <span className="font-bold">Html,CSS In 2 Hours</span>
                    <br />
                    <Button>Start Course</Button>
                  </div>
                ))}

                {/* <div className="">
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=WG6w2THNcRc"
                    controls={true}
                    width={380}
                    height={300}
                  />
                  <span className="font-bold text-2xl">Code With Harry</span>
                  <br />
                  <span className="font-bold">Html,CSS In 2 Hours</span>
                  <br />
                  <Button>Start Course</Button>
                </div> */}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 space-x-2 justify-center m-auto">
            <Skeleton variant="rounded" width={380} height={300} />
            <Skeleton variant="rounded" width={380} height={300} />
            <Skeleton variant="rounded" width={380} height={300} />
            <Skeleton variant="rounded" width={380} height={300} />
            <Skeleton variant="rounded" width={380} height={300} />
            <Skeleton variant="rounded" width={380} height={300} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Youtubevideo;
