import jwt from 'jsonwebtoken'
import connectToMongo from '@/middleware/mongoose'
import User from '@/models/User'

connectToMongo()

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Method not allowed' })
    }

    try {
        const { token } = req.body;
        const { name, address, mobile, state, city, pincode } = req.body.data;

        if (name.length < 3) {
            return res.status(200).json({ success: false, message: 'Name should be atleast 3 characters long!' })
        }
        else if (address.length < 10) {
            return res.status(200).json({ success: false, message: 'Address should be atleast 10 characters long!' })
        }
        else if (mobile.length != 10 || !Number(mobile)) {
            return res.status(200).json({ success: false, message: 'Invalid Mobile Number!' })
        }
        else if (state.length < 3) {
            return res.status(200).json({ success: false, message: 'State should be atleast 3 characters long!' })
        }
        else if (city.length < 3) {
            return res.status(200).json({ success: false, message: 'City should be atleast 3 characters long!' })
        }
        else if (pincode.length != 6 || !Number(pincode)) {
            return res.status(200).json({ success: false, message: 'Invalid Pincode!' })
        }

        const data = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findByIdAndUpdate(data.id, { name: name, address: address, mobile: mobile, state: state, city: city, pincode: pincode }, { new: true })
        if (user) {
            return res.status(200).json({ success: true, user: user })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}