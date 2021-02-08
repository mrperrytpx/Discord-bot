const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;

client.login(BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    if (msg.channel.id === "360783461860114434" || msg.channel.id === "361895356776054784") {
        if (msg.content === "!prnt") {
            const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
            let array = [];
            for(let i = 0; i < 6; i++) {
                let ind = characters[Math.floor(Math.random() * characters.length)];
                array.push(ind);
            }
            let query = array.join("");
            msg.channel.send(`https://prnt.sc/${query}`);
        }
    }
});

