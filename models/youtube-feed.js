// YouTube feed model
const mongoose = require("mongoose")

const youTubeFeedSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
  },
  channelName: String,
  serverId: {
    type: String,
    required: true,
  },
  serverName: String,
  channelDestination: {
    type: String,
    required: true,
  },
  lastVideoId: String,
  enabled: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const YouTubeFeed = mongoose.model("YouTubeFeed", youTubeFeedSchema)

// Get all YouTube feeds
const getYouTubeFeeds = async () => {
  return await YouTubeFeed.find()
}

// Get YouTube feeds for a specific server
const getServerYouTubeFeeds = async (serverId) => {
  return await YouTubeFeed.find({ serverId })
}

// Create a new YouTube feed
const createYouTubeFeed = async (feedData) => {
  const feed = new YouTubeFeed(feedData)
  return await feed.save()
}

// Update a YouTube feed
const updateYouTubeFeed = async (feedId, feedData) => {
  return await YouTubeFeed.findByIdAndUpdate(feedId, feedData, { new: true })
}

// Update the last video ID for a feed
const updateLastVideoId = async (feedId, videoId) => {
  return await YouTubeFeed.findByIdAndUpdate(feedId, { lastVideoId: videoId }, { new: true })
}

// Delete a YouTube feed
const deleteYouTubeFeed = async (feedId) => {
  return await YouTubeFeed.findByIdAndDelete(feedId)
}

module.exports = {
  YouTubeFeed,
  getYouTubeFeeds,
  getServerYouTubeFeeds,
  createYouTubeFeed,
  updateYouTubeFeed,
  updateLastVideoId,
  deleteYouTubeFeed,
}
