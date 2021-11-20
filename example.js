const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://testingbot.com/');

  // Click text=Accept All
  await page.click('text=Accept All');

  // Click :nth-match(div:has-text("Take your automated and manual testing to the next level. With over 9 years of e"), 2)
  await page.click(':nth-match(div:has-text("Take your automated and manual testing to the next level. With over 9 years of e"), 2)');

  // Click text=Pricing
  await page.click('text=Pricing');
  // assert.equal(page.url(), 'https://testingbot.com/pricing');

  // Click text=1 Parallel Test 1 Parallel Test 1000 Automated Minutes 2 Parallel Tests 2000 Aut
  await page.click('text=1 Parallel Test 1 Parallel Test 1000 Automated Minutes 2 Parallel Tests 2000 Aut');

  // Click text=10,000 Automated Minutes
  await page.click('text=10,000 Automated Minutes');


  // ---------------------
  await context.close();
  await browser.close();
})();



const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
