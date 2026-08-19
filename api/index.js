const app = require('../server/index');
const { initDB } = require('../server/db');

let ready = false;

module.exports = async (req, res) => {
  if (!ready) {
    await initDB();
    ready = true;
  }
  return app(req, res);
};
