import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import {
  IncomingDbMessage,
  NextServerResponse,
} from "../../middleware/database-request";

const handler = nextConnect();
const collectionName: string = "Ingredients";
handler.use(middleware);

handler.get(async (req: IncomingDbMessage, res: NextServerResponse) => {
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
  const content = req.body;

  if (!content) {
    return res.status(400).send("Write");
  }

  await req.db
    .collection(collectionName)
    .updateOne(
      { _id: content._id },
      { $set: { name: content.name, unit: content.unit } },
      { upsert: true }
    );
  return res.status(200).send("Done");
});

export default handler;
