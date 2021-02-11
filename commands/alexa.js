const axios = require("axios");

module.exports = async function alexa(msg) {
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