import User from '../model/Usermodel.js';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

//  creating a new User

export const Createusers = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }

  // checking if the new user registering already exist

  if (existinguser) {
    return res.json({
      message: 'This email has been registered already kindly login',
    });
  }
  // limiting the passowrd length
  if (password < 6) {
    return res.status(400).json({
      message: 'password too short, try something better',
    });
  }
  //  securing user password  information
  const salt = await bcrypt.genSalt();
  const Hashpassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: Hashpassword,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: user });
};

export const Loginusers = async (req, res, next) => {
  const { email, password } = req.body;
  let existinguser;

  try {
    existinguser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existinguser) {
    return res.status(400).json({ message: 'user not found' });
  }
  const isPasswordCorrect = bcrypt.compare(password, existinguser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: 'passowrd incorrect',
    });
  }
  // generate token
  const token = Jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.cookie(String(existinguser._id), token, {
    path: '/',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60), // 30days
    httpOnly: true,
    sameSite: 'lax',
  });
  return res.status(200).json({
    message: 'succesfully logged in',
    existinguser,
    token,
  });
};

export const Verifytoken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split('=')[1];
  console.log(token);

  if (!token) {
    return res.status(404).json({ message: 'no token found' });
  }
  Jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    req.id = user.id;
  });
  next();
};
export const getUsers = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, '-password');
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({
      message: 'user not found',
    });
  }
  return res.status(200).json({ user });
};

export const Logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split('=')[1];
  if (!token) {
    return res.status(404).json({ message: 'no token found' });
  }
  Jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = '';
    return res.status(200).json({
      message: 'successfully logged out',
    });
  });
};
