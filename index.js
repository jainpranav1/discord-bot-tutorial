// importing the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

// importing dotenv library
// allows us to access the secrets in the .env file
require("dotenv").config();

// import uberduck.js
// allows us to call the uberduck service
const uberduck = require("./uberduck.js")

// creating discord client
// intents specify permissions of the discord bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// accessing our discord bot with its token (stored on the .env file)
client.login(process.env.BOT_TOKEN);

// runs when bot is ready
client.on("ready", () => {
    console.log("Bot is ready");
});

// runs when a message is sent in a channel
client.on("messageCreate", (msg) => {

    // when bot sees a message of form: hey squidward, say "I am awesome"
    // it will send a voice message stating: I am awesome
    if (msg.content.startsWith("hey squidward, say")) {
        let ind_quote_1 = 19;
        let ind_quote_2 = msg.content.length - 1;
        let reply = msg.content.substring(ind_quote_1, ind_quote_2);

        uberduck.get_path_vt("squidward", reply).then((path) => {
            msg.channel.send({
                files: [path],
            });
        })
    }
})