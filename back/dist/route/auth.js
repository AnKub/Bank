"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express = require("express");
const User_1 = require("../class/User");
const Session_1 = require("../class/Session");
exports.AuthRouter = express.Router();
exports.AuthRouter.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        res
            .status(400)
            .json({ message: 'Email or password not found' });
    try {
        const user = User_1.User.getUser(email);
        if (!user || user.password !== password)
            throw { message: 'Email or password incorrect' };
        const session = Session_1.Session.add(user.email);
        const { isEmailValid: isConfirm } = user;
        user.addNotification({
            type: User_1.NOTIFICATION_TYPE.ANNOUNCEMENT,
            message: 'Login',
            date: new Date(),
        });
        res.status(200).json({
            token: session.code,
            user: { email, isConfirm },
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.AuthRouter.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        res
            .status(400)
            .json({ message: 'Email or password not found' });
    try {
        const user = User_1.User.create(email, password, 'TestUsername');
        if (!user)
            throw { message: 'error' };
        const session = Session_1.Session.add(user.email);
        const { isEmailValid: isConfirm } = user;
        console.log(user.generateEmailCode());
        res.status(200).json({
            token: session.code,
            user: { email, isConfirm },
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.AuthRouter.post('/signup-confirm', (req, res) => {
    const { email, code } = req.body;
    if (!email || !code)
        res
            .status(400)
            .json({ message: 'Email or password not found' });
    try {
        const user = User_1.User.getUser(email);
        if (!user)
            throw { message: 'Code error' };
        const isValid = user.validEmail(code);
        if (!isValid)
            throw { message: 'Code error' };
        const { isEmailValid: isConfirm } = user;
        user.addNotification({
            type: User_1.NOTIFICATION_TYPE.ANNOUNCEMENT,
            message: 'Login',
            date: new Date(),
        });
        res.status(200).json({ user: { email, isConfirm } });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.AuthRouter.post('/recovery', (req, res) => {
    const { email } = req.body;
    if (!email)
        res
            .status(400)
            .json({ message: 'Email or password not found' });
    try {
        const user = User_1.User.getUser(email);
        if (!user)
            throw { message: 'Email error' };
        console.log(user.generatePasswordCode());
        res.status(200).json({});
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.AuthRouter.post('/recovery-confirm', (req, res) => {
    const { code, password } = req.body;
    if (!code || !password)
        res
            .status(400)
            .json({ message: 'Email or password not found' });
    try {
        const user = User_1.User.getUserByCode(code);
        if (!user)
            throw { message: 'Code error' };
        user.password = password;
        user.addNotification({
            type: User_1.NOTIFICATION_TYPE.WARNING,
            message: 'Restore email',
            date: new Date(),
        });
        res.status(200).json({});
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
