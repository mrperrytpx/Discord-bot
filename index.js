const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const OW_API_KEY = process.env.OW_API_KEY;

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
    if ((msg.content).toLowerCase().includes("!time")) {
        const message = msg.content.split(" ");
        if (message.length > 1) {
            const query = message.slice(1);
            const city = query.join(" ");
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}&units=metric`;
            const locationData = await axios.get(weatherURL);
            const targetTimezone = locationData.data.timezone / 3600;

            const date = new Date();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const userTimezone = date.getTimezoneOffset() / 60;

            let cityWords = [];
            query.forEach(element => {
                let adding = element.charAt(0).toUpperCase() + element.slice(1);
                cityWords.push(adding);
            })
            cityWords = cityWords.join(" ");
            
            let number;
            number = hour + (userTimezone + targetTimezone);
            if (number >= 24) {
                number -= 24;
            } else if (number < 0) {
                number = 24 - Math.abs(number);
            }
            const embededMessage = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setThumbnail("https://cdn.discordapp.com/attachments/360783461860114434/795992709729878046/siprautist.png")
                .setTitle("Time Checker")
                .addField(`Time in ${cityWords}:`, `${number}:${minutes}`, true);

            msg.channel.send(embededMessage);
        }
    }
}); 