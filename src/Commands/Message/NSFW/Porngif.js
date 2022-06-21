const Command = require('../../../Structures/Command');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { ButtonStyle } = require('discord-api-types/v10');
const { Colors } = require('../../../Utils/Constants');
const { fetch } = require('undici');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'porngif',
			aliases: ['pgif'],
			description: 'This command contain explicit content!',
			category: 'NSFW',
			cooldown: 10e3,
			disabled: true,
			nsfw: true
		});
	}

	async run(message) {
		const raw = await fetch('https://nekobot.xyz/api/image?type=pgif');
		const response = await raw.json();

		const button = new ActionRowBuilder()
			.addComponents(new ButtonBuilder()
				.setStyle(ButtonStyle.Link)
				.setLabel('Open in Browser')
				.setURL(response.message));

		const embed = new EmbedBuilder()
			.setColor(Colors.Default)
			.setImage(response.message)
			.setFooter({ text: `Powered by ${this.client.user.username}`, iconURL: message.author.avatarURL() });

		return message.reply({ embeds: [embed], components: [button] });
	}

};
