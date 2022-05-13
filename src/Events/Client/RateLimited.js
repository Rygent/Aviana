const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'rateLimited',
			once: false,
			emitter: 'rest'
		});
	}

	async run(rateLimitData) {
		const details = [
			`    Route  : ${rateLimitData.route}`,
			`    Hash   : ${rateLimitData.hash}`,
			`    Method : ${rateLimitData.method}`,
			`    Limit  : ${rateLimitData.limit}`,
			`    Timeout: ${rateLimitData.timeToReset}ms`,
			`    Global : ${rateLimitData.global}`
		].join('\n');

		this.client.logger.warn(`You are being Rate Limited.\n${details}`);
	}

};
