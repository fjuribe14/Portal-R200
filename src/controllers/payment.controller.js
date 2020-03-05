const { getConnection } = require("../db/db");
const { v4 } = require("uuid");
const moment = require("moment");

const paymentCtrl = {};

paymentCtrl.getPayments = async (req, res) => {
  const payments = await getConnection()
    .get("payment")
    .value();
  res.json(payments);
};

paymentCtrl.getPayment = async (req, res) => {
  const payment = await getConnection()
    .get("payment")
    .find({ id: req.params.id })
    .value();
  const date = moment(payment.date).format("d/MM/YY - h:mm a");
  res.render("payment/paymentReceipt", { payment, date });
};

paymentCtrl.formPayment = (req, res) => {
  res.render("payment/paymentAdd");
};

paymentCtrl.createPayment = async (req, res) => {
  const { apto, month, mount } = req.body;
  const newPayment = {
    id: v4(),
    date: Date.now(),
    title: "pago",
    apto,
    month,
    status: false,
    mount
  };
  await getConnection()
    .get("payment")
    .push(newPayment)
    .write();
  req.flash("success_msg", "pago creado exitosamente");
  res.redirect(`/payment/${newPayment.id}`);
};

paymentCtrl.updatePaymentForm = async (req, res) => {
  const payment = await getConnection()
    .get("payment")
    .find({ id: req.params.id })
    .value();
  res.render("payment/paymentEdit", { payment });
};

paymentCtrl.updatePayment = async (req, res) => {
  const { apto, month, mount } = req.body;
  await getConnection()
    .get("payment")
    .find({ id: req.params.id })
    .assign({ apto, month, mount })
    .write();
  res.redirect("/");
};

paymentCtrl.deletePayment = async (req, res) => {
  const payment = await getConnection()
    .get("payment")
    .find({ id: req.params.id })
    .value();

  const stock = await getConnection()
    .get("stock[0]")
    .value();

  await getConnection()
    .get("payment")
    .remove({ id: req.params.id })
    .write();

  if (stock.stock == 0) {
    res.redirect("/");
  } else {
    await getConnection()
      .get("stock")
      .find({ id: stock.id })
      .assign({ stock: parseInt(stock.stock) - parseInt(payment.mount) })
      .write();
    res.redirect("/");
  }
};

paymentCtrl.validatePayment = async (req, res) => {
  const payment = await getConnection()
    .get("payment")
    .find({ id: req.params.id })
    .value();

  await getConnection()
    .get("payment")
    .find({ id: payment.id })
    .assign({ status: true })
    .write();

  const stock = await getConnection()
    .get("stock[0]")
    .value();

  await getConnection()
    .get("stock")
    .find({ id: stock.id })
    .assign({ stock: parseInt(stock.stock) + parseInt(payment.mount) })
    .write();

  res.redirect("/");
};

module.exports = paymentCtrl;
