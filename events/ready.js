


module.exports = {
  name: "ready",
  async execute(client) {
    //await sequelize;
    console.log(`Logged In as ${client.user.tag}`);

    console.log("Timers Started");
  },
};
