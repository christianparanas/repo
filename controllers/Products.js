
const getAllProducts = (req, res) => {
  res.json('Products')
}

const searchProduct = (req, res) => {
  res.json(req.params.id)
}

const updateProduct = (req, res) => {
  res.json(req.params.id)
}

const deleteProduct = (req, res) => {
  res.json(req.params.id)
}

module.exports = { getAllProducts, searchProduct, updateProduct, deleteProduct }