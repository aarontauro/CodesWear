import connectToMongo from "@/middleware/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Add the methods your API route supports
    origin: 'https://codeswear-aarontauro.vercel.app', // Replace with your actual frontend origin
  })

connectToMongo();

export default async (req, res) => {
     cors();

    if (req.method !== "POST") {
        return res.status(400).json({ message: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (password === originalPassword) {
            var token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.SECRET_KEY);
            if (token) {
                return res.status(200).json({ message: "Login successful", token: token });
            }
        }
        else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
}