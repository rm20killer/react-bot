//done not need anymore
if (message.channel.name === config.ChannelID) {
    //checks for links
    let links = ["www.dropbox.com/", "https://drive.google.com/", "www.mediafire.com/file", "www.awesomescreenshot.com/", "mega.nz/file/", "http://somup.com/", "https://screencast-o-matic.com/", "https://fb.watch/", "medal.tv"]

    const messa = message.content.toLowerCase();
    for (var i = 0; i < links.length; i++) {
        if (messa.includes(links[i])) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Video must be playable on discord!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Submissions must be viewable on discord.\nType /requirements for more info.\nuse /compress for easy compress or youtube to upload big file')
                .addField('Bad submission by', message.author.username)
            message.channel.send({ embeds: [embed] });
            message.delete().catch(error => { console.log(error) });
            break;
        }
    }
    if (messa.includes("https://youtu.be/") || messa.includes("https://www.youtube.com/watch?v=") || messa.includes("https://m.youtube.com/watch?v=")) {
        youtubechecker.youtube(message, client)
    }
    if (messa.includes("https://youtube.com/shorts/")) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Video aspect ratio is bad!')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xff0000)
            .setDescription('Video is set as short.\nThe ratio of a short does not meet requirements\n Upload the video as a normal video and not a short.\nType /requirements for more info.')
            .addField('Bad submission by', message.author.username)
        message.channel.send({ embeds: [embed] });
        message.delete().catch(error => { console.log(error) });
    }
    let attachments = Array.from(message.attachments);
    let attachmentss = attachments[0];
    if (attachmentss) {
        const attachment = attachmentss[1]
        //console.log(attachment[1])
        attachmentD.attachmentchecker(attachment, message, client);
    }
}