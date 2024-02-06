import connectToMongo from "@/middleware/mongoose";
import Product from "@/models/Product";

connectToMongo();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Method not allowed" });
  }

  try {
    for (let index = 0; index < req.body.length; index++) {
      const products = await Product.findByIdAndUpdate(req.body[index]._id, req.body[index]);
      const p = await products.save();
    }

    return res.status(200).json({ message: "Products updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error });
  }
};
