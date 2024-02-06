import connectToMongo from "@/middleware/mongoose";
import Product from "@/models/Product";

connectToMongo();

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: "Method not allowed" });
    }

    try {
        for (let index = 0; index < req.body.length; index++) {
            const product = new Product({
                title: req.body[index].title,
                slug: req.body[index].slug,
                desc: req.body[index].desc,
                img: req.body[index].img,
                category: req.body[index].category,
                size: req.body[index].size,
                color: req.body[index].color,
                price: req.body[index].price,
                availableQty: req.body[index].availableQty
            })
            const p = await product.save()
        }
        return res.status(200).json({ message: "Products added successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
}