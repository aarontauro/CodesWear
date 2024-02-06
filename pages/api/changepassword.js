import connectToMongo from "@/middleware/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";

connectToMongo();

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: "Method not allowed" });
    }

    try {
        const { password, npassword, cpassword } = req.body.data;
        const {profile} = req.body;
        let user = await User.findOne({ email: profile.email });

        if (password != profile.password) {
            return res.status(200).json({ success: false, message: "Incorrect Password" });
            
        }
        else if (npassword !== cpassword) {
            return res.status(200).json({ success: false, message: "Passwords do not match" });
        }
        else if (npassword.length < 8 || cpassword.length < 8) {
            return res.status(200).json({ success: false, message: "Password should be atleast 8 characters long" });
        }

        if (user) {
           user = await User.findOneAndUpdate({ email: profile.email }, { password: CryptoJS.AES.encrypt(npassword, process.env.SECRET_KEY).toString() });
           return res.status(200).json({ success: true, message: "Password changed successfully!!" }); 
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
}