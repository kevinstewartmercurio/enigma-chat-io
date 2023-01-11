import express, { Router} from 'express';
const router = Router();
const app = express();
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
// const http = require('http').Server(app);
import { join } from 'path';
// const io = require('socket.io')(http);

import Message from './Message.js';

// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// require('dotenv').config({path: '../.env'});
import dotenv from "dotenv";
dotenv.config({path: '../.env'});
const uri = process.env.MONGODB_URI;
// || "mongodb+srv://kevinstewartmercurio:ri2SVriEjJFupxeT@clusterksm.ahcsbsm.mongodb.net/&retryWrites=true&w=majority";
const port = process.env.PORT;
//|| 5000;

import { MongoClient } from 'mongodb';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const database = client.db("enigma-chat-io");
const dbMsgs = database.collection("messages");

import {dirname} from "path";
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/', express.static(join(__dirname, '..', 'client', 'build')));
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
      // when changing origin, also change proxy in client/package.json
      // http://localhost:5000, https://enigma-chat-io.herokuapp.com/
      // origin: 'http://localhost:3000',
      origin: 'https://enigmachat.io',
      methods: ['GET', 'POST'],
  },
});

router.get('/', (_req, res, _next) => {
  res.status(200).send("Hi, It works!")  
});


io.on('connection', async (socket) => {
  const randomInt = Math.floor(Math.random() * 99999999);
  const randomName = "user" + randomInt.toString();

  // Get the last 10 messages from the database.
  // Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
  //   if (err) return console.error(err);

  //   // Send the last messages to the user.
  //   socket.emit('init', messages);
  // });
  const cursor = dbMsgs.find({});
  let messages = [];
  await cursor.forEach((msg) => messages.push(msg));
  socket.emit('init', messages, randomName);


  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      // name: msg.name,
      name: randomName,
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