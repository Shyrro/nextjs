import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  await req.db
    .collection("Ingredients")
    .find({})
    .toArray(function (err, ingredients) {
      if (err) throw err;
      
      res.send(ingredients);
    });
});

export default handler;
