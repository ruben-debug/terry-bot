exports.info = {
	name: "queue",
	description: "Show the queue.",
	disabled: true,
	options: [],
}

// exports.run = async (client, interaction) => {
// 	const { data, member, guildID } = interaction
// 	const queue = client.queues.get(guildID)

// 	if (queue) interaction.createMessage({ content: "```\n" + JSON.stringify(queue, null, 4) + "\n```" })
// 	else interaction.createMessage({ content: "no queue" })
// }
