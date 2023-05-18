const Product = require('../model/productModel')
const asyncHandler = require("express-async-handler");

const insertProduct = asyncHandler(async (req, res) => {
    try {
        const files = req.files
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: files.map((x) => x.filename)
        })
        console.log(product);
        const productData = await product.save()
        if (productData) {
            res.json({
                message: "Product saved successfully"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

const editProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id
        if (productId) {
            const productData = await Product.findOne({ _id: productId })
            res.json({
                productData
            })
        } else {
            res.json({
                message: "Product not found"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id
        if (productId) {
            const files = req.files
            const productData = await Product.findByIdAndUpdate({
                _id: productId
            }, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: files.map((x) => x.filename)
            })
            if (productData) {
                const updatedProduct = await Product.findOne({ _id: productId })
                res.json({
                    message: "Product updated successfully", updatedProduct
                })
            } else {
                res.json({
                    message: "Product updation failed"
                })
            }
        } else {
            res.json({
                message: 'product not found'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id
        if (productId) {
            const productData = await Product.findByIdAndDelete({ _id: productId })
            console.log(productData);
            if (productData) {
                res.json({
                    message: "Product deleted successfully"
                })
            } else {
                res.json({
                    message: "Product deletion failed"
                })
            }
        } else {
            res.json({
                message: "Product not found"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

const buyProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id
        if (productId) {
            const productData = await Product.findById({ _id: productId })
            if (productData) {
                const tax =(productData.price*18)/100
                const mrp=productData.price+tax
                const discount= 2
                const shippingPrice = 100
                const discountPrice=(mrp* discount)/100
                const totalPrice=(mrp-discountPrice)+shippingPrice
                console.log(totalPrice)
                res.json({
                    message:"Prize of the product is ",totalPrice
                })
            }else{
                res.json({
                    message:"Product not found"
                })
            }
        } else {
            res.json({
                message: "Product not found"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = {
    insertProduct,
    editProduct,
    updateProduct,
    deleteProduct,
    buyProduct
}
