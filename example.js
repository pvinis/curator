const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.opentable.com/restref/client/?restref=100438
  await page.goto('https://www.opentable.com/restref/client/?restref=100438');

  // Go to https://www.opentable.com/restref/client/?restref=100438&corrid=f2a02031-800c-4b9b-95fc-120b7096447d
  await page.goto('https://www.opentable.com/restref/client/?restref=100438&corrid=f2a02031-800c-4b9b-95fc-120b7096447d');

  // Select 3
  await page.selectOption('[aria-label="Party size"]', '3');

  // Click [aria-label="Date"]
  await page.click('[aria-label="Date"]');

  // Click text=567891011 >> [aria-label="day-9"]
  await page.click('text=567891011 >> [aria-label="day-9"]');

  // Select 18:30
  await page.selectOption('[aria-label="Reservation time"]', '18:30');

  // Click button:has-text("Find a table")
  await page.click('button:has-text("Find a table")');

  // Click text=At the moment, there’s no online availability within 2.5 hours of 6:30 pm.Future
  await page.click('text=At the moment, there’s no online availability within 2.5 hours of 6:30 pm.Future');

  // Triple click text=At the moment, there’s no online availability within 2.5 hours of 6:30 pm.
  await page.click('text=At the moment, there’s no online availability within 2.5 hours of 6:30 pm.', {
    clickCount: 3
  });

  // ---------------------
  await context.close();
  await browser.close();
})();