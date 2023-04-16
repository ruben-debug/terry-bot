const fetch = require("node-fetch")

exports.info = {
	name: "execute",
	description: "Execute a script on a game.",
	disabled: true,
	options: [
		{ name: "game", description: "The game ID.", type: 4, required: true },
		{ name: "script", description: "The script to run.", type: 3, required: true },
	],
}

exports.run = async (client, interaction) => {
	const { data, member, guildID } = interaction
	const id = data.options[0].value
	const script = `local success, message = pcall(function() ${data.options[1].value} end) return success or message`

	await interaction.defer()

	const response = await fetch(`http://${process.env.CRAPBLOX_ARBITER}/game/execute/${id}?key=${process.env.CRAPBLOX_ARBITER_KEY}`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ script }),
	}).catch((_) => _)

	if (response?.message)
		return interaction.createMessage({
			flags: 64,
			content: "arbiter/game is not running",
		})

	const json = await response.json()
	const result = json.response[0]?.ExecuteResult[0]?.value

	if (!result) return interaction.createMessage("```\n[No Output]\n```")
	interaction.createMessage("```\n" + result + "\n```")
}
