// Configuration for the Discord bot
require("dotenv").config()

module.exports = {
  token: process.env.DISCORD_BOT_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  mongoUri: process.env.MONGODB_URI,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  dashboardUrl: process.env.DASHBOARD_URL || "http://localhost:3000",
  apiPort: process.env.PORT || 3001,
  defaultPrefix: "!",
}
