import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const DB_connect = async () =>{
    try {
        const Instance_connection = await mongoose.connect(`${process.env.DB_URL}`)
        console.log(`MongoDB Connected ! || ${Instance_connection.connection.host}`)
    } catch (error) {
        console.log("Data base connection error",error)
        process.exit(1)
    }
}

export default DB_connect