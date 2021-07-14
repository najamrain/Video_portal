import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    marginRight: 20,
    background: "#eeedee",
  },
  media: {
    height: 140,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function VideoCard(props) {
  const [isPlay, setIsPlay] = useState([true]);
  const classes = useStyles();
  const { recording } = props;

  const play = () => {
    setIsPlay(false);
    document.getElementById(recording.id).play();
  };

  const pause = () => {
    setIsPlay(true);
    document.getElementById(recording.id).pause();
  };

  return (
    <Card className={classes.root}>
      {recording.video_file ? (
        <CardMedia
          id={recording.id}
          className={classes.media}
          component="video"
          image={recording.video_file}
        />
      ) : (
        <div style={{justifyContent: "center", display: "grid"}}>
          <video
            id={recording.id}
            style={{ width: 200 }}
            src={recording.video_blob_url}
          />
        </div>
      )}

      <div className={classes.controls}>
        {isPlay ? (
          <IconButton aria-label="play/pause" onClick={play}>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
        ) : (
          <IconButton aria-label="play/pause" onClick={pause}>
            <PauseIcon className={classes.playIcon} />
          </IconButton>
        )}
      </div>
    </Card>
  );
}
