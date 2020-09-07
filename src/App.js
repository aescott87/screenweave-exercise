import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import './App.css';
const socket = openSocket('http://localhost:5000');


class App extends Component {

  subscribeToTimer = (callback) => {
    socket.on('timer', timestamp => callback(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }

  constructor(props) {
    super(props);
    
    this.subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  state = {
    timestamp: 'No timestamp yet'
  };

  render() {
    return (
      <div className="App">
        <p>This is the timer value: {this.state.timestamp}</p>
        <h1>Video Player:</h1>
        <div className="videos">
          <h2>Video 1:</h2>
          <video width="400" height="320" controls>
            <source src="http://reflect-tightytv-vod.cablecast.tv/vod/2-TRMS-Medium-v1.mp4" type="video/mp4" />
          </video>
          <h2>Video 2:</h2>
          <video width="400" height="320" controls>
            <source src="http://reflect-tightytv-vod.cablecast.tv/vod/3-NAB-2014-Artbeats-30min-High-v4.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

export default App;
