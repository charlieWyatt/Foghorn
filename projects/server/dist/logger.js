"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
// you can make pino pretty with `pino-pretty`
// import pinoPretty from "pino-pretty";
// export const logger = pino(pinoPretty());
// or pipe server output to `pino-pretty` in your terminal
const logger = (0, pino_1.default)((0, pino_pretty_1.default)({
    minimumLevel: "debug", // for dev
    colorize: true,
    hideObject: false,
}));
exports.default = logger;
//# sourceMappingURL=logger.js.map