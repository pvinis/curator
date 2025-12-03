import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
import { notifyPavlos } from "./notify";
import type { Page } from "playwright";

chromium.use(stealth());

let page: Page;
let html: string;

async function scanForAnyOpen() {
  const countItems = (html.match(/Νύχτες Πρεμιέρας - Αθήνα, Αττική/g) || [])
    .length;

  const countSoldOut = await page.locator(".eb-button--soldout").count();
  const countPending = (html.match(/μόλις εξαντλήθηκαν/g) || []).length;
  console.log("count is", countItems, countSoldOut, countPending);
  return countItems > countSoldOut;
}

interface EventData {
  day: string;
  isSoldout: boolean;
}

interface CalendarData {
  events?: EventData[];
}

async function scanForSpecific(dates: string[]) {
  const match = html.match(/scheduleDisplay\.initCalendar\((\{.*?\})\)/s);
  if (!match) {
    console.log("Could not find event data");
    return false;
  }

  const eventsData: CalendarData = JSON.parse(match[1]);
  const events = eventsData.events || [];
  console.log("found events:", JSON.stringify(events));

  for (const date of dates) {
    const event = events.find((e) => e.day === date);
    if (event) {
      console.log(`${date}: isSoldout=${event.isSoldout}`);
      if (!event.isSoldout) {
        console.log(`🎟️ Tickets available for ${date}!`);
        return true;
      }
    } else {
      console.log(`${date}: event not found`);
    }
  }

  return false;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  try {
    console.log("fetching..");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0",
    });
    page = await context.newPage();

    const url =
      "https://www.more.com/gr-el/tickets/theater/aneksartita-krati-2os-xronos/";
    await page.goto(url);

    await sleep(3000);
    html = await page.content();

    console.log("checking..");

    const shouldNotify = await scanForSpecific(["2025-12-07", "2025-12-14"]);

    if (shouldNotify) {
      console.log("will notify!!");
      notifyPavlos(url);
    } else {
      console.log("waiting..");
    }

    await context.close();
    await browser.close();
  } catch (err) {
    console.log("ERROR!", err);
  }
}

await main();
