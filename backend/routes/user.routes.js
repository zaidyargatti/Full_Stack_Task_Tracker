import {Router} from 'express';
import protect from '../middelware/auth.middleware.js';
import { login, checkAuth, signup } from '../controllers/user.controller.js';

const route = Router()

route.post('/signup',signup)
route.post('/login',login)
route.get('/me',protect,checkAuth)

export default route