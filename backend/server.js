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
const allowed=["https://full-stack-task-tracker.vercel.app",
    "https://full-stack-task-tracker-git-main-9928zaid-gmailcoms-projects.vercel.app",
     "https://full-stack-task-tracker-cf5qk0w99-9928zaid-gmailcoms-projects.vercel.app",
    " http://localhost:5173/"]
app.use(cors({
    origin:allowed,
    credentials:true
}))
app.use(express.json())


app.use('/user',route)

app.use('/user-project',path)

app.use('/user-task',way)

app.get('/',(req,res)=>{
    res.send("Hello wolrd ho gaya na bhai ")
})

const PORT=process.env.PORT || 2000
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})