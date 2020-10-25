import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { IncomingDbMessage, NextServerResponse } from "../../middleware/database-request";
var { nanoid } = require("nanoid");

const handler = nextConnect();
const collectionName: string = "Recipees";
handler.use(middleware);

handler.get(async (req: IncomingDbMessage, res: NextServerResponse) => {
  await req.db
    .collection(collectionName)
    .find({})  
    .toArray(function (err, recipees) {
      if (err) throw err;

      res.send(recipees);
    });
});

handler.put(async (req: IncomingDbMessage, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const content = req.body;

  if (!content) {    
    return res.status(400).send("Write");    
  }

  const recipee = {
    _id: nanoid(),
    ...content,
  };

  await req.db.collection(collectionName).insertOne(recipee);
  return res.send(recipee);
});

export default handler;
