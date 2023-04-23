const router = require('express').Router();
const Product = require('../models/product');

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add a new product.
 *     description: Add a new product to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *               image:
 *                 type: string
 *                 description: The URL of the image for the product.
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *               company:
 *                 type: string
 *                 description: The company of the product.
 *               stock:
 *                 type: number
 *                 description: The stock of the product.
 *               reviews:
 *                 type: array
 *                 description: The reviews of the product.
 *             required:
 *               - name
 *               - price
 *               - description
 *               - image
 *               - category
 *               - company
 *               - stock
 *     responses:
 *       200:
 *         description: Product added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the product was added successfully.
 *               example:
 *                 message: Product added successfully
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 *               example:
 *                 error: Internal server error.
 */

router.post('/product', (req, res) => {
    var k=false;
    if(req.body.stock>0) k=true;
    console.log(req.body)
    
    try{
        new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        company : req.body.company,
        stock : req.body.stock,
        reviews : req.body.reviews,
        stars : Math.random() * 2 + 3,
        reviews : Math.floor(Math.random(100)),
        shipping : k,
    }).save();
    res.status(200).json({message:'Product added successfully'})
}
    catch{
        res.status(500).json({error:'Internal server error'})
    }
}
) 


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products.
 *     description: Retrieve a list of all products in the system.
 *     responses:
 *       200:
 *         description: A list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *                   description:
 *                     type: string
 *                     description: The description of the product.
 *                   image:
 *                     type: string
 *                     description: The URL of the image for the product.
 *                   category:
 *                     type: string
 *                     description: The category of the product.
 *                   company:
 *                     type: string
 *                     description: The company of the product.
 *                   stock:
 *                     type: number
 *                     description: The stock of the product.
 *                   reviews:
 *                     type: array
 *                     description: The reviews of the product.
 *                   stars:
 *                     type: number
 *                     description: The number of stars for the product.
 *                   shipping:
 *                     type: boolean
 *                     description: Whether the product is eligible for free shipping.
 *                 example:
 *                   - name: Dove Soap
 *                     price: 45
 *                     description: Dove soap! Don't wander off!
 *                     image: https://example.com/product-a.jpg
 *                     category: Daily
 *                     company: Dove
 *                     stock: 100
 *                     reviews: []
 *                     stars: 4.5
 *                     shipping: true
 *          
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 *               example:
 *                 error: Internal server error.
 */

router.get('/products', (req, res) => {
        Product.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ err: 'Internal server error.' });
        });
} )


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID.
 *     description: Retrieve a product from the system by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the product.
 *                 price:
 *                   type: number
 *                   description: The price of the product.
 *                 description:
 *                   type: string
 *                   description: The description of the product.
 *                 image:
 *                   type: string
 *                   description: The URL of the image for the product.
 *                 category:
 *                   type: string
 *                   description: The category of the product.
 *                 company:
 *                   type: string
 *                   description: The company of the product.
 *                 stock:
 *                   type: number
 *                   description: The stock of the product.
 *                 reviews:
 *                   type: array
 *                   description: The reviews of the product.
 *                 stars:
 *                   type: number
 *                   description: The number of stars for the product.
 *                 shipping:
 *                   type: boolean
 *                   description: Whether the product is eligible for free shipping.
 *               example:
 *                 name: Product A
 *                 price: 10.99
 *                 description: This is product A
 *                 image: https://example.com/product-a.jpg
 *                 category: Category A
 *                 company: Company A
 *                 stock: 100
 *                 reviews: []
 *                 stars: 4.5
 *                 shipping: true
 *       404:
 *         description: The product with the specified ID was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 *               example:
 *                 error: Product not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 *               example:
 *                 error: Internal server error.
 */

router.get('/products/:id',(req,res)=>{
    const id = req.params.id;
    Product.findById(id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({ error: 'Product not found' });
    });

})
module.exports = router;