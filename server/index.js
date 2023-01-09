const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
// const http = require('http').Server(app);
const path = require('path');
// const io = require('socket.io')(http);

const Message = require('./Message');

// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

require('dotenv').config({path: '../.env'});
const uri = process.env.MONGODB_URI;
// || "mongodb+srv://kevinstewartmercurio:ri2SVriEjJFupxeT@clusterksm.ahcsbsm.mongodb.net/&retryWrites=true&w=majority";
const port = process.env.PORT;
//|| 5000;

const {MongoClient} = require('mongodb');
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const database = client.db("enigma-chat-io");
const dbMsgs = database.collection("messages");

app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      // origin: 'http://localhost:3000',
      origin: 'https://enigmachat.io',
      methods: ['GET', 'POST'],
  },
});

router.get('/', (_req, res, _next) => {
  console.log("success");
  res.status(200).send("Hi, It works!")  
});


io.on('connection', async (socket) => {
  // Get the last 10 messages from the database.
  // Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
  //   if (err) return console.error(err);

  //   // Send the last messages to the user.
  //   socket.emit('init', messages);
  // });
  const cursor = dbMsgs.find({});
  let messages = [];
  await cursor.forEach((msg) => messages.push(msg));
  socket.emit('init', messages);


  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      name: msg.name,
      content: msg.content
    });

    // Save the message to the database.
    // message.save((err) => {
    //   if (err) return console.error(err);
    // });
    const result = dbMsgs.insertOne(message);
    console.log(`document inserted with id: ${result.insertedId}`);

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});