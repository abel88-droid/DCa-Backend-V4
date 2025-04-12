// YouTube feed functionality
const { google } = require("googleapis")
const config = require("../config")
const { getYouTubeFeeds, updateLastVideoId } = require("../models/youtube-feed")

// Initialize YouTube API
const youtube = google.youtube({
  version: "v3",
  auth: config.youtubeApiKey,
})

// Check for new videos
const checkForNewVideos = async (client) => {
  try {
    // Get all YouTube feed configurations
    const feeds = await getYouTubeFeeds()

    for (const feed of feeds) {
      if (!feed.enabled) continue

      // Get the latest video from this channel
      const response = await youtube.search.list({
        part: "snippet",
        channelId: feed.channelId,
        maxResults: 1,
        order: "date",
        type: "video",
      })

      if (response.data.items.length === 0) continue

      const latestVideo = response.data.items[0]
      const videoId = latestVideo.id.videoId

      // If this is a new video, post it to Discord
      if (videoId !== feed.lastVideoId) {
        const guild = client.guilds.cache.get(feed.serverId)

        if (!guild) continue

        const channel = guild.channels.cache.find((ch) => ch.name === feed.channelDestination)

        if (!channel) continue

        // Post the new video
        await channel.send(
          `**${latestVideo.snippet.channelTitle}** just uploaded a new video!\n` +
            `**${latestVideo.snippet.title}**\n` +
            `https://www.youtube.com/watch?v=${videoId}`,
        )

        // Update the last video ID
        await updateLastVideoId(feed._id, videoId)
      }
    }
  } catch (error) {
    console.error("Error checking for new YouTube videos:", error)
  }
}

// Setup YouTube feed checking
const setupYouTubeFeeds = (client) => {
  // Check for new videos every 10 minutes
  setInterval(() => checkForNewVideos(client), 10 * 60 * 1000)

  // Also check on startup
  checkForNewVideos(client)
}

module.exports = {
  setupYouTubeFeeds,
}
