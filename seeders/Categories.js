const db = require("../models");

const seedCategoriesTable = () => {
  db.Categories.bulkCreate([
    { name: "Men's Apparel"},
    { name: "Women's Apparel"},
    { name: "Electronics & Devices"},
    { name: "Food & Personal Care"},
  ])
}


module.exports = seedCategoriesTable