const OW_API_KEY = process.env.OW_API_KEY;
const axios = require("axios");
const Discord = require('discord.js');

module.exports = async function weatherReport(msg) {
    if ((msg.content).toLowerCase().includes("!prognoza")) {
        let poruka = msg.content.split(" ");
        let city, query;
        let cityWords = [];

        if (poruka.length === 1) {
            city = "Samobor";
            cityWords = "Samobor";
        } else {
            query = poruka.slice(1);
            city = query.join(" ");
            console.log(city)
            query.forEach(element => {
                let adding = element.charAt(0).toUpperCase() + (element.slice(1)).toLowerCase();
                cityWords.push(adding);
            })
            cityWords = cityWords.join(" ");
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}&units=metric`
            const urlData = await axios.get(url);
            const long = urlData.data.coord.lon;
            const lat = urlData.data.coord.lat;

            const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=${OW_API_KEY}&units=metric&lang=hr`;
            const forecastData = await axios.get(forecastUrl);

            const currentDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}&units=metric`;
            const currentDayData = await axios.get(currentDayUrl);
            const currDayMorning = Math.round(currentDayData.data.main.temp_min);
            const currDayEvening = Math.round(currentDayData.data.main.temp_max);
            const currDayDescription = currentDayData.data.weather[0].description;

            const date = new Date();

            let days = ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"];
            let day = date.getDay();

            const day1 = {
                date: `Day: ${days[day]}`,
                morning: `${currDayMorning}°C`,
                day: `${currDayEvening}°C`,
                description: currDayDescription
            }
            const day2 = {
                date: `Day: ${days[(day + 1) > 6 ? (day + 1) % 7 : day + 1]}`,
                morning: `${Math.round(forecastData.data.daily[1].temp.min)}°C`,
                day: `${Math.round(forecastData.data.daily[1].temp.max)}°C`,
                description: forecastData.data.daily[1].weather[0].description
            }
            const day3 = {
                date: `Day: ${days[(day + 2) > 6 ? (day + 2) % 7 : day + 2]}`,
                morning: `${Math.round(forecastData.data.daily[2].temp.min)}°C`,
                day: `${Math.round(forecastData.data.daily[2].temp.max)}°C`,
                description: forecastData.data.daily[2].weather[0].description
            }
            const day4 = {
                date: `Day: ${days[(day + 3) > 6 ? (day + 3) % 7 : day + 3]}`,
                morning: `${Math.round(forecastData.data.daily[3].temp.min)}°C`,
                day: `${Math.round(forecastData.data.daily[3].temp.max)}°C`,
                description: forecastData.data.daily[3].weather[0].description
            }
            const day5 = {
                date: `Day: ${days[(day + 4) > 6 ? (day + 4) % 7 : day + 4]}`,
                morning: `${Math.round(forecastData.data.daily[4].temp.min)}°C`,
                day: `${Math.round(forecastData.data.daily[4].temp.max)}°C`,
                description: forecastData.data.daily[4].weather[0].description
            }
            const day6 = {
                date: `Day: ${days[(day + 5) > 6 ? (day + 5) % 7 : day + 5]}`,
                morning: `${Math.round(forecastData.data.daily[5].temp.min)}°C`,
                day: `${Math.round(forecastData.data.daily[5].temp.max)}°C`,
                description: forecastData.data.daily[5].weather[0].description
            }
            const day7 = {
                date: `Day: ${days[(day + 6) > 6 ? (day + 6) % 7 : day + 6]}`,
                morning: `${Math.round(forecastData.data.daily[6].temp.min)}°C`,
                day: `${Math.round(forecastData.data.daily[6].temp.max)}°C`,
                description: forecastData.data.daily[6].weather[0].description
            }

            const embededMessage = new Discord.MessageEmbed()
                .setColor("#1ECBE1")
                .setTitle("Vremenska Prognoza")
                .setAuthor("Valsimot", "https://cdn.discordapp.com/avatars/808355407495823371/3532774163d019b8b0fb29a6a5484df5.png")
                .setDescription(`Prognoza za ${cityWords}\n\n Izvor: ${forecastData.data.hasOwnProperty("alerts") ? forecastData.data.alerts[0].sender_name : "just trust me bro lol"}`)
                .addFields(
                    { name: day1.date, value: `Trenutno: ${Math.round(currentDayData.data.main.temp)}°C\n Ujutro: ${day1.morning}\n Popodne: ${day1.day}\n Opis: ${day1.description}` },
                    { name: day2.date, value: `Ujutro: ${day2.morning}\n Popodne: ${day2.day}\n Opis: ${day2.description}`, inline: true },
                    { name: day3.date, value: `Ujutro: ${day3.morning}\n Popodne: ${day3.day}\n Opis: ${day3.description}`, inline: true },
                    { name: day4.date, value: `Ujutro: ${day4.morning}\n Popodne: ${day4.day}\n Opis: ${day4.description}`, inline: true },
                    { name: day5.date, value: `Ujutro: ${day5.morning}\n Popodne: ${day5.day}\n Opis: ${day5.description}`, inline: true },
                    { name: day6.date, value: `Ujutro: ${day6.morning}\n Popodne: ${day6.day}\n Opis: ${day6.description}`, inline: true },
                    { name: day7.date, value: `Ujutro: ${day7.morning}\n Popodne: ${day7.day}\n Opis: ${day7.description}`, inline: true }
                )
                .setTimestamp();
            msg.channel.send(embededMessage);
        } catch (err) {
            console.log(err);
        }
    }
}
