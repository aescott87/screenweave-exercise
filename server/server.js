const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const io = require('socket.io')();
// Set up variables for total viewer count, and viewer count for each video
let totalCount = 0;
let videoOneCount = 0;
let videoTwoCount = 0;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for post/put requests
app.use(express.static('build'));

/** ---------- SOCKET SETUP ---------- **/
io.listen(PORT);
console.log('Listening on port ', PORT);

// Set up socket connection
io.on('connection', (client) => {
    // Make sure new client connection can view current total viewer count 
    client.emit('totalViewerCount', totalCount);
    // Establish what happens when any video is played
    client.on('play', (videoId) => {
        // This will update the total viewer count and emit that count to all socket connections
        totalCount += 1
        io.sockets.emit('totalViewerCount', totalCount);
        // If a viewer plays video 1, this will update the viewer count for that video
        // and will emit that viewer count to all socket connections
        if(videoId === 1) {
            videoOneCount += 1
            io.sockets.emit('videoOneCount', videoOneCount);
        // If a viewer plays video 2, this will update the viewer count for that video
        // and will emit the viewer count to all all socket connections
        } else if(videoId === 2) {
            videoTwoCount += 1
            io.sockets.emit('videoTwoCount', videoTwoCount);
        }
    });
    // Establishes what happens when a video is paused or playback ends
    client.on('pause', (videoId) => {
        // This will update the total viewer count and emit to all socket connections
        totalCount -= 1
        io.sockets.emit('totalViewerCount', totalCount);
        // If a viewer pauses or finishes playback of video 1, viewer count will update
        // and will emit the updated viewer count to all socket connections
        if(videoId === 1) {
            videoOneCount -= 1
            io.sockets.emit('videoOneCount', videoOneCount);
        // If a viewer pauses or finishes playback of video 2, viewer count will update
        // and will emit the updated viewer count to all socket connections
        } else if(videoId === 2) {
            videoTwoCount -= 1
            io.sockets.emit('videoTwoCount', videoTwoCount);
        }
    });
});

