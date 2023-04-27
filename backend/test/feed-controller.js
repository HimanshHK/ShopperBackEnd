const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const mongoose = require("mongoose");
const feedsModal = require("../models/feedsModal");
const feedController = require("../controller/feedController");

describe("Feed Controller", () => {
    // it('Feed Controller', function () {
    //     this.timeout(5000); // Setting the timeout for this test case to 5 seconds
    //     // Your test code goes here
    //   });
    
  let user;
  before(async () => {
    
    await mongoose.connect("mongodb://localhost:27017/ShopDB-test");
    user = new feedsModal({
        _id:"64247c3ff08cc1ab189eda62",
        id:"yuftgftyh",
        mail:"drtd2@hjbv.com",
        msg:"tyfytfuyvjh"
    });
    await user.save();
  });

  after(async () => {
    
    await feedsModal.deleteMany({});
    await mongoose.connection.close();
  });


  describe("getFeeds", () => {
    
    const req = {};
    const res = {
    //   statusCode: 1351,
      responseJson: null,
    //   status(code) {
    //     this.statusCode = code;
    //     return this;
    //   },
      json(response) {
        this.responseJson = response;
        return this;
      },
    };
  
    afterEach(() => {
    //   res.statusCode = 1351;
      res.responseJson = null;
    });
  
    it("should return a list of feeds with a status code of 200", async () => {
    //   sinon.stub(FeedsModal, "find").returns(Promise.resolve([{ title: "Feed 1" }, { title: "Feed 2" }]));
      try {
        await feedController.getFeeds(req, res);
      } catch (error) {
        console.log(error);
      }
  
    //   FeedsModal.find.restore();
    //   expect(res.statusCode).to.equal(200);
    //   expect(res.responseJson).to.equal([{ title: "Feed 1" }, { title: "Feed 2" }]);
    });
  
    it("should return an error message with a status code of 500 if there's an error fetching feeds", async () => {
      sinon.stub(feedsModal, "find").rejects();
      try {
        await feedController.getFeeds(req, res);
      } catch (error) {
        console.log(error);
      }
  
      feedsModal.find.restore();
    //   expect(res.statusCode).to.equal(500);
    //   expect(res.responseJson).have.property("message");
      expect(res.responseJson.message.toString()).to.equal("Error: Error");
    });
  });
  
});
