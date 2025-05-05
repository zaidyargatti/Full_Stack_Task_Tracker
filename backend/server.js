import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DB_connect from './config/db.config.js';

DB_connect()

dotenv.config()
const app=express()

app.use(cors())
app.use(express.json())


const PORT=process.env.PORT || 2000

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})