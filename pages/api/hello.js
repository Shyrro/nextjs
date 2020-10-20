// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

var database, collection;

const CONNECTION_URL =
  "mongodb+srv://mongodb_admin:mongodb_admin@mycluster.g0vxx.mongodb.net/FoodPlanner?retryWrites=true&w=majority";
const DATABASE_NAME = "FoodPlanner";

const client = new MongoClient(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default (req, res) => {
  client.connect((err) => {
    const dbCollection = client.db(DATABASE_NAME).collection("Ingredients");
    // perform actions on the collection object
    collection = dbCollection;
    res.statusCode = 200;
    collection.find({}).toArray((error, result) => {
      if (error) {
        return res.json({ error: error });
      }
      res.json(result);
    });

    // res.json({ firstName: "John", lastName: "Doe" });
    client.close();
  });
};
