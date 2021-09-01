const Command = require('../../structures/Command');
const { MersenneTwister19937, integer } = require('random-js');
const texts = require('../../assets/json/name-rater');
const { NAME_RATER_EMOJI_ID } = process.env;

module.exports = class NameRaterCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'name-rater',
			aliases: ['name-rate', 'rate-name'],
			group: 'random-seed',
			memberName: 'name-rater',
			description: 'Determines a name\'s quality.',
			credit: [
				{
					name: 'Pokémon',
					url: 'https://www.pokemon.com/us/',
					reason: 'Sprite'
				}
			],
			args: [
				{
					key: 'name',
					prompt: 'What name do you want to determine the quality of?',
					type: 'string',
					max: 25,
					default: msg => msg.author.username
				}
			]
		});
	}

	run(msg, { name }) {
		if (name.toLowerCase() === 'xiao') {
			return msg.say(`<:nameRater:${NAME_RATER_EMOJI_ID}> Yes, ${name}! What a perfect name! I'm speechless!`);
		}
		const random = MersenneTwister19937.seed(this.stringToSeed(name.toLowerCase()));
		const quality = integer(0, texts.length - 1)(random);
		return msg.say(`<:nameRater:${NAME_RATER_EMOJI_ID}> ${texts[quality].replace(/{{name}}/gi, name)}`);
	}

	stringToSeed(str) {
		if (!str) return 0;
		let hash = 0;
		for (const char of str.split('')) {
			hash += char.charCodeAt(0);
		}
		return hash;
	}
};
