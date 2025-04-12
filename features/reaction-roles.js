// Reaction roles functionality
const { getReactionRoles } = require("../models/reaction-role")

// Setup reaction roles
const setupReactionRoles = (client) => {
  // Handle reaction add
  client.on("messageReactionAdd", async (reaction, user) => {
    if (user.bot) return

    // Fetch the reaction if it's partial
    if (reaction.partial) {
      try {
        await reaction.fetch()
      } catch (error) {
        console.error("Error fetching reaction:", error)
        return
      }
    }

    try {
      // Get reaction role configurations for this guild
      const roles = await getReactionRoles(reaction.message.guild.id)

      // Find a matching reaction role
      const roleConfig = roles.find(
        (r) =>
          r.enabled &&
          r.messageId === reaction.message.id &&
          r.emoji === reaction.emoji.name &&
          r.channelId === reaction.message.channel.name,
      )

      if (!roleConfig) return

      // Get the role
      const role = reaction.message.guild.roles.cache.find((r) => r.name === roleConfig.roleName)

      if (!role) return

      // Add the role to the user
      const member = await reaction.message.guild.members.fetch(user.id)
      await member.roles.add(role)
    } catch (error) {
      console.error("Error in reaction role add:", error)
    }
  })

  // Handle reaction remove
  client.on("messageReactionRemove", async (reaction, user) => {
    if (user.bot) return

    // Fetch the reaction if it's partial
    if (reaction.partial) {
      try {
        await reaction.fetch()
      } catch (error) {
        console.error("Error fetching reaction:", error)
        return
      }
    }

    try {
      // Get reaction role configurations for this guild
      const roles = await getReactionRoles(reaction.message.guild.id)

      // Find a matching reaction role
      const roleConfig = roles.find(
        (r) =>
          r.enabled &&
          r.messageId === reaction.message.id &&
          r.emoji === reaction.emoji.name &&
          r.channelId === reaction.message.channel.name,
      )

      if (!roleConfig) return

      // Get the role
      const role = reaction.message.guild.roles.cache.find((r) => r.name === roleConfig.roleName)

      if (!role) return

      // Remove the role from the user
      const member = await reaction.message.guild.members.fetch(user.id)
      await member.roles.remove(role)
    } catch (error) {
      console.error("Error in reaction role remove:", error)
    }
  })
}

module.exports = {
  setupReactionRoles,
}
