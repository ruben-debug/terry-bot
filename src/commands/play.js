const { validateUrl, formatSeconds } = require("../modules/util")
const { randomUUID } = require("crypto")
const player = require("../modules/player")
const { writeFileSync } = require("fs")

exports.info = {
	name: "play",
	description: "Start playing something.",
	disabled: true,
	options: [{ name: "url", description: "The resource url.", type: 3, required: true }],
}

exports.run = async (client, interaction) => {
	const { data, member, guildID } = interaction
	const url = data.options[0].value
	let voiceConnection

	if (!validateUrl(url)) return interaction.createMessage({ content: "invalid url" })
	if (!member.voiceState || !member.voiceState.channelID) return interaction.createMessage({ content: "you gotta be in a channel boss" })
	if (!client.voiceConnections.find((_) => _.id == guildID)) voiceConnection = await client.joinVoiceChannel(member.voiceState.channelID)
	else if (client.voiceConnections.find((_) => _.id == guildID).channelID !== member.voiceState.channelID) return interaction.createMessage({ content: "you gotta be in the channel with the bot boss" })
	interaction.defer()

	const metadata = await client.dlp.getVideoInfo(url)
	const video = {
		id: metadata.id,
		title: metadata.title,
		url: metadata.webpage_url,
		thumbnail: metadata.thumbnail,
		requested: member.id,
		uploader: metadata.uploader,
		uploader_url: metadata.uploader_url,
		duration: metadata.duration,
		timestamp: Date.now(),
	}

	return interaction.createMessage({
		embed: client.embed(null, {
			title: video.title,
			url: video.url,
			thumbnailUrl: video.thumbnail,
			description: `Added to queue by <@${video.requested}>`,
			fields: [
				{ name: "Uploader", value: `[${video.uploader}](${video.uploader_url})`, inline: true },
				{ name: "Duration", value: `\`${formatSeconds(video.duration)}\``, inline: true },
				{ name: "Position", value: `\`No youre not\``, inline: true },
			],
		}),
	})
}
