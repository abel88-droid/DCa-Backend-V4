# Discord Bot Backend

This is the backend for the Discord bot dashboard. It handles all the bot functionality and provides an API for the dashboard to interact with.

## Features

- YouTube feed notifications
- Reaction roles
- Welcome and leave messages
- Moderation commands and auto-moderation
- RESTful API for the dashboard

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials
4. Start the server with `npm start`

## Environment Variables

- `DISCORD_BOT_TOKEN`: Your Discord bot token
- `DISCORD_CLIENT_ID`: Your Discord application client ID
- `DISCORD_CLIENT_SECRET`: Your Discord application client secret
- `MONGODB_URI`: MongoDB connection URI
- `YOUTUBE_API_KEY`: YouTube Data API key
- `DASHBOARD_URL`: URL of the dashboard frontend
- `PORT`: Port for the API server (default: 3001)

## API Endpoints

### Servers

- `GET /api/servers`: Get all servers the bot is in

### YouTube Feeds

- `GET /api/youtube-feeds/:serverId`: Get all YouTube feeds for a server
- `POST /api/youtube-feeds`: Create a new YouTube feed
- `PUT /api/youtube-feeds/:feedId`: Update a YouTube feed
- `DELETE /api/youtube-feeds/:feedId`: Delete a YouTube feed

### Reaction Roles

- `GET /api/reaction-roles/:serverId`: Get all reaction roles for a server
- `POST /api/reaction-roles`: Create a new reaction role
- `PUT /api/reaction-roles/:roleId`: Update a reaction role
- `DELETE /api/reaction-roles/:roleId`: Delete a reaction role

### Welcome Messages

- `GET /api/welcome-config/:serverId`: Get welcome and leave configuration for a server
- `PUT /api/welcome-config/:serverId`: Update welcome configuration
- `PUT /api/leave-config/:serverId`: Update leave configuration

### Moderation

- `GET /api/moderation/:serverId`: Get moderation configuration for a server
- `PUT /api/auto-mod/:serverId`: Update auto-moderation configuration
- `PUT /api/commands-config/:serverId`: Update commands configuration

## Deployment

This backend is designed to be deployed on Railway. Simply connect your GitHub repository to Railway and it will automatically deploy.

## License

MIT
