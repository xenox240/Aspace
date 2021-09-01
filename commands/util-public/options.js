const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class OptionsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'options',
			aliases: ['options-list'],
			group: 'util-public',
			memberName: 'options',
			description: 'Responds with a list of server options.',
			guarded: true
		});
	}

	run(msg) {
		return msg.say(stripIndents`
			__**Server Options**__
			Placez l'option dans le sujet du canal approprié à utiliser.

			__General Options__
			\`<Lubulule:disable-leave>\` Désactive les messages de départ (canal système).

			__Phone Options__
			\`<Lubulule:phone>\` Permet à ce canal de recevoir des appels téléphoniques.
			\`<Lubulule:phone:auto-accept>\` Accepte automatiquement tous les appels téléphoniques entrants.
			\`<Lubulule:phone:no-notice>\` Masque l'avis d'abus des prises d'appels téléphoniques.
			\`<Lubulule:phone:no-voicemail>\` Empêche ce canal de recevoir des messages vocaux pour les appels manqués.
			\`<Lubulule:phone:no-random>\` Rend le canal uniquement capable d'être appelé directement, plutôt que choisi au hasard.
			\`<Lubulule:phone:block:INSERTIDHERE>\` Empêche un canal ou un serveur de vous contacter par téléphone.
			\`<Lubulule:phone-book:hide>\` Cache ceux salon de \`phone-book\`.

			__Portal Options__
			\`<Lubulule:portal>\` Marque le canal comme canal portail pour \`portal-send\`.
			\`<Lubulule:portal:hide-name>\` Masque le nom du canal lorsque le canal est choisi pour recevoir un message du portail.
		`);
	}
};
