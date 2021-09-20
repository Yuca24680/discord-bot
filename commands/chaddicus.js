const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chaddicusSupremus')
		.setDescription('Test command'),
	async execute(interaction) {
		await interaction.reply('https://raw.githubusercontent.com/Yuca24680/discord-bot/344d38f2f1cf6f1ae357ad4a870829ddbf51941f/assets/chad.png');
	},
};
