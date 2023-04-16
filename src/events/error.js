module.exports = (client, error) => {
	if ([1001, 1006].includes(error.code)) return
	console.log(error)
}
