const fetch = require("node-fetch")

exports.info = {
	name: "txt2img",
	description: "Stable Diffusion v1.5 txt2img",
	disabled: true,
	options: [{ name: "prompt", description: "The prompt.", type: 3, required: true }],
}

exports.run = async (client, interaction) => {
	const { data, member, guildID } = interaction
	if (process.env.NODE_ENV == "production")
		return interaction.createMessage({
			flags: 64,
			content: "this can only be used in a local environment",
		})

	const prompt = data.options[0].value

	interaction.defer()
	const response = await fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			enable_hr: false,
			denoising_strength: 0,
			firstphase_width: 0,
			firstphase_height: 0,
			prompt,
			styles: [""],
			seed: -1,
			subseed: -1,
			subseed_strength: 0,
			seed_resize_from_h: -1,
			seed_resize_from_w: -1,
			sampler_name: "Euler a",
			batch_size: 1,
			n_iter: 1,
			steps: 50,
			cfg_scale: 7,
			width: 512,
			height: 512,
			restore_faces: false,
			tiling: false,
			negative_prompt: "",
			eta: 0,
			s_churn: 0,
			s_tmax: 0,
			s_tmin: 0,
			s_noise: 1,
			override_settings: {},
			sampler_index: "Euler",
		}),
	})

	const json = await response.json()
	const image = json.images[0]

	return interaction.createMessage(`\`${prompt}\``, { file: Buffer.from(image, "base64"), name: "output.png" })
}
