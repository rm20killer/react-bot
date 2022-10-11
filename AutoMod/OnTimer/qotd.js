
const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");

const fs = require("fs");

module.exports = {
  async uploadQOTD(client) {
    const channel = client.channels.cache.get('1019656636610121828');
    //const channel = client.channels.cache.find((channel) => channel.id === "1019656636610121828");
    const uploadQOTD = async () => {
        const database = JSON.parse(fs.readFileSync(`./utils/data/qotd.json`))
        var today = new Date();
        var dd = String(today.getUTCDate()).padStart(2, '0');
        var mm = String(today.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getUTCFullYear();
        
        todaydate = dd + '/' + mm + '/' + yyyy;
        console.log(todaydate)
        if(database.date = todaydate) {
            console.log("new day")
            //checks if time is 3pm utc
            if(today.getUTCHours()>15)
            {
                console.log("past 3pm UTC")
                //create post
                channel.threads.create({
                    name:"test",
                    message:{
                        content: "Test message"
                    }
                })
            }
        }
        setTimeout(uploadQOTD, 1000 * 60 * 30);
    };
    uploadQOTD();
  },
};
