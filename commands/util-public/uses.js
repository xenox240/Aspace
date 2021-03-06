const Command = require('../../structures/Command');
const { formatNumber } = require('../../util/Util');

module.exports = class UsesCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'uses',
			aliases: ['command-uses', 'cmd-uses'],
			group: 'util-public',
			memberName: 'uses',
			description: 'Responds with a command\'s usage stats.',
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to view the uses of?',
					type: 'command'
				}
			]
		});
	}

	run(msg, { command }) {
		if (command.uses === undefined) return msg.reply('That command\'s usage stats aren\'t being tracked.');
		return msg.say(`La \`${command.name}\` la commande a été utilisée **${formatNumber(command.uses)}** fois.`);
	}
};
