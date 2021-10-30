
const getAllProducts = (req, res) => {
  res.json('Products')
}

const searchProduct = (req, res) => {
  res.json(req.params.id)
}

const addProduct = (req, res) => {
  const {
    storeId,
    product_name,
    product_description,
    product_image,
    product_price,
    product_quantity
  } = req.body

  console.log(req.body)
}

const updateProduct = (req, res) => {
  res.json(req.params.id)
}

const deleteProduct = (req, res) => {
  res.json(req.params.id)
}

module.exports = { getAllProducts, searchProduct, updateProduct, deleteProduct, addProduct }