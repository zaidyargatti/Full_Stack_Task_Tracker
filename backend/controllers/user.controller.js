import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
       expiresIn:'30d'
    })
   }

const signup = async (req, res) =>{
    try {
        const {name,email,password,country}=req.body

        const existUser= await User.findOne({email})
        if(existUser){
        return res.status(400)
         .json({
            message:"Email already exist "
         })
        }

        const CreatingUser = await User.create({
            name,
            email,
            password,
            country
        })
        const token = generateToken(CreatingUser._id)
        res.status(200)
        .json({
            CreatingUser,
            token
        })
    } catch (error) {
        res.status(500)
        .json({
            message:"Internal server error",
            error:error.message
        })
    }
}

const login = async (req, res) =>{
    try {
        const {email,password}=req.body
        const user = await User.findOne({email})
        if(!user)
        {
        return res.status(404)
        .json({ 
            message: "User not found"
         });
        }

        const matchPassword = await user.matchPassword(password)
        if(!matchPassword){
            return res.status(401)
            .json({
                message:"Invalid email or password"
            })
        }
        const token = generateToken(user._id);
        res.status(200)
        .json({
            user,
            token
        })
    } catch (error) {
        res.status(500)
        .json({
            message:"Internal server error",
            error:error.message
        })
    }
}

export {
    signup,
    login
}