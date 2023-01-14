import express, { Router} from 'express';
const router = Router();
const app = express();
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join } from 'path';

import Message from './Message.js';

import dotenv from "dotenv";
dotenv.config({path: '../.env'});
// const uri = process.env.MONGODB_URI;
// const port = process.env.PORT;
const uri = "mongodb+srv://kevinstewartmercurio:Yfow4EaW1Au0eTcK@clusterksm.ahcsbsm.mongodb.net/?retryWrites=true&w=majority";
const port = 5000;

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

  // Get messages from the database.
  const cursor = dbMsgs.find({});
  let messages = [];
  await cursor.forEach((msg) => messages.push(msg));
  socket.emit('init', messages, randomName);


  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      name: randomName,
      content: msg.content
    });

    // Save the message to the database.
    dbMsgs.insertOne(message);

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});