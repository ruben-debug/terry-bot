const VALID_URLS = ["www.youtube.com", "youtube.com", "music.youtube.com", "youtu.be"]

exports.validateUrl = (url) => {
	try {
		return VALID_URLS.includes(new URL(url).host)
	} catch (_) {
		return false
	}
}

exports.formatSeconds = (sec) => {
	const minutes = Math.floor(sec / 60)
	const seconds = sec - minutes * 60

	return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
}
