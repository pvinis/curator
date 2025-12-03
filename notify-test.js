const { chromium } = require("playwright");
const { notifyPavlos } = require("./notify");

async function main() {
  console.log("will notify!!");
  notifyPavlos("https://su.gr");
}

(async () => {
  await main();
})();
