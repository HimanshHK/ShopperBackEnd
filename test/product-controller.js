const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const mongoose = require("mongoose");
const ProductModal = require("../backend/models/productModal");
const productController = require("../backend/controller/productController");

describe("Product Controller", () => {
  let product;
  before(async () => {
    await mongoose.connect("mongodb://localhost:27017/ShopDB-test");
    product = new ProductModal({
        _id:"642aa8cb949f71597985b2bd",
        name:"Test Product",
        description:"We are testing!!!",
        price:45,
        image:"https://www.bing.com/ck/a?!&&p=b64585ca78625c74JmltdHM9MTY4MDA0ODAwMCZ…",
        company:"bikaji",
        category:"staples",
        shipping:false,
        stock:0,
        reviews:0,
        stars:4.257914367450048,
    });
    await product.save();
  });

  after(async () => {
    await ProductModal.deleteMany({});
    await mongoose.connection.close();
  });

  describe("getProducts", () => {
    const req = {};
    const res = {
      statusCode: null,
      responseJson: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(response) {
        this.responseJson = response;
        return this;
      },
    };

    afterEach(() => {
      res.statusCode = null;
      res.responseJson = null;
    });

    it("should return a list of products with a status code of 200", async () => {
      try {
        await productController.getProducts(req, res);
      } catch (error) {
        console.log(error);
      }

      expect(res.statusCode).to.equal(200);
      expect(res.responseJson).to.be.an("array");
      expect(res.responseJson).to.have.lengthOf(1);
      expect(res.responseJson[0]).to.have.property("name", "Test Product");
    });

    it("should return an error message with a status code of 404 if there's an error fetching products", async () => {
      sinon.stub(ProductModal, "find").rejects();
      try {
        await productController.getProducts(req, res);
      } catch (error) {
        console.log(error);
      }

      ProductModal.find.restore();
      expect(res.statusCode).to.equal(404);
      expect(res.responseJson).to.have.property("message");
      expect(res.responseJson.message.toString()).to.equal("Error: Error");
    });
  });
});
