import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  country: {
    type: String,
    required: true,
  }
}, { timestamps: true });

UserSchema.pre('save',async function (next) {
    if(!this.isModified('password'))next()

    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.matchPassword = async function (enteredpassword) {
    
    const ismatch = await bcrypt.compare(enteredpassword,this.password)
    console.log("Password match result:",ismatch)
    return ismatch
}

const User = mongoose.model('User', UserSchema);
export default User;
