import express from 'express'
import app from './app.js'
import connDB from './db/db-conn.js'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

connDB()
     .then(() => {
          app.listen(PORT, () => {
           console.log("Server is running & Connect database")
      })
     }).catch((error) => {
          console.log("Error :: server.js", error.message);
 })