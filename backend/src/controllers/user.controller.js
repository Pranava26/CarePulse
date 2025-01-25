import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ name, email, phone });

        if (user) {
            generateToken(user._id, res);
            return res.status(200).json({user});
        }

        const newUser = await User.create({
            name, email, phone
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            
            return res.status(201).json({ user: newUser })
        } else {
            res.status(400).json({ message: 'Failed to create new user' });
        }

    } catch (error) {
        console.log('Error in createUser controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Not using this code
export const getUser = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await User.findById({userId});

        return res.status(200).json({user});
    } catch (error) {
        console.log('Error in getUser controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}