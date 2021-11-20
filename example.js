const fs = require('fs')
const {chromium} = require('playwright')

const previousFile = 'out.txt'
const nextFile = 'out-new.txt'

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
	await fetchAndSave()
	if (shouldNotify()) {
		console.log('will notify!!')
	} else {
		console.log('same same..')
	}
})()
