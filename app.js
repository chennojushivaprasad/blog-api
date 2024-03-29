const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const app = express();

// app.use(express.json()) application doesnt know what type of data is recieving require( req.body
// so to tell the application that we are recieving json body and it will parse all data into json format


//app.use() is a middle ware

app.use(cors())
app.use(express.json());

                                                     
const DATABASE = process.env.MONGO_URL;
const PORT = process.env.PORT || 3005;


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
