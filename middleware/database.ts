import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const DATABASE_NAME = "FoodPlanner";
const CONNECTION_URL = process.env.MONGODB_URL;

const client = new MongoClient(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected())
    await client.connect().catch((err) => console.log(err));
  req.dbClient = client;
  req.db = client.db(DATABASE_NAME);

  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
