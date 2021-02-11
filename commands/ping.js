module.exports = function ping(msg) {
    if (msg.content === 'ping') {
        msg.reply('Pong! :)');
    }
}

