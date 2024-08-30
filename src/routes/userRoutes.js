import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import { User } from '../models/userModels.js';
import { generateToken } from '../helper/token.js';

const router = express.Router();

router.post("/api/user/registerUser", async (req, res) => {
    try {
        const userData = req.body;
        const userId = uuidv4();
        userData["userId"] = userId;
        const { userName, password, confirmPassword, email } = req.body;
        const checkUser = await User.findOne({
            userName: userName,
            email: email,
        });
        if (checkUser) {
            return res
                .status(500)
                .json({ success: false, message: "You are already registered.." });
        } else if (password === confirmPassword) {
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password, salt);
            userData.password = hashedPassword;
            const registerUser = await User.create(userData);
            const data = {userId: userId};
            const token = generateToken(userId);
            console.log(token);
            if (registerUser) {
                return res
                    .status(200)
                    .json({ success: true, message: "User registered successfully..", token: token });
            } else {
                return res
                    .status(500)
                    .json({ success: false, message: "User wasn't registered" });
            }
        } else {
            return res
                .status(500)
                .json({ success: false, message: "Please enter the same password.." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/api/user/loginUser", async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const findUserByEmail = await User.findOne({ email: email });
        const findUserByUsername = await User.findOne({ userName: userName });
        if (findUserByUsername || findUserByEmail) {
            const orgPassword = userName
                ? findUserByUsername.password
                : findUserByEmail.password;
            const checkPassword = await bcrypt.compare(password, orgPassword);
            if (!checkPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter the valid password..",
                });
            } else {
                const token = generateToken(!findUserByEmail ? findUserByUsername.userId : findUserByEmail.userId);
                return res
                    .status(200)
                    .json({ success: true, message: "User logined successfully..", token: token });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: `There is no user for this ${userName ? userName : email}`,
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/api/user/forgetPassword", async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        const findUserData = await User.findOne({ userId: userId });
        if (!findUserData) {
            return res
                .status(400)
                .json({ success: false, message: "User not found.." });
        } else {
            const previousPassword = findUserData.password;
            const comparePasswords = await bcrypt.compare(
                newPassword,
                previousPassword
            );
            if (comparePasswords) {
                return res.status(400).json({
                    success: false,
                    message: "The new password cannot be the same as the old password",
                });
            } else {
                const salt = 10;
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                const updatePassword = await User
                    .updateOne({ userId: userId }, { $set: { password: hashedPassword } })
                    .then((message) => {
                        return res.status(200).json({
                            success: true,
                            message: "Password updated successfully..",
                        });
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, message: error });
                    });
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/api/user/changePassword", async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        const findUserData = await User.findOne({ userId: userId });
        if (!findUserData) {
            return res
                .status(400)
                .json({ success: false, message: "User not found.." });
        } else {
            const previousPassword = findUserData.password;
            const comparePasswords = await bcrypt.compare(
                newPassword,
                previousPassword
            );
            if (comparePasswords) {
                return res.status(400).json({
                    success: false,
                    message: "The new password cannot be the same as the old password",
                });
            } else {
                const salt = 10;
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                const updatePassword = await User
                    .updateOne({ userId: userId }, { $set: { password: hashedPassword } })
                    .then((message) => {
                        return res.status(200).json({
                            success: true,
                            message: "Password updated successfully..",
                        });
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, message: error });
                    });
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

export default router;