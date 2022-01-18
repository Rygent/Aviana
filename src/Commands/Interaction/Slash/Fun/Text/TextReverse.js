const Interaction = require('../../../../../Structures/Interaction.js');

module.exports = class extends Interaction {

	constructor(...args) {
		super(...args, {
			name: 'text',
			subCommand: 'reverse',
			description: 'Reverse your text.'
		});
	}

	async run(interaction) {
		const text = await interaction.options.getString('text', true);

		const converted = text.split('').reverse().join('');

		return await interaction.reply({ content: converted });
	}

};