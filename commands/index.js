// Command registration and handling
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const path = require("path")
const config = require("../config")

// Command collection
const commands = []
const commandFiles = fs.readdirSync(path.join(__dirname, "slash")).filter((file) => file.endsWith(".js"))

// Load all command files
for (const file of commandFiles) {
  const command = require(`./slash/${file}`)
  commands.push(command.data.toJSON())
}

// Register slash commands with Discord
const registerCommands = async (client) => {
  const rest = new REST({ version: "9" }).setToken(config.token)

  try {
    console.log("Started refreshing application (/) commands.")

    await rest.put(Routes.applicationCommands(config.clientId), { body: commands })

    console.log("Successfully reloaded application (/) commands.")
  } catch (error) {
    console.error(error)
  }

  // Set up command handling
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: "There was an error executing this command!",
        ephemeral: true,
      })
    }
  })
}

module.exports = {
  registerCommands,
}
