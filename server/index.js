import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import postRouter from "./routes/posts.js";

const app = express();

app.use(bodyParser.json( {limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("hello to Memories API");
});

app.use('/posts', postRouter);
const CONNECTION_URL = 'mongodb+srv://sivasindhu:sivasinp@cluster0.r3gkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> app.listen(PORT, ()=>
    console.log(`server running on port: ${PORT}`)
))
.catch((error)=> console.log(error.message));

mongoose.connect(CONNECTION_URL,{ useFindAndModify: false});
