import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import './App.css';
const socket = openSocket('http://localhost:5000');

class App extends Component {

  state = {
    totalViewerCount: 0
  };

  componentDidMount() {
    socket.on('connect', () => {
      console.log('Client is connected.')
    });
    socket.on('totalViewerCount', (count) => {
      console.log(count);
      this.setState({
        totalViewerCount: count
      })
    })
  }

  

  render() {
    return (
      <div className="App">
        <p>Total Current Video Viewers: {this.state.totalViewerCount}</p>
        <h1>Video Player:</h1>
        <div className="videos">
          <h2>Video 1:</h2>
          <video id="vid1" width="400" height="320" controls onPlay={() => socket.emit('play', 1)}>
            <source src="http://reflect-tightytv-vod.cablecast.tv/vod/2-TRMS-Medium-v1.mp4" type="video/mp4" />
          </video>
          <h2>Video 2:</h2>
          <video id="vid2" width="400" height="320" controls onPlay={() => socket.emit('play', 2)}>
            <source src="http://reflect-tightytv-vod.cablecast.tv/vod/3-NAB-2014-Artbeats-30min-High-v4.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

export default App;
