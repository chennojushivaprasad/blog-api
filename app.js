import express from "express";
import mongoose from "mongoose";
import userRouter from "../blogserver/routes/user-routes.js";
import blogRouter from "../blogserver/routes/blog-routes.js";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const DATABASE = process.env.MONGO_URL
const PORT = process.env.PORT || 3005;


const app = express();

//app.use() is a middle ware

// app.use(express.json()) application doesnt know what type of data is recieving from req.body
// so to tell the application that we are recieving json body and it will parse all data into json format
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// connects mongodb data base to this project
mongoose
  .connect(DATABASE)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));

// listen to this port and start sever
app.listen(PORT, () => {
  console.log("server is running on port",PORT);
});
