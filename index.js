const {chromium} = require('playwright')
const {notifyPavlos} = require('./notify')

let html = ''

const fetch = async (day, time) => {
	const browser = await chromium.launch({headless: true})
	const context = await browser.newContext()
	const page = await context.newPage()

	await page.goto('https://www.mariesauvage.com/public-events')

	await sleep(3000)
	html = await page.content()
	// Console.log(html)

	// ---------------------
	await context.close()
	await browser.close()
}

const shouldNotify = () => !html.includes("London - May 5 tickets soon") || !html.includes("London- Miss X produced by Skirt Club, May 6, tickets soon")

const sleep = ms => {
 return new Promise(resolve => setTimeout(resolve, ms)) 
}





(async () => {
	//console.log('checking for 9')
	//await fetch(9, '18:30')
	//if (shouldNotify("6:30")) {
	//console.log('will notify for 9!!')
	//notifyPavlos(9)
	//} else {
	//console.log('same same for 9..')
	//}

	console.log('checking for 6')
	await fetch(6, "19:00")
	if (shouldNotify("7:00")) {
	console.log('will notify for 6!!')
	notifyPavlos(6)
	} else {
	console.log('same same for 6..')
	}
})()

