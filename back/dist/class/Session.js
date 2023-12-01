"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const Generators_1 = require("../utils/Generators");
class Session {
    constructor(code, email) {
        this.code = code;
        this.email = email;
    }
    static add(email) {
        const code = (0, Generators_1.GenerateCode)('qwertyuiopQWERTYUIOP', 10);
        const session = new Session(code, email);
        setTimeout(() => {
            this.removeSession(code);
        }, 600000);
        this.sessions.push(session);
        return session;
    }
    static findSession(token) {
        return (this.sessions.find((v) => v.code === token) || null);
    }
    static removeSession(code) {
        this.sessions = this.sessions.filter((value) => value.code !== code);
    }
    static check(code, email) {
        return this.sessions.some((value) => value.code === code && value.email === email);
    }
}
exports.Session = Session;
Session.sessions = [];
