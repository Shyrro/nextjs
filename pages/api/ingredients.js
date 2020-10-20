import nextConnect from "next-connect";
import middleware from "../../middleware/database";
var { nanoid } = require("nanoid");

const handler = nextConnect();
const collectionName = "Ingredients";
handler.use(middleware);

handler.get(async (req, res) => {
  await req.db
    .collection(collectionName)
    .find({})
    .toArray(function (err, ingredients) {
      if (err) throw err;

      res.send(ingredients);
    });
});

handler.put(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const content = req.body;

  if (!content) return res.status(400).send("You must write something");

  const ingredient = {
    _id: nanoid(),
    ...content,
  };

  await req.db.collection(collectionName).insertOne(ingredient);
  return res.send(ingredient);
});

export default handler;
