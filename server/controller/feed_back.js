const Feed_Back = require("../model/Model")

const Save_Feed_Back=async (req ,res)=>{
    try{
        console.log("📥 Received Feedback:", req.body);
        const newFeed_Back = new Feed_Back({name:req.body.name , comment:req.body.comment , rating:req.body.rating})
        await newFeed_Back.save().then(()=>{res.status(200).json()})
    }catch (err) {
        console.error("❌ Error Saving Feedback:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports={Save_Feed_Back}