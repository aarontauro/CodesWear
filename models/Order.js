const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: Number, required: true },
    products: { type: Object, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true },
    mobile: { type: Number, required: true },
    status: { type: String, default: "pending" }
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model('Order', OrderSchema);