const ytdlp = require("yt-dlp-wrap").default

exports.init = async () => {
	if (process.env.NODE_ENV == "production") await ytdlp.downloadFromGithub("/tmp/yt-dlp")
	return new ytdlp(process.env.NODE_ENV == "production" ? "/tmp/yt-dlp" : "/usr/bin/yt-dlp")
}
