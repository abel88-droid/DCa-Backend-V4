// Moderation model
const mongoose = require("mongoose")

const autoModConfigSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  filterProfanity: {
    type: Boolean,
    default: true,
  },
  filterSpam: {
    type: Boolean,
    default: true,
  },
  filterInvites: {
    type: Boolean,
    default: true,
  },
  filterLinks: {
    type: Boolean,
    default: false,
  },
  logChannel: {
    type: String,
    default: "mod-logs",
  },
})

const commandsConfigSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  prefix: {
    type: String,
    default: "!",
  },
  modRoles: {
    type: String,
    default: "Moderator, Admin",
  },
  banEnabled: {
    type: Boolean,
    default: true,
  },
  kickEnabled: {
    type: Boolean,
    default: true,
  },
  muteEnabled: {
    type: Boolean,
    default: true,
  },
  warnEnabled: {
    type: Boolean,
    default: true,
  },
  purgeEnabled: {
    type: Boolean,
    default: true,
  },
})

const AutoModConfig = mongoose.model("AutoModConfig", autoModConfigSchema)
const CommandsConfig = mongoose.model("CommandsConfig", commandsConfigSchema)

// Get auto-moderation configuration for a server
const getAutoModConfig = async (serverId) => {
  return await AutoModConfig.findOne({ serverId })
}

// Update or create auto-moderation configuration
const updateAutoModConfig = async (serverId, configData) => {
  return await AutoModConfig.findOneAndUpdate({ serverId }, configData, { upsert: true, new: true })
}

// Get commands configuration for a server
const getCommandsConfig = async (serverId) => {
  return await CommandsConfig.findOne({ serverId })
}

// Update or create commands configuration
const updateCommandsConfig = async (serverId, configData) => {
  return await CommandsConfig.findOneAndUpdate({ serverId }, configData, { upsert: true, new: true })
}

module.exports = {
  AutoModConfig,
  CommandsConfig,
  getAutoModConfig,
  updateAutoModConfig,
  getCommandsConfig,
  updateCommandsConfig,
}
