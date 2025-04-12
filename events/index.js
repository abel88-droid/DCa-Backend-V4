// Event handlers setup
const fs = require("fs")
const path = require("path")

// Setup event handlers
const setupEventHandlers = (client) => {
  const eventFiles = fs.readdirSync(path.join(__dirname)).filter((file) => file.endsWith(".js") && file !== "index.js")

  for (const file of eventFiles) {
    const event = require(`./${file}`)
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client))
    } else {
      client.on(event.name, (...args) => event.execute(...args, client))
    }
  }
}

module.exports = {
  setupEventHandlers,
}
