const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to db')
  } catch (err) {
    console.error(err)
    throw new Error('Failed to connect to db')
  }
}

module.exports = { connectDB }