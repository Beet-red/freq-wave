import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary"
import path from "path";


dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_key,
    api_secret: process.env.Cloud_secret,
})

const app = express()

//using middle wares
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT;

import UserRoutes from "./routes/UserRoutes.js";
import songRoutes from "./routes/songRoutes.js"

app.use("/api/user", UserRoutes);
app.use("/api/song", songRoutes);


const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/Frontend/dist')))


app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"))
})


// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*",(req,res) => {
//     res.sendFile(path.join(__dirname, "/frontend/dist", "index.html"));
// })

app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
    connectDB(); 
})