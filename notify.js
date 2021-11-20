const push = require('pushsafer-notifications')

const p = new push({
	k: process.env.PUSHSAFER_KEY,
})

const notifyPavlos = async () => {
	const message = {
		t: 'Let\'s GOOOO!',
		m: 'check now!',
		d: '29625',
	}

	// p.send(message)
    console.log(process.env)
}

notifyPavlos()