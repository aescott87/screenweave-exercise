const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const videoPlayer = require('./routes/videoPlayer.router');
const PORT = process.env.PORT || 5000;
const io = require('socket.io')();

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
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });
});