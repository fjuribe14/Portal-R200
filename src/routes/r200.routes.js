const router = require("express").Router();

// Authorize
const { isAuthenticated } = require("../helpers/passport");

// Controllers

// *** dashboard
const { index, stock } = require("../controllers/index.controller");

// *** payments
const {
  getPayments,
  getPayment,
  formPayment,
  createPayment,
  updatePayment,
  deletePayment,
  validatePayment,
  updatePaymentForm
} = require("../controllers/payment.controller");

// *** expenses
const {
  expenditureCreate,
  expenditureForm,
  expenditureEdit,
  expenditureEditForm,
  expenditureReceipt,
  expenditureDelete
} = require("../controllers/expediture.controller");

// *** news
const {
  newsCreate,
  newsCreateForm,
  newsUpdate,
  newsDelete
} = require("../controllers/news.controller");

// payments GET
router.get("/", isAuthenticated, index);

// stock POST
router.post("/stock", isAuthenticated, stock);

// add payment FORM
router.get("/payment", isAuthenticated, formPayment);

// add payment POST
router.post("/payment/add", isAuthenticated, createPayment);

// receipt GET
router.get("/payment/:id", isAuthenticated, getPayment);

// payment UPDATE
router.get("/payment/edit/:id", isAuthenticated, updatePaymentForm);

// payment UPDATE
router.put("/payment/:id", isAuthenticated, updatePayment);

// payment DELETE
router.delete("/payment/:id", isAuthenticated, deletePayment);

// payment VALIDATE
router.put("/payment/validate/:id", isAuthenticated, validatePayment);

// expenses FORM
router.get("/expenses", isAuthenticated, expenditureForm);

// add expenses POST
router.post("/expenses", isAuthenticated, expenditureCreate);

// receipt expenses PUT
router.get("/expenses/:id", isAuthenticated, expenditureReceipt);

// expenses UPDATE
router.get("/expenses/edit/:id", isAuthenticated, expenditureEditForm);

// expenses UPDATE
router.put("/expenses/:id", isAuthenticated, expenditureEdit);

// expenses DELETE
router.delete("/expenses/:id", isAuthenticated, expenditureDelete);

// add news FORM
router.get("/news", isAuthenticated, newsCreateForm);
// add news POST
router.post("/news", isAuthenticated, newsCreate);
// news UPDATE
router.put("/news", isAuthenticated, newsUpdate);
// news DELETE
router.delete("/news", isAuthenticated, newsDelete);

module.exports = router;
