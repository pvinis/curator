const {chromium} = require('playwright')
const {notifyPavlos} = require('./notify')

let html = ''

const fetch = async (day, time) => {
	const browser = await chromium.launch({headless: true})
	const context = await browser.newContext()
	const page = await context.newPage()

	await page.goto('https://www.opentable.com/restref/client/?restref=100438')

	// Select 3
	await page.selectOption('[aria-label="Party size"]', '3')

	// Click [aria-label="Date"]
	await page.click('[aria-label="Date"]')

	// Click text=567891011 >> [aria-label="day-9"]
	await page.click(`text=567891011 >> [aria-label="day-${day}"]`)

	// Select 18:30
	await page.selectOption('[aria-label="Reservation time"]', time)

	// Click button:has-text("Find a table")
	await page.click('button:has-text("Find a table")')

	await sleep(3000)
	html = await page.content()
	// Console.log(html)

	// ---------------------
	await context.close()
	await browser.close()
}

const shouldNotify = time => !html.includes(`no online availability within 2.5 hours of ${time} pm`)

const sleep = ms => {
 return new Promise(resolve => setTimeout(resolve, ms)) 
}

(async () => {
	console.log('checking for 9')
	await fetch(9, '18:30')
	if (shouldNotify("6:30")) {
	console.log('will notify for 9!!')
	notifyPavlos(9)
	} else {
	console.log('same same for 9..')
	}

	console.log('checking for 6')
	await fetch(6, "19:00")
	if (shouldNotify("7:00")) {
	console.log('will notify for 6!!')
	notifyPavlos(6)
	} else {
	console.log('same same for 6..')
	}
})()

