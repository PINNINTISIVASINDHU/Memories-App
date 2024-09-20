import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import dotenv from "dotenv";

import postRouter from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json( {limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true }));
app.use(cors( {
    origin: ["https://memories-app-api.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}));



app.use('/posts', postRouter);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("hello to Memories API");
}); 


mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> app.listen(PORT, ()=>
    console.log(`server running on port: ${PORT}`)
))
.catch((error)=> console.log(error.message));

mongoose.connect(process.env.CONNECTION_URL,{ useFindAndModify: false});
