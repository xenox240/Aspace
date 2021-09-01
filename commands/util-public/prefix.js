const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class PrefixCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prefix',
			group: 'util-public',
			memberName: 'prefix',
			description: 'Responds with the bot\'s command prefix.',
			guarded: true
		});
	}

	run(msg) {
		const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
		return msg.reply(stripIndents`
			${prefix ? `Le prefix de commande est \`${prefix}\`.` : "Il n'y a pas de préfixe de commande."}
			Pour exécuter une commande, utilisez ${msg.anyUsage('<command>')}.
		`);
	}
};
