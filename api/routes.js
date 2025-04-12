// API routes for the dashboard
const express = require("express")
const {
  getServerYouTubeFeeds,
  createYouTubeFeed,
  updateYouTubeFeed,
  deleteYouTubeFeed,
} = require("../models/youtube-feed")
const {
  getReactionRoles,
  createReactionRole,
  updateReactionRole,
  deleteReactionRole,
} = require("../models/reaction-role")
const {
  getWelcomeConfig,
  updateWelcomeConfig,
  getLeaveConfig,
  updateLeaveConfig,
} = require("../models/welcome-message")
const {
  getAutoModConfig,
  updateAutoModConfig,
  getCommandsConfig,
  updateCommandsConfig,
} = require("../models/moderation")
const { updateGuild } = require("../models/guild")

module.exports = (client) => {
  const router = express.Router()

  // Authentication middleware
  const authenticate = (req, res, next) => {
    // In a real implementation, this would verify the user's token
    // For now, we'll just pass through
    next()
  }

  // Get all servers the bot is in
  router.get("/servers", authenticate, (req, res) => {
    try {
      const servers = client.guilds.cache.map((guild) => ({
        id: guild.id,
        name: guild.name,
        icon: guild.iconURL(),
        memberCount: guild.memberCount,
      }))

      res.json({ servers })
    } catch (error) {
      console.error("Error fetching servers:", error)
      res.status(500).json({ error: "Failed to fetch servers" })
    }
  })

  // YouTube Feeds routes
  router.get("/youtube-feeds/:serverId", authenticate, async (req, res) => {
    try {
      const feeds = await getServerYouTubeFeeds(req.params.serverId)
      res.json({ feeds })
    } catch (error) {
      console.error("Error fetching YouTube feeds:", error)
      res.status(500).json({ error: "Failed to fetch YouTube feeds" })
    }
  })

  router.post("/youtube-feeds", authenticate, async (req, res) => {
    try {
      const feed = await createYouTubeFeed(req.body)
      res.json({ feed })
    } catch (error) {
      console.error("Error creating YouTube feed:", error)
      res.status(500).json({ error: "Failed to create YouTube feed" })
    }
  })

  router.put("/youtube-feeds/:feedId", authenticate, async (req, res) => {
    try {
      const feed = await updateYouTubeFeed(req.params.feedId, req.body)
      res.json({ feed })
    } catch (error) {
      console.error("Error updating YouTube feed:", error)
      res.status(500).json({ error: "Failed to update YouTube feed" })
    }
  })

  router.delete("/youtube-feeds/:feedId", authenticate, async (req, res) => {
    try {
      await deleteYouTubeFeed(req.params.feedId)
      res.json({ success: true })
    } catch (error) {
      console.error("Error deleting YouTube feed:", error)
      res.status(500).json({ error: "Failed to delete YouTube feed" })
    }
  })

  // Reaction Roles routes
  router.get("/reaction-roles/:serverId", authenticate, async (req, res) => {
    try {
      const roles = await getReactionRoles(req.params.serverId)
      res.json({ roles })
    } catch (error) {
      console.error("Error fetching reaction roles:", error)
      res.status(500).json({ error: "Failed to fetch reaction roles" })
    }
  })

  router.post("/reaction-roles", authenticate, async (req, res) => {
    try {
      const role = await createReactionRole(req.body)
      res.json({ role })
    } catch (error) {
      console.error("Error creating reaction role:", error)
      res.status(500).json({ error: "Failed to create reaction role" })
    }
  })

  router.put("/reaction-roles/:roleId", authenticate, async (req, res) => {
    try {
      const role = await updateReactionRole(req.params.roleId, req.body)
      res.json({ role })
    } catch (error) {
      console.error("Error updating reaction role:", error)
      res.status(500).json({ error: "Failed to update reaction role" })
    }
  })

  router.delete("/reaction-roles/:roleId", authenticate, async (req, res) => {
    try {
      await deleteReactionRole(req.params.roleId)
      res.json({ success: true })
    } catch (error) {
      console.error("Error deleting reaction role:", error)
      res.status(500).json({ error: "Failed to delete reaction role" })
    }
  })

  // Welcome Messages routes
  router.get("/welcome-config/:serverId", authenticate, async (req, res) => {
    try {
      const welcomeConfig = await getWelcomeConfig(req.params.serverId)
      const leaveConfig = await getLeaveConfig(req.params.serverId)
      res.json({ welcomeConfig, leaveConfig })
    } catch (error) {
      console.error("Error fetching welcome/leave config:", error)
      res.status(500).json({ error: "Failed to fetch welcome/leave config" })
    }
  })

  router.put("/welcome-config/:serverId", authenticate, async (req, res) => {
    try {
      const welcomeConfig = await updateWelcomeConfig(req.params.serverId, req.body)
      res.json({ welcomeConfig })
    } catch (error) {
      console.error("Error updating welcome config:", error)
      res.status(500).json({ error: "Failed to update welcome config" })
    }
  })

  router.put("/leave-config/:serverId", authenticate, async (req, res) => {
    try {
      const leaveConfig = await updateLeaveConfig(req.params.serverId, req.body)
      res.json({ leaveConfig })
    } catch (error) {
      console.error("Error updating leave config:", error)
      res.status(500).json({ error: "Failed to update leave config" })
    }
  })

  // Moderation routes
  router.get("/moderation/:serverId", authenticate, async (req, res) => {
    try {
      const autoModConfig = await getAutoModConfig(req.params.serverId)
      const commandsConfig = await getCommandsConfig(req.params.serverId)
      res.json({ autoModConfig, commandsConfig })
    } catch (error) {
      console.error("Error fetching moderation config:", error)
      res.status(500).json({ error: "Failed to fetch moderation config" })
    }
  })

  router.put("/auto-mod/:serverId", authenticate, async (req, res) => {
    try {
      const autoModConfig = await updateAutoModConfig(req.params.serverId, req.body)
      res.json({ autoModConfig })
    } catch (error) {
      console.error("Error updating auto-mod config:", error)
      res.status(500).json({ error: "Failed to update auto-mod config" })
    }
  })

  router.put("/commands-config/:serverId", authenticate, async (req, res) => {
    try {
      const commandsConfig = await updateCommandsConfig(req.params.serverId, req.body)

      // Update guild prefix if it changed
      if (req.body.prefix) {
        await updateGuild(req.params.serverId, { prefix: req.body.prefix })
      }

      res.json({ commandsConfig })
    } catch (error) {
      console.error("Error updating commands config:", error)
      res.status(500).json({ error: "Failed to update commands config" })
    }
  })

  return router
}
