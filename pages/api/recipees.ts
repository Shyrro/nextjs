import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import cors from "cors";
import {
  IncomingDbMessage,
  NextServerResponse,
} from "../../middleware/database-request";

const handler = nextConnect();
const collectionName: string = "Recipees";
handler.use(middleware);
handler.use(cors());

handler.get(async (req: IncomingDbMessage, res: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await req.db
    .collection(collectionName)
    .find({})
    .toArray(function (err, recipees) {
      if (err) throw err;

      res.send(recipees);
    });
});

handler.put(async (req: IncomingDbMessage, res: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  
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
