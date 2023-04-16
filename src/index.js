const fs = require("fs")
const Eris = require("eris")
const { Collection } = require("eris")
const client = new Eris(process.env.TOKEN, { restMode: true, defaultImageFormat: "png", defaultImageSize: 256 })

const embed = require("./modules/embed")
const youtube = require("./modules/youtube")

client.admins = []
client.commands = new Map()
client.queues = new Map()
client.embed = embed.bind(null, client)

for (let file of fs.readdirSync(`${__dirname}/commands`)) {
	if (!file.endsWith(".js")) continue
	client.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
}

for (let file of fs.readdirSync(`${__dirname}/events`)) {
	if (!file.endsWith(".js")) continue
	client.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, client))
}

youtube.init().then((dlp) => {
	client.dlp = dlp
	client.connect()
})

client.once("ready", async () => {
	console.log(`[Discord] Logged into ${client.user.username}#${client.user.discriminator}`)

	// Could use a touch-up, will do eventually
	const slashCommands = await client.getCommands()

	client.commands.forEach(async (value, key) => {
		if (!slashCommands.find((_) => _.name == key)) {
			console.log(`[Discord] Registering ${key}`)
			const cmd = client.commands.get(key)
			await client.createCommand(cmd.info)
		}
	})

	slashCommands.forEach(async (cmd) => {
		if (!Object.fromEntries(client.commands)[cmd.name]) {
			console.log(`[Discord] Deleting ${cmd.name}`)
			await client.deleteCommand(cmd.id)
		}
	})
})
