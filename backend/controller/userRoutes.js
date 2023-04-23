const router = require('express').Router();
const User = require('../models/userSchema');
const bcrypt= require('bcrypt');
const {json} = require("express");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               mobile:
 *                 type: string
 *               address:
 *                 type: string
 *               pincode:
 *                 type: string
 *             example:
 *               name: Varun Giri
 *               password: giri420
 *               email: ghaziabadKaGunda@gmail.com
 *               confirmPassword: giri420
 *               mobile: XXXXXXXXXXX
 *               address: IIIts
 *               pincode: 517646
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful user creation
 *                   example: You are now a happy customer
 *       400:
 *         description: Error Description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating invalid request body
 *                   example: duplicate key
 */

router.post('/users', (req, res) => {
    try{new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        confirmPassword: req.body.confirmPassword,
        mobile: req.body.mobile,
        address: req.body.address,
        pincode: req.body.pincode
    }).save()
    res.status(200).json({ message: 'You are now a happy customer' });
   }
    catch(err){
        res.status(400).json({ error: err });
    }
});


/**
 * @swagger
 * /users/authenticate:
 *   post:
 *     summary: Authenticate a user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     password:
 *                       type: string
 *                     email:
 *                       type: string
 *                     confirmPassword:
 *                       type: string
 *                     mobile:
 *                       type: string
 *                     address:
 *                       type: string
 *                     pincode:
 *                       type: string
 *                   example:
 *                     name: Varun Giri
 *                     password: giri420
 *                     email: ghaziabadKaGunda@gmail.com
 *                     confirmPassword: giri420
 *                     mobile: XXXXXXXXXXX
 *                     address: IIIts
 *                     pincode: 517646
 *                 loggedIn:
 *                   type: boolean
 *                   example: true
 *       '401':
 *         description: Authentication failed password mismatch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication failed. Passwords do not match.
 *                 loggedIn:
 *                   type: boolean
 *                   example: false
 *       '403':
 *         description: User is blocked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You have been blocked!
 *                 loggedIn:
 *                   type: boolean
 *                   example: false
 *       '404':
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication failed. User not found.
 *                 loggedIn:
 *                   type: boolean
 *                   example: false
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/login',(req, res)=>{
    const password = req.body.password;


    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                // User not found, return an error
                return res.status(404).json({ message: 'Authentication failed. User not found.' });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                
                    return res.status(401).json({ message: 'Authentication failed. Passwords do not match.' });
                }

                if (result) {
                    if(user.access==false)
                        return res.status(403).json({message:'You have been blocked!',loggedIn:false})
                    // Passwords match, authentication successful
                    console.log('matched')
                    return res.status(200).json({ message: 'Authentication successful.', user: user,loggedIn:true });
                } else {
                    // Passwords do not match, return an error
                    console.log('mot matched')
                    return res.status(401).json({ message: 'Authentication failed. Passwords do not match.',loggedIn:false });
                }
            });
        })
        .catch(err => {
            // Handle the error
            return res.status(500).json({ error: err });
        });

})


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   mobile:
 *                     type: string
 *                   address:
 *                     type: string
 *                   pincode:
 *                     type: string
 *                 example:
 *                   name: Varun Giri
 *                   email: ghaziabadKaGunda@gmail.com
 *                   mobile: XXXXXXXXXXX
 *                   address: IIIts
 *                   pincode: 517646
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while getting the users.
 */
router.get('/users', (req, res) => {
    User.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred while getting the users.' });
        });
});


module.exports = router;




