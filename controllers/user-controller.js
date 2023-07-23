const User = require("../model/user");

const bcrypt = require("bcrypt");

//here User is users colletion


const getUser = async (req, res, next) => {
  const userId = req.params.id;
  let users;
  try {
    //  User
    users = await User.findById(userId); // select * from User
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(404).json({ message: "no users found" });
  }
  return res.status(200).json({ users });
};

// getAlluser to get all users from collection in sql its like select * from User
const getAllUser = async (req, res, next) => {
  let users;
  try {
    //  User
    users = await User.find(); // select * from User
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "no users found" });
  }
  return res.status(200).json({ users });
};

// signup adding user to database in sql its like insert into (username,email,password) values ("xxx","xxxx","xxxx")
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUsers;
  try {
    existingUsers = await User.findOne({ email }); // select * from  users where email = email
  } catch (error) {
    return console.log(error);
  }

  console.log("exits", existingUsers);

  if (existingUsers) {
    return res.status(400).json({ message: "user Already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // new User({...}) insert into(username,email,password) VALUES ("XXXXX","XXXXX","XXXXX")
  const user = new User({
    username,
    email,
    password: hashedPassword, // for security reason we are enctyptying password
    blogs: [],
  });

  try {
    await user.save(); // saved into database
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ok:true}).json({ user });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  console.log(id, "id");
  let deleted;
  try {
    deleted = await User.findByIdAndDelete(id);
    console.log("deleted", deleted);
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({ message: "unable to delete" });
  }

  res.status(200).json("deleted successfully");
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true); // you probably dont want this one unless there is auth/cookies involved
res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,POST,PUT,DELETE');
  
  console.log(email,password)
  let emailExists;
  try {
    emailExists = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!emailExists) {
    return res.status(401).json("password does not match");
  }


  const userData = emailExists

  const isValid = await bcrypt.compare(password, userData.password);

  if (isValid) {
    return res.status(200).json({ message: "logged in successfully" ,userId:userData._id});
  }
};

module.exports.login = login;
module.exports.signup = signup;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getAllUser = getAllUser;
