import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import {
  IncomingDbMessage,
  NextServerResponse,
} from "../../middleware/database-request";

const handler = nextConnect();
const collectionName: string = "Ingredients";
handler.use(middleware);

handler.get(async (req: IncomingDbMessage, res: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await req.db
    .collection(collectionName)
    .find({})
    .toArray(function (err, ingredients) {
      if (err) throw err;

      res.send(ingredients);
    });
});

handler.put(async (req: IncomingDbMessage, res: any) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const content = req.body;

  if (!content) {
    return res.status(400).send("Write");
  }

  await req.db
    .collection(collectionName)
    .updateOne(
      { _id: content._id },
      { $set: content },
      { upsert: true }
    );

  return res.send(content._id);
});

export default handler;
