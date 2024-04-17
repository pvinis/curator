require("dotenv").config();
const push = require("pushsafer-notifications");

const p = new push({ k: process.env.PUSHSAFER_KEY });

const notifyPavlos = async (url) => {
  const message = {
    t: "GOOOO!",
    m: `check for reservation now`,
    u: url,
  };

  p.send(message);
};

module.exports = {
  notifyPavlos,
};
