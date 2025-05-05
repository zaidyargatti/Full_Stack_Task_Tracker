import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DB_connect from './config/db.config.js';
import route from './routes/user.routes.js';
import path from './routes/project.routes.js';
import way from './routes/task.routes.js';

DB_connect()

dotenv.config()
const app=express()

app.use(cors())
app.use(express.json())


app.use('/user',route)

app.use('/user-project',path)

app.use('/user-task',way)



const PORT=process.env.PORT || 2000
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})