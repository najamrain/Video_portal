import axios from "axios";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import NavBar from "../bar/NavBar";
import VideoCard from "./VideoCard";
import { RECORDING_API_URL } from '../../contants'

const Dashboard = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    axios.get(RECORDING_API_URL).then((res) => {
      setRecordings(res.data);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Grid container spacing={3}>
        {recordings.map((recording) => (
          <Grid item xs key={recording.id}>
            <VideoCard recording={recording}  />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
