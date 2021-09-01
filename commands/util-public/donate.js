const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class DonateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'donate',
			aliases: ['paypal'],
			group: 'util-public',
			memberName: 'donate',
			description: 'Responds with the bot\'s donation links.',
			guarded: true,
			credit: [
				{
					name: 'PayPal',
					url: '',
					reason: 'Donation Gathering'
				}
			]
		});
	}

	run(msg) {
		return msg.say(stripIndents`
			Contribue au développement !
			
		`);
	}
};
