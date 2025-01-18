const Admin = require('../Models/AdminModel');
const User = require('../Models/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

require('dotenv').config()

const makeUser = async (req, res) => {
    console.log("Body:", req.body)
    console.log("File:", req.files)
    try {
        const { name, socialMediaHandle } = req.body;
        const imageUrls = req.files.map(file => file.path)
        if (!name || !socialMediaHandle) {
            return res.status(400).json({ message: "All feild are required" })
        }

        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const generateAdminId = (name) => {
            const uuidPart = uuidv4().split('-')[0];
            const sevenDigitId = uuidPart.substring(0, 7);
            const userId = `${name.split(' ').join('_')}_${sevenDigitId}`;
            return userId;
        };

        const userId = generateAdminId(name);

        const userCreated = await User.create({
            userId,
            name,
            socialMediaHandle,
            images: imageUrls
        })
        console.log("user created")
        res.status(200).json({ message: "User data saved successfully" })
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const GetUser = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const AdminLogin = async (req, res) => {
    console.log(req.body)
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const admin = await Admin.findOne({ name });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const { adminId } = admin;

        res.status(200).json(adminId);

    } catch (error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const Makeadmin = async (req, res) => {
    try {
        const { name, password, email, age } = req.body
        console.log("Data from frontend:", req.body)
        if (!name || !password || !email || !age) {
            return res.status(400).json({ message: "All feild are required" })
        }

        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const generateAdminId = (name) => {
            const uuidPart = uuidv4().split('-')[0];
            const sevenDigitId = uuidPart.substring(0, 7);
            const adminId = `${name.split(' ').join('_')}_${sevenDigitId}`;
            return adminId;
        };

        const adminId = generateAdminId(name);


        const adminCreted = await Admin.create({
            adminId,
            name,
            password: hashedPassword,
            email,
            age
        })

        res.status(200).json(adminId)

    } catch (error) {
        console.error('Error saving admin data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = { makeUser, GetUser, AdminLogin, Makeadmin }