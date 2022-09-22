import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";
import Peoplecards from "./Peoples/Peoplecards";
import { ArrowBack } from "@mui/icons-material";

const Peoples = () => {
  // people storage

  const [myid, setmyid] = useState(localStorage.getItem("myid"));
  const [allpeoples, setallpeoples] = useState([]);
  const [howmanypeople, sethowmanypeople] = useState(true);
  const[connected,setconnected] = useState();

  const sethowpeople = () => {
    sethowmanypeople(false);
    console.log("changed to connections");
  };

  const sethowpeople2 = () => {
    sethowmanypeople(true);
    console.log("changed to all");
  };

  // retrive peoples from mongodb
  const getpeoples = useMemo(() => {
    axios
      .post(`http://localhost:4000/getpeoples/?all=${howmanypeople}`, {
        myid: myid,
      })
      .then((e) => {
        // all courses
        if (e.data.term == 1) {
          console.log("no data");
          console.log(e.data.term);
          setallpeoples(e.data.data);
          console.log(e.data.connectionarray[1])
          setconnected(e.data.connectionarray)
        } else {
          setallpeoples(null);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [howmanypeople]);

  // go back function
  const goback = () =>{
    window.history.back(-1)
  }
  const[tmp,settmp] = useState(0);

  return (
    <div>
      <div>
        <div className="text-left pl-2">
          <ArrowBack onClick={goback}/>
        </div>
        <div className="flex justify-center m-4">
          <ButtonGroup>
            <Button variant="contained" onClick={sethowpeople2}>
              All
            </Button>
            <Button variant="contained" onClick={sethowpeople}>
              Connections
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          {allpeoples == null ? (
            <span style={{ textAlign: "center" }}>
              You Have No Connections Yet
            </span>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-3 p-2">
            {allpeoples?.map((it, i) => {
              return (
                <div key={i}>
                  <Peoplecards
                    name={it.name}
                    domain={it.domain}
                    college={it.college}
                    conditionforconnect={howmanypeople}
                    connected={connected[i]==it.id?true:false}
                  />
                  {/* {connected[i]==it.id?settmp(tmp+1):''} */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peoples;
