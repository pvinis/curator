const { chromium } = require("playwright");
const { notifyPavlos } = require("./notify");

let html = "";

const fetch = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://ispavloshereyet.com");

  html = await page.content();

  // ---------------------
  await context.close();
  await browser.close();
};

const shouldNotify = () => {
  return html.includes("wow test");
};

(async () => {
  await fetch();
  if (shouldNotify()) {
    console.log("will notify!!");
    notifyPavlos();
  } else {
    console.log("same same..");
  }
})();
