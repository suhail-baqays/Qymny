const mongoose = require("mongoose");
const Feed_Back = new mongoose.Schema({
    name:{ type:String , default:"unoune"},
    comment:{type:String , default:"empty"},
    rating:{type:Number , min:1 ,  max:5 ,default:0}
})
module.exports=mongoose.model("Feed_Back" , Feed_Back , "Feed_Back")

