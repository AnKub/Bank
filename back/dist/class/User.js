"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.NOTIFICATION_TYPE = void 0;
const Generators_1 = require("../utils/Generators");
const fs = require("fs");
const Wallet_1 = require("./Wallet");
var NOTIFICATION_TYPE;
(function (NOTIFICATION_TYPE) {
    NOTIFICATION_TYPE[NOTIFICATION_TYPE["WARNING"] = 0] = "WARNING";
    NOTIFICATION_TYPE[NOTIFICATION_TYPE["ANNOUNCEMENT"] = 1] = "ANNOUNCEMENT";
})(NOTIFICATION_TYPE || (exports.NOTIFICATION_TYPE = NOTIFICATION_TYPE = {}));
class User extends Wallet_1.Wallet {
    constructor(email, password, username) {
        super();
        this.email = email;
        this.password = password;
        this.username = username;
        this.isEmailValid = false;
        this.emailCode = null;
        this.passwordCode = null;
        this.img = '';
        this.notifications = [];
    }
    generateEmailCode() {
        this.emailCode = (0, Generators_1.GenerateCode)('1234567890', 4);
        return this.emailCode;
    }
    generatePasswordCode() {
        this.passwordCode = (0, Generators_1.GenerateCode)('1234567890', 4);
        return this.passwordCode;
    }
    validEmail(code) {
        const isValid = code === this.emailCode;
        if (isValid) {
            this.emailCode = null;
            this.isEmailValid = true;
        }
        return isValid;
    }
    updatePassword(password) {
        this.password = password;
    }
    setImg(imgData) {
        this.img = imgData;
    }
    addNotification(notification) {
        notification.id = Number((0, Generators_1.generateUniqueID)());
        this.notifications.unshift(notification);
    }
    getNotifications() {
        return [...this.notifications];
    }
    static getUser(email) {
        const user = this.list.find((v) => v instanceof User && v.email === email) || null;
        return user instanceof User ? user : null;
    }
    static getUserById(id) {
        const user = this.list.find((v) => v.id === id) || null;
        return user instanceof User ? user : null;
    }
    static getUserByCode(code) {
        const user = this.list.find((v) => v instanceof User && v.passwordCode === code) || null;
        return user instanceof User ? user : null;
    }
    static create(email, password, username) {
        if (this.getUser(email))
            throw Error('A user with the same name is already exist');
        const user = new User(email, password, username);
        try {
            const image = fs.readFileSync('store/icons/human.svg', 'base64');
            user.setImg('data:image/svg+xml;base64, ' + image);
        }
        catch (error) { }
        this.list.push(user);
        return user;
    }
}
exports.User = User;
exports.default = User;
