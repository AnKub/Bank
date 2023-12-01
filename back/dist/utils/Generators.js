"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueID = exports.GenerateCode = void 0;
const GenerateCode = (characters, length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};
exports.GenerateCode = GenerateCode;
function generateUniqueID() {
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000);
    return `${timestamp}${randomPart}`;
}
exports.generateUniqueID = generateUniqueID;
