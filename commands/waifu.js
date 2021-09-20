const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require ('axios')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('Random Waifu'),
	async execute(interaction) {
		await getWaifu(interaction);
	},
};

async function getWaifu(interaction) {
  try {
      const response = await axios.get('https://api.waifu.pics/sfw/waifu');
      console.log(response);
      waifuLink = response.data.url;
  } catch (error) {
      console.error(error);
  }
  return interaction.reply(waifuLink);
}
