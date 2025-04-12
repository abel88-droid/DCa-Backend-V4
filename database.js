// Database connection and models
const mongoose = require("mongoose")
const config = require("./config")

// Connect to MongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    return mongoose.connection
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

module.exports = {
  connectDatabase,
}
