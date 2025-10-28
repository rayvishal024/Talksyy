import express from 'express'
import {createServer} from 'node:http'
import app from './app.js'
import connDB from './db/db-conn.js'
import dotenv from 'dotenv';
import { Server } from 'socket.io'

dotenv.config();

// creating server
const server = createServer(app);

// io instance for connection
export const io = new Server(server);

// creating a map for user & socket details
export const userSocketMap = {};

// creating connection event
io.on('connection', (socket) => {

     // finding userid of connecting client
     const userId = socket.handshake.query.userId;

     // map this user to usersocketmap
     if (userId) {
          userSocketMap[userId] = socket.id;
     }

     // update the online cliend details on currentOnlineUsers event
     io.emit('currentOnlineUsers', Object.keys(userSocketMap));

     // any client goes offline then we have to update usersocketmao & onlineuser details
     // on disconnect event
     socket.on('disconnect', () => {
          delete userSocketMap[userId];
          io.emit('currentOnlineUsers', Object.keys(userSocketMap));
     })

})

const PORT = process.env.PORT || 3000;

connDB()
     .then(() => {
          server.listen(PORT, () => {
           console.log("Server is running & Connect database")
      })
     }).catch((error) => {
          console.log("Error :: server.js", error.message);
 })