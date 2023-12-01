"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSystem = void 0;
const Wallet_1 = require("./Wallet");
class PaymentSystem extends Wallet_1.Wallet {
    constructor(name) {
        super();
        this.name = name;
        this.img = '';
    }
    setImg(imgData) {
        this.img = imgData;
    }
    static get(id) {
        return this.list.find((v) => v.id === id) || null;
    }
    static create(name) {
        const system = new PaymentSystem(name);
        this.list.push(system);
        return system;
    }
}
exports.PaymentSystem = PaymentSystem;
