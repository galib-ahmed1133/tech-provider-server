const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = 4000;
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dvubr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const servicesCollection = client.db("tech-provider").collection("services");
  const reviewsCollection = client.db("tech-provider").collection("reviews");
  // perform actions on the collection object
  app.get("/services", (req, res) => {
    servicesCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.post("/addServices", (req, res) => {
    const services = req.body;
    servicesCollection.insertMany(services, (err, result) => {
      res.send(result);
    });
  });

  app.get("/reviews", (req, res) => {
    reviewsCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.post("/addReviews", (req, res) => {
    const reviews = req.body;
    reviewsCollection.insertMany(reviews, (err, result) => {
      res.send(result);
    });
  });

  app.get("/", (req, res) => {
    res.send("Hello!");
  });
});

app.listen(process.env.PORT || port);
