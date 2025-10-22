import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DB_URL = process.env.DB_URL
const DB_Name = process.env.DB_NAME

if (!DB_URL || !DB_Name) {
     console.log("DB URL & Db name is missing !!")
}

const connDB = async () => {
     try {
          await mongoose.connect(`${DB_URL}/${DB_Name}`, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          })
     } catch (error) {
          console.log("DB-Conn :: ERROR while connecting...", error.message);
     }
}

export default connDB;