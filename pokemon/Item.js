const { firstUpperCase } = require('../../util/Util');

module.exports = class Item {
	constructor(store, data) {
		this.store = store;
		this.id = data.id;
		const slugName = firstUpperCase(data.name).replaceAll('-', ' ');
		this.name = data.names.length
			? data.names.find(entry => entry.language.name === 'en').name
			: slugName;
		this.description = data.effect_entries.length
			? data.effect_entries.find(entry => entry.language.name === 'en').effect.replace(/\n|\f|\r/g, ' ')
			: data.flavor_text_entries.length
				? data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text.replace(/\n|\f|\r/g, ' ')
				: null;
		this.spriteURL = data.sprites.default || null;
		this.cost = data.cost || 0;
	}

	get slug() {
		return this.store.makeSlug(this.name);
	}
};
