"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, env_1.config.JWT_SECRET, {
        expiresIn: "100d",
    });
};
exports.createToken = createToken;
const decodeToken = async (token) => {
    // decode the token using a secret key-phrase
    const user = (await jsonwebtoken_1.default.verify(token, env_1.config.JWT_SECRET));
    // TODO: handle invalid signature, expired and invalid tokens
    return user;
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map