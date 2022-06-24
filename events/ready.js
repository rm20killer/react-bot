module.exports = {
	name: 'ready',
	execute(client) {
        console.log(`Logged In as ${client.user.tag}`);
	},
};