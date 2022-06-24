const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
    const commandfile = fs.readdirSync("./interaction/slashcommand/").filter(i => i.split(".").pop() === "js");
    if (commandfile.length <= 0) return console.log("No commands Found");
    const commands = [];
    commandfile.forEach(file => {
        var command = require(`./interaction/slashcommand/${file}`);
        commands.push(command.data.toJSON());
        client.slashcommand.set(command.data.name, command);
    });
    client.once('ready', () => {
        //console.log(commands)
        // Registering the commands in the client
        const rest = new REST({
            version: '9'
        }).setToken(client.config.BotToken);
        (async () => {
  
            try {
                if (client.config.slashGlobal || !client.config.testGuildID) {
                    await rest.put(
                        Routes.applicationCommands(client.user.id), {
                            body: commands
                        },
                    );
                    console.log('Loaded Slash Commands (GLOBAL)');
                } else {
                    await rest.put(
                        Routes.applicationGuildCommands(client.user.id, client.config.testGuildID), {
                            body: commands
                        },
                    );
                    console.log('Loaded Slash Commands (DEVELOPMENT)');
                }
            } catch (e) { console.error(e); }
            
        })();
    });
    console.log(`Loaded ${commands.length} commands`);
};