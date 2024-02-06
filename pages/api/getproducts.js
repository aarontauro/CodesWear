import connectToMongo from "@/middleware/mongoose";
import Product from "@/models/Product";

connectToMongo();

export default async (req, res) => {
    if (req.method !== "GET") {
        return res.status(400).json({ message: "Method not allowed" });
    }

    try {
        const products = await Product.find({});
        return res.status(200).json({ products: products });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
}