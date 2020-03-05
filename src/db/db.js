const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const path = require("path");

let db;

async function createConnection() {
  const adapter = new FileAsync(path.join(__dirname, "db.json"));
  db = await low(adapter);
  db.defaults({
    users: [],
    stock: [],
    payment: [],
    expenses: [],
    news: []
  }).write();
}

const getConnection = () => db;

module.exports = {
  createConnection,
  getConnection
};
