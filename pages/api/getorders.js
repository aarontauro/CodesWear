import connectToMongo from "@/middleware/mongoose";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

connectToMongo();

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: "Method not allowed" });
    }

    try {
        const { token } = req.body

        const data = jwt.verify(token, process.env.SECRET_KEY)

        const orders = await Order.find({ user: data.id })

        return res.status(200).json({ orders: orders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}