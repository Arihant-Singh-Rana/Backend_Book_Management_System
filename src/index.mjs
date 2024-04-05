import express from "express";
import mongoose from "mongoose";
import router from "./router/API.mjs";

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://arihantsinghrana2004:Ariarn1977@cluster0.x8akbbk.mongodb.net/Books"
).then(()=>console.log("Connected to Mongo Server")).catch((e)=>{console.log("Error connecting :",e)});

app.use("/",router);

app.listen(8000,()=> console.log("Successfully started on port ",8000));