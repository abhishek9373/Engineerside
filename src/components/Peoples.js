import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";
import Peoplecards from "./Peoples/Peoplecards";

const Peoples = () => {
  // people storage

  const [myid, setmyid] = useState(sessionStorage.getItem('myid'));
  const [allpeoples, setallpeoples] = useState([]);
  const [howmanypeople, sethowmanypeople] = useState(true);
  
  const sethowpeople = () => {
    sethowmanypeople(false);
    console.log("changed");
  };

  const sethowpeople2 = () => {
    sethowmanypeople(true);
    console.log("changed");
  };

  // retrive peoples from mongodb
  const getpeoples = useMemo(() => {
    
    axios
      .post(`http://localhost:4000/getpeoples/?all=${howmanypeople}`, {
        myid:myid
      })
      .then((e) => {
        // all courses
        setallpeoples(e.data);
        console.log(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [howmanypeople]);

  return (
    <div>
      <div>
        <div className="flex justify-center m-4">
          <ButtonGroup>
            <Button variant="contained" onClick={sethowpeople2}>All</Button>
            <Button variant="contained" onClick={sethowpeople}>
              Connections
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-3 p-2">
            {allpeoples.map((it, i) => {
              return (
                <div key={i}>
                  <Peoplecards
                    name={it.name}
                    domain={it.domain}
                    college={it.college}
                  />
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
