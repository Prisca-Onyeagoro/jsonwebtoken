import mongoose from 'mongoose';

const Customerschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a Customer name'],
  },
});

const Customers = mongoose.model('Customer', Customerschema);

export default Customers;
