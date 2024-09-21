import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import dotenv from "dotenv";

import postRouter from "./routes/posts.js";

dotenv.config();
const app = express();


app.use(bodyParser.json( {limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("hello to Memories API");
});

app.use('/posts', postRouter);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(()=> app.listen(PORT, ()=>
    console.log(`server running on port: ${PORT}`)
))
.catch((error)=> console.log(error.message));
 