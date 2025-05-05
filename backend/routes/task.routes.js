import {Router} from 'express'
import protect from '../middelware/auth.middleware.js'
import { Create_Task, Delete_Task, Get_Task_By_Project, Toggle_Task } from '../controllers/task.controller.js'

const way = Router()

way.post('/create-task',protect,Create_Task)
way.get('/task/:projectId',protect,Get_Task_By_Project)
way.delete('/delete-task/:id',protect,Delete_Task)
way.put('/task-status/:id',protect,Toggle_Task)

export default way