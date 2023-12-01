"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express = require("express");
const User_1 = require("../class/User");
const Session_1 = require("../class/Session");
exports.UserRouter = express.Router();
exports.UserRouter.post('/change-email', (req, res) => {
    const emailOld = req.email;
    const { email, password } = req.body;
    if (!emailOld || !email || !password)
        return res
            .status(400)
            .json({ message: 'Data not found' });
    try {
        const user = User_1.User.getUser(emailOld);
        if (!user)
            throw 'User not found';
        if (user.password !== password)
            throw 'Password incorrect';
        user.email = email;
        const session = Session_1.Session.add(user.email);
        user.addNotification({
            type: User_1.NOTIFICATION_TYPE.WARNING,
            message: 'Change email',
            date: new Date(),
        });
        res.status(200).json({
            token: session.code,
            user: {
                email: user.email,
                isConfirm: user.isEmailValid,
            },
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.UserRouter.post('/change-password', (req, res) => {
    const email = req.email;
    console.log(req.body);
    const { newPassword, oldPassword } = req.body;
    if (!newPassword || !email || !oldPassword)
        return res
            .status(400)
            .json({ message: 'Data not found' });
    try {
        const user = User_1.User.getUser(email);
        if (!user)
            throw 'User not found';
        if (user.password !== oldPassword)
            throw 'Password incorrect';
        user.password = newPassword;
        const session = Session_1.Session.add(user.email);
        user.addNotification({
            type: User_1.NOTIFICATION_TYPE.WARNING,
            message: 'Change password',
            date: new Date(),
        });
        res.status(200).json({
            token: session.code,
            user: {
                email: user.email,
                isConfirm: user.isEmailValid,
            },
        });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ message: error.message || error });
    }
});
exports.UserRouter.get('/notifications', (req, res) => {
    const email = req.email;
    if (!email)
        return res
            .status(400)
            .json({ message: 'Data not found' });
    try {
        const user = User_1.User.getUser(email);
        if (!user)
            throw 'User not found';
        const data = user.getNotifications();
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ message: error.message || error });
    }
});
