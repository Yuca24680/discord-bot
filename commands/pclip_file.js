const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('matt')
		.setDescription('Test command'),
	async execute(interaction) {
		await interaction.reply('bbbbad to the bone');
	},
};
