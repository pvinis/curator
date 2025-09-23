// const { chromium } = require("playwright");
const { chromium } = require("playwright-extra");
const { notifyPavlos } = require("./notify");

const stealth = require("puppeteer-extra-plugin-stealth")();

chromium.use(stealth);

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
      "https://www.more.com/gr-el/tickets/cinema/karta-ton-10-probolon-2025";
    await page.goto(url);

    await sleep(3000);
    html = await page.content();

    console.log("checking..");
    // checking
    const shouldNotify = async () => {
      const countItems = (html.match(/Νύχτες Πρεμιέρας - Αθήνα, Αττική/g) || [])
        .length;

      const countSoldOut = await page.locator(".eb-button--soldout").count();
      const countPending = (html.match(/μόλις εξαντλήθηκαν/g) || []).length;

      console.log("count is", countItems, countSoldOut, countPending);
      //   return countSoldOut + countPending < countItems;
      //   return countItems > countSoldOut;
      return true;
      // return false;
    };

    if (await shouldNotify()) {
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
