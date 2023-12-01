"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TRANSACTION_TYPE = void 0;
var TRANSACTION_TYPE;
(function (TRANSACTION_TYPE) {
    TRANSACTION_TYPE["RECIVE"] = "RECIVE";
    TRANSACTION_TYPE["SEND"] = "SEND";
})(TRANSACTION_TYPE || (exports.TRANSACTION_TYPE = TRANSACTION_TYPE = {}));
class Transaction {
    constructor(amount, from_id, to_id) {
        this.amount = amount;
        this.from_id = from_id;
        this.to_id = to_id;
        this.id = Number(Transaction.id++);
        this.date = new Date();
    }
    static create(amount, from_id, to_id) {
        const transaction = new Transaction(amount, from_id, to_id);
        this.list.unshift(transaction);
        return transaction;
    }
    static getByID(id) {
        const t = this.list.find((v) => v.id == id);
        return t || null;
    }
    static getTransactions(id) {
        return this.list.filter((v) => v.from_id === id || v.to_id === id);
    }
}
exports.Transaction = Transaction;
Transaction.list = [];
Transaction.id = 0;
