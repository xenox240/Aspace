const Command = require('../../structures/Command');
const PhoneCall = require('../../structures/phone/PhoneCall');

module.exports = class AdminPhoneCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'admin-phone',
			aliases: ['admin-phone-call', 'admin-call', 'a-phone', 'a-phone-call', 'a-call'],
			group: 'phone',
			memberName: 'admin-phone',
			description: 'Starts an admin phone call with a server.',
			ownerOnly: true,
			args: [
				{
					key: 'channelID',
					prompt: 'What channel would you like to start a call with?',
					type: 'string',
					validate: channelID => /^[0-9]+$/.test(channelID),
					parse: channelID => channelID.toLowerCase()
				}
			]
		});
	}

	async run(msg, { channelID }) {
		if (this.client.phone.inCall(msg.channel)) return msg.say('This channel is already in a phone call.');
		const channel = this.client.channels.cache.get(channelID);
		if (!channel || !channel.guild) return msg.reply('This channel does not exist.');
		try {
			const id = `${msg.guild ? msg.channel.id : msg.author.id}:${channel.id}`;
			this.client.phone.set(id, new PhoneCall(this.client, msg.author, msg.channel, channel, true));
			await this.client.phone.get(id).start();
			return null;
		} catch {
			const id = `${msg.guild ? msg.channel.id : msg.author.id}:${channel.id}`;
			this.client.phone.delete(id);
			return msg.reply('Failed to start the call. Try again later!');
		}
	}
};
