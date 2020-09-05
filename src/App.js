import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Video Player:</h1>
      <div className="videos">
        <h2>Video 1:</h2>
        <video width="400" height="320" controls>
        <source src="http://reflect-tightytv-vod.cablecast.tv/vod/2-TRMS-Medium-v1.mp4" type="video/mp4" />
        </video>
        <h2>Video 2:</h2>
        <video width="400" height="320" controls>
        <source src="http://reflect-tightytv-vod.cablecast.tv/vod/52-CTV-Needs-Interns-Promo-High-v1.mp4" type="video/mp4" />
        </video>
        <h2>Video 3:</h2>
        <video width="400" height="320" controls>
        <source src="http://reflect-tightytv-vod.cablecast.tv/vod/3-NAB-2014-Artbeats-30min-High-v4.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default App;
