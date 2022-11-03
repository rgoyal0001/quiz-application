import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model */
const questionModel = new Schema({

    statement:{type:String},
    options:{type:Array},
    optionType:{type:String,default:'single'},
    answers:{type:Array},
    difficulty:{type:Number,default:1}

});

export default mongoose.model('Question', questionModel);