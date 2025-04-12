// Reaction role model
const mongoose = require("mongoose")

const reactionRoleSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
  serverName: String,
  emoji: {
    type: String,
    required: true,
  },
  roleName: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const ReactionRole = mongoose.model("ReactionRole", reactionRoleSchema)

// Get all reaction roles for a server
const getReactionRoles = async (serverId) => {
  return await ReactionRole.find({ serverId })
}

// Create a new reaction role
const createReactionRole = async (roleData) => {
  const role = new ReactionRole(roleData)
  return await role.save()
}

// Update a reaction role
const updateReactionRole = async (roleId, roleData) => {
  return await ReactionRole.findByIdAndUpdate(roleId, roleData, { new: true })
}

// Delete a reaction role
const deleteReactionRole = async (roleId) => {
  return await ReactionRole.findByIdAndDelete(roleId)
}

module.exports = {
  ReactionRole,
  getReactionRoles,
  createReactionRole,
  updateReactionRole,
  deleteReactionRole,
}
