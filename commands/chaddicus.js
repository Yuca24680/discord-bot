const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chaddicus')
		.setDescription('returns chaddius'),
	async execute(interaction) {
    await interaction.reply({files: ['./assets/chad.png']});
  },
};

