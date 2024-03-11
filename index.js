const { chromium } = require("playwright");
const { notifyPavlos } = require("./notify");

let html = "";
let page = null;

const fetch = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();

  await page.goto(
    "https://www.more.com/theater/i-anodos-tou-artouro-oui-2os-xronos/"
  );

  await sleep(3000);
  html = await page.content();

  // ---------------------
  await context.close();
  await browser.close();
};

const shouldNotify = async () => {
  // string search
  // const count = (html.match(/χρόνος/g) || []).length;

  // class search
  const count = await page.locator(".eb-button--soldout").count();

  console.log("count is", count);
  return count < 39;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

(async () => {
  console.log("checking..");
  await fetch();
  if (await shouldNotify()) {
    console.log("will notify!!");
    notifyPavlos();
  } else {
    console.log("waiting..");
  }
})();
