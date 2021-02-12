module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(discordMessage, args) {
		discordMessage.channel.send('Pong.');
	},
};