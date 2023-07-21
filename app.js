const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


app.use(cors());
                                                     
const DATABASE = process.env.MONGO_URL;
const PORT = process.env.PORT || 3005;

const app = express();

//app.use() is a middle ware

// app.use(express.json()) application doesnt know what type of data is recieving require( req.body
// so to tell the application that we are recieving json body and it will parse all data into json format
app.use(express.json());


app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// connects mongodb data base to this project
mongoose
  .connect(DATABASE)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));

// listen to this port and start sever
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
