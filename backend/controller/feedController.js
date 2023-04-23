const FeedsModal = require("../models/feedsModal.js");
const redis = require("redis");
const client = require("./client.js");

// GET Methods
exports.getFeeds = async (req, res) => {
    try {
      const feeds = await client.get("feeds");
      if(!feeds){
        const data = await FeedsModal.find();
        
        await client.set("feeds", JSON.stringify(data));
        const datahk= await client.get("feeds");
        console.log(datahk)
        res.status(200).json(data); 
      }
      else{
        // console.log(feeds);
        data=JSON.parse(feeds);
        res.status(200).json(data);
      }
    }catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
};

// POST Methods
exports.postFeeds = (req, res) => {
  // client.flushAll()
  new FeedsModal({
    id: req.body.id,
    mail: req.body.mail,
    msg: req.body.msg,
  }).save();
  res.json({ message: "Feed added successfully" });
};