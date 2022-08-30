import mongoose from 'mongoose';

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },

  email: {
    type: String,
    required: [true, 'Please enter  your email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
});

const User = mongoose.model('User', Userschema);

export default User;
