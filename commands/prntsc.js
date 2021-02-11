const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function prntsc(msg) {
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
}

