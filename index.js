// Main entry point for the Discord bot
const { Client, GatewayIntentBits, Partials } = require("discord.js")
const express = require("express")
const cors = require("cors")
const config = require("./config")
const { connectDatabase } = require("./database")
const { registerCommands } = require("./commands")
const { setupEventHandlers } = require("./events")
const { setupYouTubeFeeds } = require("./features/youtube-feeds")
const { setupReactionRoles } = require("./features/reaction-roles")
const { setupWelcomeMessages } = require("./features/welcome-messages")
const { setupModeration } = require("./features/moderation")
const apiRoutes = require("./api/routes")

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember],
})

// Initialize Express app for API
const app = express()
app.use(cors())
app.use(express.json())

// Connect to database
connectDatabase()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err))

// Setup bot features
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)

  // Register slash commands
  registerCommands(client)

  // Setup event handlers
  setupEventHandlers(client)

  // Setup features
  setupYouTubeFeeds(client)
  setupReactionRoles(client)
  setupWelcomeMessages(client)
  setupModeration(client)

  console.log("Bot is ready!")
})

// Setup API routes
app.use("/api", apiRoutes(client))

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})

// Login to Discord
client.login(config.token)

// Handle errors
client.on("error", console.error)
process.on("unhandledRejection", console.error)
