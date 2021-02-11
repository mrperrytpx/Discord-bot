const OW_API_KEY = process.env.OW_API_KEY;
const axios = require("axios");
const Discord = require('discord.js');

module.exports = async function checkTime(msg) {
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
}