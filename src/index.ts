import { fetchPage } from "./browser"
import { notifyPavlos } from "./notify"
import { scanForSpecific } from "./scanners"

const URL =
	"https://www.more.com/gr-el/tickets/theater/aneksartita-krati-2os-xronos/"
const TARGET_DATES = ["2025-12-07", "2025-12-14"]

async function main() {
	try {
		console.log("fetching..")
		const { html, cleanup } = await fetchPage(URL)

		console.log("checking..")
		const shouldNotify = scanForSpecific(html, TARGET_DATES)

		if (shouldNotify) {
			console.log("will notify!!")
			notifyPavlos(URL)
		} else {
			console.log("waiting..")
		}

		await cleanup()
	} catch (err) {
		console.log("ERROR!", err)
	}
}

await main()
