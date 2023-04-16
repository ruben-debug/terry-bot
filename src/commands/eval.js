const path = require("path")

exports.info = {
	name: "eval",
	description: "Evaluate JavaScript code on the host's machine.",
	disabled: true,
	options: [{ name: "code", description: "The code to evaluate.", type: 3, required: true }],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	try {
		const result = await eval(`async function _(client, interaction) { ${data.options[0].value} } _(client, interaction)`)
		return interaction.createMessage({
			embed: client.embed(member, {
				color: "#00ff00",
				authorName: "Eval",
				description: "```\n" + (result || "[No output]") + "\n```",
			}),
		})
	} catch (e) {
		return interaction.createMessage({
			embed: client.embed(member, {
				color: "#ff0000",
				authorName: "Eval",
				title: `${e.name.slice(0, 100)}: ${e.message.slice(0, 100)}`,
				description: "```\n" + e.stack.split(path.resolve("./")).join(".") + "\n```",
			}),
		})
	}
}
