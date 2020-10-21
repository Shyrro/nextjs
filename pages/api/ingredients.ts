import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { IncomingDbMessage, NextServerResponse } from "../../middleware/database-request";
var { nanoid } = require("nanoid");

const handler = nextConnect();
const collectionName: string = "Ingredients";
handler.use(middleware);

handler.get(async (req: IncomingDbMessage, res: NextServerResponse) => {
  await req.db
    .collection(collectionName)
    .find({})
  //   .find({})
    .toArray(function (err, ingredients) {
      if (err) throw err;

      res.send(ingredients);
    });
});

handler.put(async (req: IncomingDbMessage, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const content = req.body;

  if (!content) {    
    return res.status(400).send("Write");    
  }

  const ingredient = {
    _id: nanoid(),
    ...content,
  };

  await req.db.collection(collectionName).insertOne(ingredient);
  return res.send(ingredient);
});

export default handler;
