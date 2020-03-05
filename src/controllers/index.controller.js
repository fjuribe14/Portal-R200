const { getConnection } = require("../db/db");
const { v4 } = require("uuid");
const moment = require("moment");

const indexCtrl = {};

indexCtrl.index = async (req, res) => {
  const payments = await getConnection()
    .get("payment")
    .sortBy("date")
    .value();
  const expenses = await getConnection()
    .get("expenses")
    .value();
  const stock = await getConnection()
    .get("stock")
    .value();
  const news = await getConnection()
    .get("news")
    .value();

  const update = moment().calendar(stock.date);
  res.render("dashboard/index", { stock, payments, expenses, news, update });
};

indexCtrl.stock = async (req, res) => {
  const { stock } = req.body;
  const newStock = {
    id: v4(),
    date: Date.now(),
    stock
  };
  await getConnection()
    .get("stock")
    .push(newStock)
    .write();
  res.json(newStock);
};

module.exports = indexCtrl;
