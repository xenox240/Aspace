const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const permissions = require('../../assets/json/permissions');

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util-public',
			memberName: 'invite',
			description: 'Responds with the bot\'s invite links.',
			guarded: true
		});
	}

	async run(msg) {
		const invite = await this.client.generateInvite({ permissions });
		return msg.say(stripIndents`
		Invitez-moi via ce lien:
			<${invite}>

		`);
	}
};
