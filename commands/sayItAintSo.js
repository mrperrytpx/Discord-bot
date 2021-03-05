module.exports = function sayItAintSo(msg) {
    if ((msg.content).toLowerCase() === "say it aint so" || (msg.content).toLowerCase() === "say it ain't so") {
        msg.channel.send("https://cdn.discordapp.com/attachments/360783461860114434/817375752131313684/unknown.png");
    }
}