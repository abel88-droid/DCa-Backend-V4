// Handle new members joining
const { getWelcomeConfig } = require("../models/welcome-message")
const { createCanvas, loadImage } = require("canvas")
const { AttachmentBuilder } = require("discord.js")

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    try {
      // Get welcome configuration for this guild
      const config = await getWelcomeConfig(member.guild.id)

      if (!config || !config.enabled) return

      const channel = member.guild.channels.cache.find((ch) => ch.name === config.channelId)

      if (!channel) return

      // Replace placeholders in welcome message
      const welcomeMessage = config.message.replace("{user}", `<@${member.id}>`).replace("{server}", member.guild.name)

      // Create welcome image if enabled
      if (config.withImage) {
        const canvas = createCanvas(700, 250)
        const ctx = canvas.getContext("2d")

        // Draw background
        ctx.fillStyle = "#23272A"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw welcome text
        ctx.font = "28px sans-serif"
        ctx.fillStyle = "#FFFFFF"
        ctx.textAlign = "center"
        ctx.fillText(`Welcome to ${member.guild.name}!`, canvas.width / 2, 50)

        // Draw username
        ctx.font = "32px sans-serif"
        ctx.fillStyle = "#7289DA"
        ctx.fillText(member.user.tag, canvas.width / 2, 150)

        // Draw avatar
        try {
          const avatar = await loadImage(member.user.displayAvatarURL({ extension: "png", size: 128 }))

          // Draw circle for avatar
          ctx.beginPath()
          ctx.arc(canvas.width / 2, 100, 64, 0, Math.PI * 2)
          ctx.closePath()
          ctx.clip()

          // Draw avatar in circle
          ctx.drawImage(avatar, canvas.width / 2 - 64, 36, 128, 128)

          const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "welcome.png" })

          // Send welcome message with image
          channel.send({
            content: welcomeMessage,
            files: [attachment],
          })
        } catch (error) {
          console.error("Error creating welcome image:", error)
          channel.send(welcomeMessage)
        }
      } else {
        // Send welcome message without image
        channel.send(welcomeMessage)
      }
    } catch (error) {
      console.error("Error in guildMemberAdd event:", error)
    }
  },
}
