import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import './App.css';
const socket = openSocket('http://localhost:5000');

class App extends Component {
  // set state for total viewer count, and individual video viewer count
  state = {
    totalViewerCount: 0,
    videoOneCount: 0,
    videoTwoCount: 0
  };

  // When component mounts, set up socket connection
  // and ability to communicate count updates from server
  componentDidMount() {
    socket.on('connect', () => {
      console.log('Client is connected.')
    });
    socket.on('totalViewerCount', (count) => {
      console.log(count);
      this.setState({
        totalViewerCount: count
      });
    });
    socket.on('videoOneCount', (count) => {
      console.log(count);
      this.setState({
        videoOneCount: count
      });
    });
    socket.on('videoTwoCount', (count) => {
      console.log(count);
      this.setState({
        videoTwoCount: count
      });
    });
  }

  render() {
    return (
      <div className="App">
        <p>Total Current Video Viewers: {this.state.totalViewerCount}</p>
        <h1>Video Player:</h1>
        <div className="videos">
          <h2>Video 1:</h2>
          <video id="vid1" 
          width="400" 
          height="320" 
          controls 
          onPlay={() => socket.emit('play', 1)}
          onPause={() => socket.emit('pause', 1)}>
            <source src="http://reflect-tightytv-vod.cablecast.tv/vod/2-TRMS-Medium-v1.mp4" type="video/mp4" />
          </video>
          <p>Current Viewers: {this.state.videoOneCount}</p>
          <h2>Video 2:</h2>
          <video id="vid2" 
          width="400" 
          height="320" 
          controls 
          onPlay={() => socket.emit('play', 2)}
          onPause={() => socket.emit('pause', 2)}>
            <source src="http://reflect-tightytv-vod.cablecast.tv/vod/3-NAB-2014-Artbeats-30min-High-v4.mp4" type="video/mp4" />
          </video>
          <p>Current Viewers: {this.state.videoTwoCount}</p>
        </div>
      </div>
    );
  }
}

export default App;
