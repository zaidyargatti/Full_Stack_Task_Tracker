import { Router } from 'express'
import protect from '../middelware/auth.middleware.js'
import { Create_Project, Delete_Project, Get_User_Projects,Get_Single_Project } from '../controllers/project.controller.js'

const path=Router()
path.post('/create-project',protect,Create_Project)
path.get('/projects',protect,Get_User_Projects)
path.delete('/delete-project/:id',protect,Delete_Project)
path.get('/project/:id', protect, Get_Single_Project);

export default path