exports.info = {
	name: "revoke",
	description: "Remove someone's admin permissions.",
	disabled: true,
	options: [{ name: "user", description: "The user.", type: 6, required: true }],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction
	const user = data.options[0].value

	client.admins.pop(user)
	return interaction.createMessage("you got it boss")
}
