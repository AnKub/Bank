"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceRouter = void 0;
const express = require("express");
const User_1 = require("../class/User");
const Transaction_1 = require("../class/Transaction");
const PaymentSystem_1 = require("../class/PaymentSystem");
const Wallet_1 = require("../class/Wallet");
exports.BalanceRouter = express.Router();
exports.BalanceRouter.get('/balance', (req, res) => {
    const email = req.email;
    if (!email)
        return res.status(400).json({ message: 'error' });
    try {
        const user = User_1.User.getUser(email);
        if (!user)
            throw 'Error';
        res.status(200).json({
            count: user === null || user === void 0 ? void 0 : user.cash,
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.BalanceRouter.get('/transactions', (req, res) => {
    const email = req.email;
    if (!email)
        return res.status(400).json({ message: 'error' });
    try {
        const user = User_1.User.getUser(email);
        if (!user)
            throw 'Error';
        const data = getTransactionsFormat(user);
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.BalanceRouter.get('/transaction', (req, res) => {
    const email = req.email;
    const { id } = req.query;
    if (!email || !String(id))
        return res.status(400).json({ message: 'error' });
    try {
        const user = User_1.User.getUser(email);
        if (!user)
            throw 'Email not found';
        const transaction = Transaction_1.Transaction.getByID(id);
        if (!transaction)
            throw 'Transaction not found';
        const data = transactionFormat(transaction, user.id);
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ message: error.message || 'Error' });
    }
});
exports.BalanceRouter.post('/send', (req, res) => {
    const userEmail = req.email;
    const { email, sum } = req.body;
    try {
        if (!userEmail || !email || !sum)
            throw 'Not Data';
        if (userEmail === email)
            throw "You can't choose yourself";
        const initUser = User_1.User.getUser(userEmail);
        if (!initUser)
            throw 'Error';
        if (initUser.cash < sum)
            throw 'Not enough money';
        const targetUser = User_1.User.getUser(email);
        if (!targetUser)
            throw 'User not found';
        initUser.cash -= sum;
        targetUser.cash += sum;
        const { id } = Transaction_1.Transaction.create(sum, initUser.id, targetUser.id);
        const data = { id };
        initUser.addNotification({
            type: User_1.NOTIFICATION_TYPE.ANNOUNCEMENT,
            message: 'Send money',
            date: new Date(),
        });
        targetUser.addNotification({
            type: User_1.NOTIFICATION_TYPE.ANNOUNCEMENT,
            message: 'Receive money',
            date: new Date(),
        });
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || error || 'Error',
        });
    }
});
exports.BalanceRouter.post('/receive', (req, res) => {
    const userEmail = req.email;
    const { system, sum } = req.body;
    try {
        if (!userEmail || !sum || !String(system))
            throw 'Not Data';
        const initUser = User_1.User.getUser(userEmail);
        if (!initUser)
            throw 'Error';
        const paymentSystem = PaymentSystem_1.PaymentSystem.get(system);
        if (!paymentSystem)
            throw 'System not found';
        paymentSystem.cash -= sum;
        initUser.cash += sum;
        const { id } = Transaction_1.Transaction.create(sum, paymentSystem.id, initUser.id);
        initUser.addNotification({
            type: User_1.NOTIFICATION_TYPE.ANNOUNCEMENT,
            message: 'Receive money',
            date: new Date(),
        });
        const data = { id };
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || error || 'Error',
        });
    }
});
function getTransactionsFormat(user) {
    const transactions = Transaction_1.Transaction.getTransactions(user.id);
    const transactionDTO = [];
    transactions.forEach((tran) => {
        const format = transactionFormat(tran, user.id);
        if (!format)
            return;
        transactionDTO.push(format);
    });
    return transactionDTO;
}
function transactionFormat(transaction, userID) {
    const { type, targetID } = transaction.from_id === userID
        ? {
            type: Transaction_1.TRANSACTION_TYPE.SEND,
            targetID: transaction.to_id,
        }
        : {
            type: Transaction_1.TRANSACTION_TYPE.RECIVE,
            targetID: transaction.from_id,
        };
    const wallet = Wallet_1.Wallet.getById(targetID);
    if (!wallet)
        return null;
    let username;
    let email;
    if (wallet instanceof User_1.User) {
        username = wallet.username;
        email = wallet.email;
    }
    else {
        username = wallet.name;
    }
    return {
        id: transaction.id,
        type,
        email: email,
        amount: transaction.amount,
        date: transaction.date,
        username: username,
        img: wallet.img,
    };
}
