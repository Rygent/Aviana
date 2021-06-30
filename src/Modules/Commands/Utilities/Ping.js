const Command = require('../../../Structures/Command.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'Shows Bot latency & API response time.',
			category: 'Utilities'
		});
	}

	async run(message) {
		const latency = Math.round(Date.now() - message.createdTimestamp);

		if (latency <= 0) {
			return message.reply('Please try again later!');
		} else {
			return message.reply([
				`💓 ***Heartbeat:*** \`${Math.round(this.client.ws.ping)}ms\``,
				`⏱️ ***Latency:*** \`${latency}ms\``
			].join('\n'));
		}
	}

};
