const Command = require('../../structures/Command');
const { MessageEmbed, MessageAttachment, Message } = require("discord.js");

module.exports = class PackCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pack-planet',
			aliases: ['pack'],
			group: 'info',
			memberName: 'pack',
			description: 'Responds with the pack of server.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

async run(msg, user, bot) {
	if (!msg.guild.members.cache.has(msg.guild.ownerID)) await msg.guild.members.fetch(msg.guild.ownerID);
	
    const embed = new MessageEmbed()
  .setAuthor(msg.author.tag)
  .setColor('RANDOM')
  .setTitle("Voici le planet pack du serveur")
  .setURL("https://mega.nz/file/V0BhhSaT#CcFPiZ93MHMdavOz0OkN2S9VDaYxHW_usSuTWIe-QQM")
  .setImage("https://cdn.discordapp.com/attachments/726126376482242570/880170909573464074/Screenshot_2021-08-25-21-24-29-38_cba7b177b2edecae2cc69ac3f7d2b91d.jpg")
  .setFooter("En cas de problème avec le pack, faites !aide ")
  .setTimestamp()
  return msg.embed(embed);
}
}
