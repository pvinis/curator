const { chromium } = require("playwright");
const { notifyPavlos } = require("./notify");

async function main() {
  console.log("fetching..");
  // fetch
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();

  await page.goto(
    "https://www.more.com/theater/i-anodos-tou-artouro-oui-2os-xronos"
  );

  await sleep(3000);
  html = await page.content();

  console.log("checking..");
  // checking
  const shouldNotify = async () => {
    // string search
    // const count = (html.match(/χρόνος/g) || []).length;

    // class search
    const count = await page.locator(".eb-button--soldout").count();

    console.log("count is", count);
    return count < 39;
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
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  await main();
})();
