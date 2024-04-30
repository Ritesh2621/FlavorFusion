import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {userRouter} from "./routes/users.js";
import { recipesRouter } from "./routes/recipies.js";

const app = express();

app.use(express.json());
app.use(cors());



app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);

mongoose.connect("mongodb+srv://riteshsuryawanshi:Ritesh2621@cluster0.5bjssge.mongodb.net/Cluster0?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  }).then(()=>{
    console.log("MongoDB connected");
}).catch((e)=>{
    console.log(e);
})



app.listen(3001,()=> console.log("Server running on port 3000"));