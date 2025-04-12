// Handle message creation for moderation and commands
const { getAutoModConfig } = require("../models/moderation")
const { getPrefix } = require("../models/guild")
const config = require("../config")

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Ignore bot messages
    if (message.author.bot) return

    // Auto-moderation
    if (message.guild) {
      try {
        const autoModConfig = await getAutoModConfig(message.guild.id)

        if (autoModConfig && autoModConfig.enabled) {
          // Check for profanity
          if (autoModConfig.filterProfanity) {
            // Implement profanity filter logic
          }

          // Check for spam
          if (autoModConfig.filterSpam) {
            // Implement spam detection logic
          }

          // Check for Discord invites
          if (autoModConfig.filterInvites && message.content.match(/discord\.gg\/\w+/)) {
            await message.delete()
            await message.channel.send(`${message.author}, Discord invites are not allowed in this server.`)

            // Log to moderation channel
            const logChannel = message.guild.channels.cache.find((ch) => ch.name === autoModConfig.logChannel)

            if (logChannel) {
              logChannel.send(`Deleted invite link from ${message.author.tag} in ${message.channel}`)
            }
          }

          // Check for links
          if (autoModConfig.filterLinks && message.content.match(/https?:\/\/\S+/)) {
            await message.delete()
            await message.channel.send(`${message.author}, links are not allowed in this server.`)

            // Log to moderation channel
            const logChannel = message.guild.channels.cache.find((ch) => ch.name === autoModConfig.logChannel)

            if (logChannel) {
              logChannel.send(`Deleted link from ${message.author.tag} in ${message.channel}`)
            }
          }
        }
      } catch (error) {
        console.error("Error in auto-moderation:", error)
      }
    }

    // Command handling for legacy prefix commands
    if (message.guild) {
      try {
        const prefix = (await getPrefix(message.guild.id)) || config.defaultPrefix

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        // Handle legacy commands here
        // This is just a placeholder for the actual command handling logic
        if (commandName === "ping") {
          message.reply("Pong!")
        }
      } catch (error) {
        console.error("Error in command handling:", error)
      }
    }
  },
}
