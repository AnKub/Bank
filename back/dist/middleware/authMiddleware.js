"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const Session_1 = require("../class/Session");
const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS')
        return next();
    const token = req.headers.authorization;
    if (!token)
        return res
            .status(401)
            .json({ message: 'Not authorization' });
    const session = Session_1.Session.findSession(token);
    if (!session)
        return res
            .status(401)
            .json({ message: 'Not authorization' });
    req.email = session.email;
    next();
};
exports.authMiddleware = authMiddleware;
