import type { Page } from "playwright"

export async function scanForAnyOpen(html: string, page: Page) {
	const countItems = (html.match(/Νύχτες Πρεμιέρας - Αθήνα, Αττική/g) || [])
		.length

	const countSoldOut = await page.locator(".eb-button--soldout").count()
	const countPending = (html.match(/μόλις εξαντλήθηκαν/g) || []).length
	console.log("count is", countItems, countSoldOut, countPending)

	return countItems > countSoldOut
}

interface EventData {
	day: string
	isSoldout: boolean
}
interface CalendarData {
	events?: EventData[]
}
export function scanForSpecific(html: string, dates: string[]) {
	const match = html.match(/scheduleDisplay\.initCalendar\((\{.*?\})\)/s)
	if (!match) {
		console.log("Could not find event data")
		return false
	}

	const eventsData: CalendarData = JSON.parse(match[1])
	const events = eventsData.events || []
	// console.log("found events:", JSON.stringify(events))

	for (const date of dates) {
		const event = events.find((e) => e.day === date)
		if (event) {
			console.log(`${date}: isSoldout=${event.isSoldout}`)
			if (!event.isSoldout) {
				console.log(`🎟️ Tickets available for ${date}!`)
				return true
			}
		} else {
			console.log(`${date}: event not found`)
		}
	}

	return false
}
