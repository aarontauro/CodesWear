import connectToMongo from "@/middleware/mongoose"
import Order from "@/models/Order"
import Product from "@/models/Product"
import jwt from "jsonwebtoken";

connectToMongo()

export default async (req, res) => {
    const { cart, subTotal, oid, email, address, token, products, mobile, pincode, name, state, city } = req.body

    if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Method not allowed' })
    }

    try {
        if (mobile.length !== 10 || !Number(mobile)) {
            return res.status(200).json({ success: false, message: 'Invalid Mobile Number!' })
        }

        if (pincode.length !== 6 || !Number(pincode)) {
            return res.status(200).json({ success: false, message: 'Invalid Pincode!' })
        }

        if (token && products) {
            Object.keys(cart).map(async (item) => {
                const product = await Product.findOne({ slug: item })
                if (product.availableQty < cart[item].qty) {
                    return res.status(200).json({ success: false, message: 'Some items selected are out of stock!', key: item })
                }
                const updatedProduct = await Product.findOneAndUpdate({ slug: item }, { $inc: { availableQty: -cart[item].qty } })
            })
        }

        if (token && products) {
            const data = jwt.verify(token, process.env.SECRET_KEY)
            const order = new Order({ user: data.id, name: name, email: email, orderId: oid, products: cart, amount: subTotal, address: address, state: state, city: city, pincode: pincode, mobile: mobile})
            await order.save()
            return res.status(200).json({ success: true, message: 'Order placed successfully', order: order })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}