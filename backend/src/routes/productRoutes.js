const express = require("express");

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();


// CREATE PRODUCT
router.post("/add-product", createProduct);


// GET ALL PRODUCTS
router.get("/get-products", getProducts);


// GET PRODUCT BY ID
router.get("/get-product/:id", getProduct);


// UPDATE PRODUCT BY ID
router.put("/update-product/:id", updateProduct);


// DELETE PRODUCT BY ID
router.delete("/delete-product/:id", deleteProduct);


module.exports = router;