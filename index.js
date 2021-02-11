const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;

client.login(BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

    if (msg.channel.id === "360783461860114434" || msg.channel.id === "361895356776054784") {
        if ((msg.content).toLowerCase() === "!prnt") {
            const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
            let array = [];
            for(let i = 0; i < 6; i++) {
                let ind = characters[Math.floor(Math.random() * characters.length)];
                array.push(ind);
            }
            let query = array.join("");
            try {
                let urlData = await axios.get(`https://prnt.sc/${query}`);
                let image = cheerio.load(urlData.data)
                let imageSource = image("img#screenshot-image")[0].attribs.src;
                msg.channel.send(imageSource);
            } catch(err) {
                console.log(err)
            }
        }

        if ((msg.content).toLowerCase().includes("alexa play")) {
            const message = msg.content.split(" ");
            if (message.length > 2) {
                const replyMessage = (message.slice(2)).join(" ");
                const youtubeURL = `https://decapi.me/youtube/videoid/${replyMessage}`;
                try {
                    let urlData = await axios.get(youtubeURL);
                    let data = urlData.data;
                    msg.channel.send(`https://www.youtube.com/watch?v=${data}`);
                } catch (err) {
                    console.log(err)
                }                
            }
        }
    }  
});