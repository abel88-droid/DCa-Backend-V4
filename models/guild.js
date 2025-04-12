// Guild model for storing guild-specific settings
const mongoose = require("mongoose")

const guildSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
    default: "!",
  },
  name: String,
  icon: String,
  ownerId: String,
  memberCount: Number,
})

const Guild = mongoose.model("Guild", guildSchema)

// Get the command prefix for a guild
const getPrefix = async (guildId) => {
  const guild = await Guild.findOne({ guildId })
  return guild ? guild.prefix : null
}

// Update or create guild settings
const updateGuild = async (guildId, data) => {
  return await Guild.findOneAndUpdate({ guildId }, data, { upsert: true, new: true })
}

module.exports = {
  Guild,
  getPrefix,
  updateGuild,
}
