const fs = require('fs')
const {chromium} = require('playwright')
const {notifyPavlos} = require('./notify')

let html = ''

const fetchAndSave = async () => {
	const browser = await chromium.launch({headless: true})
	const context = await browser.newContext()
	const page = await context.newPage()

	await page.goto('https://ispavloshereyet.com')

	html = await page.content()

	// ---------------------
	await context.close()
	await browser.close()
}

const shouldNotify = () => {
	return html.includes('position')
}

(async () => {
//	Await fetchAndSave()
//	if (shouldNotify()) {
//		console.log('will notify!!')
//		notifyPavlos()
//	} else {
//		console.log('same same..')
//	}
// notifyPavlos()
	console.log({a: process.env.NODE_ENV,
		b: process.env.PUSHSAFER_KEY})
	if (process.env.PUSHSAFER_KEY !== undefined) {
		console.log('ok')
	} else {
		console.log('und')
	}
})()

