import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
       expiresIn:'30d'
    })
   }
   
   const signup = async (req, res) => {
    try {
      const { name, email, password, country } = req.body;
  
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }
  
      const CreatingUser = await User.create({
        name,
        email,
        password,
        country
      });
  
      const token = generateToken(CreatingUser._id);
  
      return res.status(201).json({
        message: "User registered successfully",
        user: CreatingUser,
        token
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  };
  

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

const checkAuth = (req, res) => {
    if (req.user) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
};
export {
    signup,
    login,
    checkAuth
}