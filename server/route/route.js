const express = require("express")
const multer = require("multer")
const {Analyze_Resume} = require("../controller/Controller")
const {Save_Feed_Back} = require("../controller/feed_back")
const router = express.Router()

const storage = multer.memoryStorage()        //store the resume in Ram (dataBuffer in pdfParser)
const upload = multer({storage: storage})

router.post("/analyze" , upload.single("resume"), Analyze_Resume)   // uplode single respons from UI , and seprat (resume as file , job discreption as text) and send it to controller 
router.post("/feedback" , Save_Feed_Back)
module.exports=router

