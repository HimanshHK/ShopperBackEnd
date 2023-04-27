const FeedsModal = require("../models/feedsModal.js");

// GET Methods
exports.getFeeds = (req, res) => {
  return FeedsModal.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};


// POST Methods
exports.postFeeds = (req, res) => {
  new FeedsModal({
    id: req.body.id,
    mail: req.body.mail,
    msg: req.body.msg,
  }).save();
  res.json({ message: "Feed added successfully" });
};
