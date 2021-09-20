const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require ('axios')

const PLACE_API = 'https://maps.googleapis.com/maps/api/place'

module.exports = {
	data: new SlashCommandBuilder()
    .setName('review')
    .setDescription('Get Google review for a place')
    .addStringOption(option =>
      option.setName('place')
        .setDescription('name of place')
        .setRequired(true)),
  async execute(interaction) {
    await getReviews(interaction);
  },
};

// Refer to Matthew's bot instead
async function getReviews(interaction) {
  const place = interaction.options.getString('place')
  return interaction.reply({
    ephemeral: true, // Show privatly
    content: `Run \`=r ${place}\` instead`
  })

  const { data: { candidates} } = await axios.get(`${PLACE_API}/findplacefromtext/json?key=${process.env.GOOGLE_API_KEY}`, generateGetPlacePayload(place))
  const { place_id } = candidates[0];

  const { data: { result } } = await axios.get(`${PLACE_API}/details/json?key=${process.env.GOOGLE_API_KEY}`, generatePlaceDetailsPayload(place_id))

  return interaction.reply({
    ephemeral: true, // Show publicly
    embeds: [generateEmbed(result)]
  })
}

function generateEmbed (review) {
  const embed = new MessageEmbed().setTitle(review.name)

  if (review.icon) embed.setThumbnail(review.icon)
  if (review.website) embed.setURL(review.website)
  if (review.formatted_address) embed.addField("Address", review.formatted_address)
  if (review.rating && review.user_ratings_total) embed.addField("Rating", `${review.rating} (${review.user_ratings_total})`, true)
  if (review.price_level) embed.addField("Price", "$".repeat(review.price_level), true)
  if (review.opening_hours) {
    const { open_now, weekday_text } = review.opening_hours
    embed.setColor(open_now ? '#42b983' : '#ff0033')

    // Rearrange array
    const sunday = weekday_text.pop()
    weekday_text.unshift(sunday)

    const date = new Date()
    const today = date.getDay()
    const tomorrow = (today + 1) % 7
    embed.addField("Hours", weekday_text[today], true)
    embed.addField("Tomorrow's hours", weekday_text[tomorrow], true)
  }

  return embed
}

function generateGetPlacePayload(place) {
  return {
    "params": {
      "input": `${place}`,
      "inputtype": "textquery",
      "fields": "place_id",
    }
  }
}

function generatePlaceDetailsPayload(place_id) {
  return {
    "params": {
      "place_id": `${place_id}`,
      "fields": "formatted_address,name,rating,opening_hours,website,price_level,user_ratings_total,icon",
    }
  }
}