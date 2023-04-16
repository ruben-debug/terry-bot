const { createReadStream, unlinkSync } = require("fs")
const ffmpeg = require("fluent-ffmpeg")

// const stream = client.dlp.execStream([video.url, "-o", "-"])
// stream.once("readable", () => voiceConnection.play(stream))
// voiceConnection.once("end", resolve)
