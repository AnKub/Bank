"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http_1 = require("http");
const PaymentSystem_1 = require("./class/PaymentSystem");
const fs = require("fs");
const server = (0, http_1.createServer)(app_1.app);
server.listen(4000);
server.on('listening', onListening);
function onListening() {
    const addr = server.address();
    if (typeof addr !== 'string' && typeof addr !== null)
        console.log('Listening on ' + 'http://localhost:' + (addr === null || addr === void 0 ? void 0 : addr.port));
}
const init_payment_systems = () => {
    const s1 = PaymentSystem_1.PaymentSystem.create('Stripe');
    try {
        const image = fs.readFileSync('store/icons/logo-S.svg', 'base64');
        s1.setImg('data:image/svg+xml;base64, ' + image);
    }
    catch (error) { }
    s1.cash = Infinity;
    const s2 = PaymentSystem_1.PaymentSystem.create('Stripe');
    s2.cash = Infinity;
    try {
        const image = fs.readFileSync('store/icons/logo-C.svg', 'base64');
        s2.setImg('data:image/svg+xml;base64, ' + image);
    }
    catch (error) { }
};
init_payment_systems();
