const { chromium } = require("playwright")
const { notifyPavlos } = require("./notify")

let html = ""

const fetch = async () => {
	const browser = await chromium.launch({ headless: true })
	const context = await browser.newContext()
	const page = await context.newPage()

	await page.goto("https://tickets.public.gr/theater/oi-gries-pou-mazeuoun-tin-tsouknida-1/")

	await sleep(3000)
	html = await page.content()

	// ---------------------
	await context.close()
	await browser.close()
}

const shouldNotify = () => {
	const count = (html.match(/Βίκτωρος Ουγκώ 55/g) || []).length
	console.log("count is", count)

	return count > 1
}

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

;(async () => {
	console.log("checking..")
	await fetch()
	if (shouldNotify()) {
		console.log("will notify!!")
		notifyPavlos()
	} else {
		console.log("waiting..")
	}
})()
