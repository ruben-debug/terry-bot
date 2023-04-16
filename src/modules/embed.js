module.exports = (client, author, data) => {
	if (!author) author = { user: {} }

	let embed = {
		title: data.title,
		url: data.url,
		color: data.color ? parseInt("0x" + data.color.replace("#", "")) : undefined,
		footer: {
			icon_url: data.footerUrl || `https://cdn.discordapp.com/avatars/${author.user.id}/${author.user.avatar}.webp`,
			text: data.footerText || `${author.user.username}#${author.user.discriminator}`,
		},
		description: data.description || "",
		fields: data.fields || [],
		image: {
			url: data.imageUrl,
		},
		thumbnail: {
			url: data.thumbnailUrl,
		},
	}

	if (!author.user.id) {
		embed.footer.icon_url = data.footerUrl
		embed.footer.text = data.footerText
	}

	return embed
}
