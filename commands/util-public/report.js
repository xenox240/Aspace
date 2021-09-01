const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { list } = require('../../util/Util');
const reasons = ['bug', 'feedback', 'suggestion', 'abuse'];
const reasonColors = ['RED', 'GREEN', 'YELLOW', 'ORANGE'];
const displayReasons = ['🐛 Bug Report', '📬 Feedback', '❓ Suggestion', '⚠️ Abuse'];

module.exports = class ReportCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'report',
			aliases: ['bug', 'report-bug', 'feedback', 'contact', 'suggest', 'suggestion', 'abuse', 'report-abuse'],
			group: 'util-public',
			memberName: 'report',
			description: 'Reports something to the bot owner(s).',
			guarded: true,
			args: [
				{
					key: 'reason',
					prompt: `Quelle est la raison de votre signalement ? Soit ${list(reasons, 'ou')}.`,
					type: 'string',
					oneOf: reasons,
					parse: reason => reasons.indexOf(reason.toLowerCase())
				},
				{
					key: 'message',
					prompt: "Quel est le message de votre report ? Si vous signalez un abus, assurez-vous d'inclure l'ID du message.",
					type: 'string'
				}
			]
		});
	}

	async run(msg, { reason, message }) {
		const embed = new MessageEmbed()
			.setDescription(message)
			.setTitle(displayReasons[reason])
			.setAuthor(msg.author.tag)
			.setFooter(`ID: ${msg.author.id}`)
			.setTimestamp()
			.setColor(reasonColors[reason]);
		const channel = await this.client.fetchReportChannel();
		if (channel) {
			try {
				await channel.send({ embed });
			} catch {
				await this.sendOwnerDM(embed);
			}
		} else {
			await this.sendOwnerDM(embed);
		}
		return msg.say(`${displayReasons[reason]} envoyé ! Merci !`);
	}

	async sendOwnerDM(embed) {
		for (const owner of this.client.owners) {
			try {
				await owner.send({ embed });
			} catch {
				continue;
			}
		}
		return null;
	}
};
