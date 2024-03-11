const { chromium } = require("playwright");
const { notifyPavlos } = require("./notify");

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

    await page.goto(
      "https://www.more.com/theater/i-anodos-tou-artouro-oui-2os-xronos"
    );

    await sleep(3000);
    html = await page.content();

    console.log("checking..");
    // checking
    const shouldNotify = async () => {
      const countItems = (html.match(/Θέατρο ARK - Αθήνα, Αττική/g) || [])
        .length;

      const countSoldOut = await page.locator(".eb-button--soldout").count();
      const countPending = (html.match(/μόλις εξαντλήθηκαν/g) || []).length;

      console.log("count is", countItems, countSoldOut, countPending);
      return countSoldOut + countPending < countItems;
    };

    if (await shouldNotify()) {
      console.log("will notify!!");
      notifyPavlos();
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
