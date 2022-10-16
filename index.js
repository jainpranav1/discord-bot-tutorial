// importing the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

// importing dotenv library
// allows us to access the secrets in the .env file
require("dotenv").config();

// creating discord client
// intents specify permissions of the discord bot
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// accessing our discord bot with its token (stored on the .env file)
client.login(process.env.BOT_TOKEN);

// print when bot is ready
client.on("ready", () => {
    console.log("Bot is ready");
});

