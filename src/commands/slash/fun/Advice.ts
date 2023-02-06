import type BaseClient from '../../../lib/BaseClient.js';
import Command from '../../../lib/structures/Interaction.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import { request } from 'undici';

export default class extends Command {
	public constructor(client: BaseClient) {
		super(client, {
			name: 'advice',
			description: 'Get a random advice.',
			category: 'Fun'
		});
	}

	public async execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {
		const raw = await request('https://api.adviceslip.com/advice', { method: 'GET' });
		const response = await raw.body.json();

		return interaction.reply({ content: response.slip.advice });
	}
}