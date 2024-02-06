import connectToMongo from "@/middleware/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

connectToMongo();

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: "Method not allowed" });
    }

    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password should be atleast 8 characters long" });
            
        }

        user = new User({ name, email, password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString() });
        await user.save();
        
        var token = jwt.sign({ id: user._id, name: name, email: email }, process.env.SECRET_KEY);
        return res.status(200).json({ message: "User created successfully", token: token })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }  
}