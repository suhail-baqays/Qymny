require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Route = require("./route/route")

const app = express()
const PORT = process.env.PORT||5000
const DB_url = process.env.MONGO_URI || "mongodb://localhost:27017/Qymny_DB";

app.use(cors())
app.use(express.json())
app.use("/api", Route)

mongoose.connect(DB_url)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.listen(PORT ,()=>{
    console.log(`🚀 Server is running on port ${PORT}`);
})