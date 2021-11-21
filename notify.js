const push = require('pushsafer-notifications')

const p = new push({k: process.env.PUSHSAFER_KEY})

const notifyPavlos = async () => {
	const message = {
		t: 'GOOOO!',
		m: 'check for reservation now!',
		d: '29625',
	}

	p.send(message)
}

module.exports = {
	notifyPavlos,
}
