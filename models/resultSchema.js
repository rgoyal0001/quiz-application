import mongoose from "mongoose";
const { Schema } = mongoose;


/** result model */
const resultModel = new Schema({
    correct : { type : Number, default : 0},
    wrong : { type : Number, default : 0},
    score : { type : Number, default : 0},
    createdAt : { type : Date, default : Date.now}
})

export default mongoose.model('result', resultModel);