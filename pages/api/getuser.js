import jwt from 'jsonwebtoken'
import connectToMongo from '@/middleware/mongoose'
import User from '@/models/User'
import CryptoJS from 'crypto-js'

connectToMongo()

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Method not allowed' })
    }

    try {
        const { token } = req.body

        const data = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(data.id)

        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const password = bytes.toString(CryptoJS.enc.Utf8);
            user.password = password
        }

        if (user) {
            return res.status(200).json({ success: true, user: user })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}