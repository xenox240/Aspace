const Command = require('../../structures/Command');
const { MersenneTwister19937, integer } = require('random-js');

module.exports = class IQCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'iq',
			aliases: ['intelligence-quotient'],
			group: 'random-seed',
			memberName: 'iq',
			description: 'Determines a user\'s IQ.',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want me to guess the IQ of?',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	run(msg, { user }) {
		const authorUser = user.id === msg.author.id;
		if (user.id === this.client.user.id) return msg.reply('Moi? Mon score de QI est au dessus de tous le monde !');
		if (this.client.isOwner(user)) {
			if (authorUser) return msg.reply("Seul quelqu'un avec un QI plus élevé pourrait faire un bot aussi incroyable que moi !❤");
			return msg.reply(`${user.username}, comme chez mon propriétaire ? Ouais... Pas l'outil le plus tranchant du hangar.`);
		}
		const random = MersenneTwister19937.seed(user.id);
		const score = integer(20, 170)(random);
		return msg.reply(`${authorUser ? 'Ton' : `${user.username}`} score de QI est de ${score}.`);
	}
};
