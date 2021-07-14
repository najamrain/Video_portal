/* eslint-env browser */
import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";

import NavBar from "../bar/NavBar";
import { RECORDING_API_URL } from '../../contants'
const videoType = "video/webm";

export default class VideoRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recordedVideo: "",
      videos: [],
      sliderValue: [0, 100],
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // show it to user
    this.video.srcObject = stream;
    this.video.play();

    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });

    // init data storage for video chunks
    this.chunks = [];

    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();

    // say that we're not recording
    this.setState({ 
      recording: false,
      sliderValue: [0, this.chunks.length]
    });
  
    // save the video to memory
    this.saveVideo();
  }

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: videoType });
    
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);

    // append videoURL to list of saved videos for rendering
    const videos = this.state.videos.concat([videoURL]);
    this.setState({ videos, recordedVideo: videoURL });
  }

  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    const videos = this.state.videos.filter((v) => v !== videoURL);
    this.setState({ videos });
  }

  deleteRecordedVideo = () => this.setState({ recordedVideo: "" });

  handleVideo = (e) => this.setState({ video: e.target.files[0] });

  uploadVideo = () => {
    if (!this.state.video) {
      alert("Please select video file and then click upload");
      return;
    }

    let formdata = new FormData();
    formdata.set("video_file", this.state.video);

    axios({
      url: RECORDING_API_URL,
      method: "POST",
      data: formdata,
    }).then(() => {
      alert("Video uploaded");
    });
  };

  uploadRecordedVideo = () => {
    let payload = {
      video_blob_url: this.state.recordedVideo,
    };

    axios
      .post(RECORDING_API_URL, payload)
      .then(() => alert("Video uploaded to server"));
  };

  setValue = (event, newValue) => {
    let selectedChunks = this.chunks.slice(newValue[0], newValue[1] + 1);
    const selectedBlob = new Blob(selectedChunks, { type: videoType });
    const videoURL = window.URL.createObjectURL(selectedBlob);

    this.setState({
      sliderValue: newValue,
      recordedVideo: videoURL,
    });
  };

  render() {
    const { recording, videos, recordedVideo } = this.state;

    return (
      <>
        <NavBar />
        <div style={{ display: "grid", justifyContent: "center" }}>
          <video
            style={{
              width: 400,
              marginBottom: 10,
              display: !recording && "none",
            }}
            ref={(v) => {
              this.video = v;
            }}
          >
            Video stream not available.
          </video>

          <div>
            {!recording && (
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => this.startRecording(e)}
              >
                Record Video
              </Button>
            )}
            {recording && (
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => this.stopRecording(e)}
              >
                Stop Recording
              </Button>
            )}
          </div>
        </div>

        {recordedVideo && (
          <div style={{ margin: 10 }}>
            <h3>Recorded video:</h3>
            <video style={{ width: 250 }} src={recordedVideo} autoPlay loop />
            <div>
              <Slider
                style={{ width: 250 }}
                value={this.state.sliderValue}
                onChange={this.setValue}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={this.chunks?.length}
              />
            </div>
            <div>
              <Button
                color="primary"
                variant="contained"
                style={{ marginRight: 10 }}
                onClick={this.deleteRecordedVideo}
              >
                Delete
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                color="primary"
                variant="contained"
                onClick={this.uploadRecordedVideo}
              >
                Upload File
              </Button>
            </div>
          </div>
        )}

        {/* <div
          style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
        >
          <Button color="primary" variant="contained" component="label">
            {this.state.video
              ? this.state.video.name + " selected"
              : "Select File to upload"}
            <input
              type="file"
              hidden
              accept="video/mp4,video/x-m4v,video/*"
              onChange={this.handleVideo}
            />
          </Button>
          {this.state.video && (
            <Button
              style={{ marginLeft: 10 }}
              color="primary"
              variant="contained"
              onClick={this.uploadVideo}
            >
              Upload File
            </Button>
          )}
        </div> */}

        {/* <div style={{ margin: 10 }}>
          {Array.isArray(videos) && videos.length > 0 && (
            <h3>Recorded videos:</h3>
          )}
          {videos.map((videoURL, i) => (
            <div key={`video_${i}`}>
              <video style={{ width: 200 }} src={videoURL} autoPlay loop />
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  onClick={() => this.deleteVideo(videoURL)}
                >
                  Delete
                </Button>
                <a href={videoURL} download="test.mp4">
                  Download{" "}
                </a>
              </div>
            </div>
          ))}
        </div> */}
      </>
    );
  }
}
