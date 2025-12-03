import { chromium } from "playwright-extra"
import stealth from "puppeteer-extra-plugin-stealth"

chromium.use(stealth())

const USER_AGENT =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0"

interface FetchResult {
	html: string
	page: import("playwright").Page
	cleanup: () => Promise<void>
}

export async function fetchPage(url: string): Promise<FetchResult> {
	const browser = await chromium.launch({ headless: true })
	const context = await browser.newContext({ userAgent: USER_AGENT })
	const page = await context.newPage()

	await page.goto(url)
	await Bun.sleep(3000)

	const html = await page.content()

	const cleanup = async () => {
		await context.close()
		await browser.close()
	}

	return { html, page, cleanup }
}
