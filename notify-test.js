const { chromium } = require("playwright");
const { notifyPavlos } = require("./notify");

async function main() {
  console.log("will notify!!");
  notifyPavlos();
}

(async () => {
  await main();
})();
