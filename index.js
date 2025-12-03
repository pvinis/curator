// const { chromium } = require("playwright");
const { chromium } = require("playwright-extra");
const { notifyPavlos } = require("./notify");

const stealth = require("puppeteer-extra-plugin-stealth")();

// turn this to ts and bun script
chromium.use(stealth);

async function scanForAnyOpen() {
  // checking
  const countItems = (html.match(/Νύχτες Πρεμιέρας - Αθήνα, Αττική/g) || [])
    .length;

  const countSoldOut = await page.locator(".eb-button--soldout").count();
  const countPending = (html.match(/μόλις εξαντλήθηκαν/g) || []).length;
  console.log("count is", countItems, countSoldOut, countPending);
  // return countSoldOut + countPending < countItems;
  return countItems > countSoldOut;
  // return true;
  // return false;
}

async function scanForSpecific(dates) {
  // Extract event data from the page's initCalendar JSON
  const match = html.match(/scheduleDisplay\.initCalendar\((\{.*?\})\)/s);
  if (!match) {
    console.log("Could not find event data");
    return false;
  }

  const eventsData = JSON.parse(match[1]);
  const events = eventsData.events || [];

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

async function main() {
  try {
    console.log("fetching..");
    // fetch
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      // sometimes this is needed
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

    // const shouldNotify = await scanForAnyOpen()
    const shouldNotify = await scanForSpecific(["2025-12-07", "2025-12-14"]);

    if (await shouldNotify) {
      console.log("will notify!!");
      notifyPavlos(url);
    } else {
      console.log("waiting..");
    }

    // close all
    await context.close();
    await browser.close();
  } catch (err) {
    console.log("ERROR!", err);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  await main();
})();
