import { Client } from '@/lib/structures/client.js';
import { Listener } from '@/lib/structures/listener.js';
import { EmbedBuilder } from '@discordjs/builders';
import { WebhookClient, type WebhookMessageCreateOptions } from 'discord.js';
import { bold, codeBlock, italic, time } from '@discordjs/formatters';
import type { DiscordAPIError } from '@discordjs/rest';
import { Colors } from '@/lib/utils/constants.js';
import { env } from '@/env.js';
import { logger } from '@elvia/logger';

export default class extends Listener {
	public constructor(client: Client<true>) {
		super(client, {
			name: 'unhandledRejection',
			once: false,
			emitter: process
		});
	}

	// @ts-expect-error TS6133: 'promise' is declared but its value is never read.
	public run(error: Error, promise: Promise<unknown>) {
		if ((error as DiscordAPIError).name === 'DiscordAPIError[10062]') return;
		logger.fatal(`${error.name}: ${error.message}`, { error });

		if (this.client.isReady() && env.LOGGER_WEBHOOK_URL) {
			const webhook = new WebhookClient({ url: env.LOGGER_WEBHOOK_URL });
			const threadId = new URL(env.LOGGER_WEBHOOK_URL).searchParams.get('thread_id') as string;

			const embed = new EmbedBuilder()
				.setColor(Colors.Red)
				.setTitle('Unhandled Rejection')
				.setDescription(
					[
						`${codeBlock('xl', error.stack as string)}`,
						`${bold(italic('Name:'))} ${error.name}`,
						`${bold(italic('Message:'))} ${error.message}`,
						`${bold(italic('Date:'))} ${time(new Date(Date.now()), 'D')} (${time(new Date(Date.now()), 'R')})`
					].join('\n')
				)
				.setFooter({
					text: `Powered by ${this.client.user.username}`,
					iconURL: this.client.user.avatarURL() as string
				});

			const profile = {
				avatarURL: this.client.user?.displayAvatarURL({ size: 4096 }),
				username: this.client.user?.username
			} as WebhookMessageCreateOptions;

			return webhook.send({ embeds: [embed], threadId, ...profile });
		}
	}
}
