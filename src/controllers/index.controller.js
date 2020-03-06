const { getConnection } = require("../db/db");
const { v4 } = require("uuid");
const moment = require("moment");

const indexCtrl = {};

indexCtrl.index = async (req, res) => {
  const payments = await getConnection()
    .get("payment")
    .orderBy("date", "desc")
    .value();
  const expenses = await getConnection()
    .get("expenses")
    .orderBy("date", "desc")
    .value();
  const stock = await getConnection()
    .get("stock")
    .orderBy("date", "desc")
    .value();
  const news = await getConnection()
    .get("news")
    .orderBy("date", "desc")
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
