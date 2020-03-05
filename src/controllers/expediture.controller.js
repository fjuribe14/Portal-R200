const { getConnection } = require("../db/db");
const { v4 } = require("uuid");
const moment = require("moment");

const expensesCtrl = {};

expensesCtrl.expenditureForm = async (req, res) => {
  res.render("expenses/expenditureAdd");
};

expensesCtrl.expenditureCreate = async (req, res) => {
  const { payto, reason, descrip, mount } = req.body;
  const expenditure = {
    id: v4(),
    date: Date.now(),
    title: "gasto",
    payto,
    reason,
    descrip,
    mount
  };
  const stock = await getConnection()
    .get("stock[0]")
    .value();

  await getConnection()
    .get("stock")
    .find({ id: stock.id })
    .assign({ stock: parseInt(stock.stock) - parseInt(expenditure.mount) })
    .write();

  await getConnection()
    .get("expenses")
    .push(expenditure)
    .write();
  req.flash("success_msg", "Gasto creado exitosamente");
  res.redirect(`/expenses/${expenditure.id}`);
};

expensesCtrl.expenditureReceipt = async (req, res) => {
  const expenditure = await getConnection()
    .get("expenses")
    .find({ id: req.params.id })
    .value();
  const date = moment(expenditure.date).format("d/MM/YY - h:mm a");
  res.render("expenses/expenditureReceipt", { expenditure, date });
};

expensesCtrl.expenditureEditForm = async (req, res) => {
  const expenditure = await getConnection()
    .get("expenses")
    .find({ id: req.params.id })
    .value();
  res.render("expenses/expenditureEdit", { expenditure });
};

expensesCtrl.expenditureEdit = async (req, res) => {
  const { payto, reason, descrip, mount } = req.body;
  await getConnection()
    .get("expenses")
    .find({ id: req.params.id })
    .assign({ payto, reason, descrip, mount })
    .write();
  req.flash("success_msg", "Gasto modificado exitosamente");
  res.redirect("/");
};

expensesCtrl.expenditureDelete = async (req, res) => {
  const expenditure = await getConnection()
    .get("expenses")
    .find({ id: req.params.id })
    .value();

  const stock = await getConnection()
    .get("stock[0]")
    .value();

  await getConnection()
    .get("stock")
    .find({ id: stock.id })
    .assign({ stock: parseInt(stock.stock) + parseInt(expenditure.mount) })
    .write();

  await getConnection()
    .get("expenses")
    .remove({ id: req.params.id })
    .write();
  req.flash("success_msg", "Gasto eliminado exitosamente");
  res.redirect("/");
};

module.exports = expensesCtrl;
