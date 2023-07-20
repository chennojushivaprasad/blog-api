import mongoose from "mongoose";


const Schema = mongoose.Schema


const blogsSchema = new Schema({
    title:{type:String,required:true},
    imgUrl:{type:String,required:true},
    description:{type:String,required:true},
    publishedDate:{type:Date,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"User",required:true}

}) 

export default mongoose.model('Blog',blogsSchema)