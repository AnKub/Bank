"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
class Wallet {
    constructor() {
        this.cash = 0;
        this.id = 0;
        this.id = Wallet.id++;
    }
    static getById(id) {
        return this.list.find((v) => v.id === id);
    }
}
exports.Wallet = Wallet;
Wallet.list = [];
Wallet.id = 0;
