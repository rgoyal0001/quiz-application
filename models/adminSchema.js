import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model */
const adminModel = new Schema({
    name : { type : String },
    email : { type : String, default : ''},
    password : { type : String, default : ''},
});

export default mongoose.model('admins', adminModel);