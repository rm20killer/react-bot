const fs = require("fs");

module.exports = (client) => {
    const commandFolders = fs
        .readdirSync("./commands")

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((i) => i.split(".").pop() === "js");;
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
    }
    console.log(`Loaded ${client.commands.size} commands`);
};
