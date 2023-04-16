const fetch = require("node-fetch")
const { format } = require("util")

const keys = {
	[process.env.CRAPBLOX_ARBITER]: process.env.CRAPBLOX_ARBITER_KEY,
}

const endpoints = {
	headshot: "render/user/%d/headshot",
	bodyshot: "render/user/%d/bodyshot",
	asset: "render/asset/%d",
	game: "render/game/%d",
}

exports.info = {
	name: "render",
	description: "Render an asset accessible by terry bot",
	disabled: false,
	options: [
		{
			name: "website",
			description: "The website.",
			type: 3,
			required: true,
			choices: [{ name: "Crapblox", value: process.env.CRAPBLOX_ARBITER }],
		},
		{
			name: "type",
			description: "The render type.",
			type: 3,
			required: true,
			choices: [
				{ name: "Headshot", value: "headshot" },
				{ name: "Bodyshot", value: "bodyshot" },
				{ name: "Asset", value: "asset" },
				{ name: "Game", value: "game" },
			],
		},
		{ name: "id", description: "The render ID.", type: 4, required: true },
	],
}

exports.run = async (client, interaction) => {
	const { data, member, guildID } = interaction
	const arbiter = data.options[0].value
	const type = data.options[1].value
	const id = data.options[2].value

	await interaction.defer()
	const response = await fetch(`http://${arbiter}/${format(endpoints[type], id)}?key=${keys[arbiter]}`).catch((_) => _)
	if (response?.message) return interaction.createMessage("arbiter is not running")
	const file = await response.text()

	if (!file) return interaction.createMessage("arbiter didn't return data (is the site down?)")
	return interaction.createMessage({ embeds: [] }, { file: Buffer.from(file, "base64"), name: "render.png" })
}
