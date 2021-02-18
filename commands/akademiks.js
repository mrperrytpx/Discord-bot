const images = ["https://media.discordapp.net/attachments/780213705387802674/798644678215335956/unknown.png",
    "https://media.discordapp.net/attachments/780213705387802674/798644517938003998/unknown.png",
    "https://tenor.com/view/damn-bro-das-crazy-dont-remember-askin-dont-care-lightskinmonte-gif-17216393",
    "https://pbs.twimg.com/media/DhdFFOJVAAA6SLY?format=jpg&name=medium",
    "https://netstorage-legit.akamaized.net/images/a12e26e4a55e0450.jpg?imwidth=900",
    "https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ffc874bd1-55b8-45d2-960b-b3f4ee96ada3_942x529.webp"]

module.exports = function akademiks(msg) {
    if (msg.content.split(" ").length > 50) {
        const index = Math.floor(Math.random() * images.length);
        msg.channel.send(images[index]);
    }
}