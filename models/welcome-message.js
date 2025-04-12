// Welcome message model
const mongoose = require("mongoose")

const welcomeConfigSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  withImage: {
    type: Boolean,
    default: true,
  },
})

const leaveConfigSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  enabled: {
    type: Boolean,
    default: false,
  },
  channelId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

const WelcomeConfig = mongoose.model("WelcomeConfig", welcomeConfigSchema)
const LeaveConfig = mongoose.model("LeaveConfig", leaveConfigSchema)

// Get welcome configuration for a server
const getWelcomeConfig = async (serverId) => {
  return await WelcomeConfig.findOne({ serverId })
}

// Update or create welcome configuration
const updateWelcomeConfig = async (serverId, configData) => {
  return await WelcomeConfig.findOneAndUpdate({ serverId }, configData, { upsert: true, new: true })
}

// Get leave configuration for a server
const getLeaveConfig = async (serverId) => {
  return await LeaveConfig.findOne({ serverId })
}

// Update or create leave configuration
const updateLeaveConfig = async (serverId, configData) => {
  return await LeaveConfig.findOneAndUpdate({ serverId }, configData, { upsert: true, new: true })
}

module.exports = {
  WelcomeConfig,
  LeaveConfig,
  getWelcomeConfig,
  updateWelcomeConfig,
  getLeaveConfig,
  updateLeaveConfig,
}
