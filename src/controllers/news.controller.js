const { getConnection } = require("../db/db");
const { v4 } = require("uuid");

const newsCtrl = {};

newsCtrl.newsCreateForm = (req, res) => {
  res.render("news/newsAdd");
};

newsCtrl.newsCreate = async (req, res) => {
  const { title, descrip } = req.body;
  const news = {
    id: v4(),
    date: Date.now(),
    title,
    descrip
  };
  await getConnection()
    .get("news")
    .push(news)
    .write();
  req.flash("success_msg", "Noticia creada exitosamente");
  res.redirect("/");
};

newsCtrl.newsUpdate = (req, res) => {
  res.send("updated");
};

newsCtrl.newsDelete = (req, res) => {
  res.send("deleted");
};

module.exports = newsCtrl;
