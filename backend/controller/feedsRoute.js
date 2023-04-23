const router = require('express').Router();
const Feeds = require('../models/feeds.js');

/**
 * @swagger
 * /feeds:
 *   post:
 *     summary: Add a new feed.
 *     description: Add a new feed to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: TName of the user.
 *               mail:
 *                 type: string
 *                 description: The email of the feed creator.
 *               msg:
 *                 type: string
 *                 description: The message of the feed.
 *             required:
 *               - id
 *               - mail
 *               - msg
 *     responses:
 *       200:
 *         description: Feed added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the feed was added successfully.
 *               example:
 *                 message: Feed added successfully
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 *               example:
 *                 error: Invalid request body.
 */

router.post('/feeds', (req, res) => {
    
    try{new Feeds({
        id: req.body.id,
        mail: req.body.mail,
        msg: req.body.msg,
    }).save();
    res.status(200).json({ message: 'Feed added successfully' });}
    catch(err){
        res.status(400).json({ error: 'Invalid request body' });
    }

})

/**
 * @swagger
 * /feeds:
 *   get:
 *     summary: Get all feeds.
 *     description: Returns a list of all the feeds in the system.
 *     responses:
 *       200:
 *         description: A list of feeds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Name of the user.
 *                   mail:
 *                     type: string
 *                     description: The email of the feed creator.
 *                   msg:
 *                     type: string
 *                     description: The message of the feed.
 *               example:
 *                 - id:  Sonam Ahuja
 *                   mail: angel78@gmail.com
 *                   msg: This is a feed.
 *                 - id: Aamir Khusro
 *                   mail: aamir34@gmail.com
 *                   msg: This is another feed.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A description of the error.
 *               example:
 *                 message: Internal server error.
 */

router.get('/feeds', (req, res) => {
    Feeds.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({error:'Internal server error'});
        });
}
)

module.exports = router;