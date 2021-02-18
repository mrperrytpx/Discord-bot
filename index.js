const Discord = require('discord.js');
const client = new Discord.Client();

require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;

// Commands
const ping = require("./commands/ping");
const prntsc = require("./commands/prntsc");
const alexa = require("./commands/alexa");
const checkTime = require("./commands/time");
const imgur = require("./commands/imgur");
const weatherReport = require("./commands/weatherReport");
const akademiks = require('./commands/akademiks');

client.login(BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    ping(msg);
    prntsc(msg);
    alexa(msg);
    checkTime(msg);
    imgur(msg);
    weatherReport(msg);
    akademiks(msg);
}); 