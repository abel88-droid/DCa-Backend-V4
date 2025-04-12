// Handle members leaving
const { getLeaveConfig } = require("../models/welcome-message")

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {
    try {
      // Get leave configuration for this guild
      const config = await getLeaveConfig(member.guild.id)

      if (!config || !config.enabled) return

      const channel = member.guild.channels.cache.find((ch) => ch.name === config.channelId)

      if (!channel) return

      // Replace placeholders in leave message
      const leaveMessage = config.message.replace("{user}", member.user.tag).replace("{server}", member.guild.name)

      // Send leave message
      channel.send(leaveMessage)
    } catch (error) {
      console.error("Error in guildMemberRemove event:", error)
    }
  },
}
