import mongoose from "mongoose";



// Calling Schema class
const Schema = mongoose.Schema; // class

// Creating Structure of the collection i.e., user collection
// class Schema() -> structures the collection
//  structure is assigned to userSchema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 4 },
  blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true}]

});



// mongoose.model() is used to create collection
// Creating collection named "User" but in mogodb it converted form "User" to users (with all small letters and plural form)
// here User or users is a Collection and userSchema is a collection structure
const userModel = mongoose.model("User", userSchema);

export default userModel