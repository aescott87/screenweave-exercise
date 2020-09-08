const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const videoPlayer = require('./routes/videoPlayer.router');
const PORT = process.env.PORT || 5000;
const io = require('socket.io')();
let totalCount = 0;
let videoOneCount = 0;
let videoTwoCount = 0;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for post/put requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/video-player', videoPlayer)

/** ---------- START SERVER ---------- **/
/*app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});*/

/** ---------- SOCKET SETUP ---------- **/
io.listen(PORT);
console.log('Listening on port ', PORT);

io.on('connection', (client) => {
    client.emit('totalViewerCount', totalCount);
    client.on('play', (videoId) => {
        totalCount += 1
        io.sockets.emit('totalViewerCount', totalCount);
        if(videoId === 1) {
            videoOneCount += 1
            io.sockets.emit('videoOneCount', videoOneCount);
        } else if(videoId === 2) {
            videoTwoCount += 1
            io.sockets.emit('videoTwoCount', videoTwoCount);
        }
    });
    client.on('pause', (videoId) => {
        totalCount -= 1
        io.sockets.emit('totalViewerCount', totalCount);
        if(videoId === 1) {
            videoOneCount -= 1
            io.sockets.emit('videoOneCount', videoOneCount);
        } else if(videoId === 2) {
            videoTwoCount -= 1
            io.sockets.emit('videoTwoCount', videoTwoCount);
        }
    });
});

