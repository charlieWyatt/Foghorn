"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_http_1 = __importDefault(require("pino-http"));
const express_1 = __importDefault(require("express"));
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const router_1 = require("./router");
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const jwt_1 = require("./modules/auth/jwt");
const app = (0, express_1.default)();
app.use((0, pino_http_1.default)((0, pino_pretty_1.default)({
    colorize: true,
    messageFormat: "HTTP {req.method} {req.url} {res.statusCode}",
    hideObject: true,
})));
app.use((0, cors_1.default)({ credentials: true }));
const getUserFromHeader = async (req) => {
    if (req.headers.authorization) {
        const decodedUser = await (0, jwt_1.decodeToken)(req.headers.authorization.split(" ")[1]);
        let user = null;
        if (decodedUser) {
            user = await db_1.prisma.user.findFirst({
                where: {
                    username: decodedUser.username,
                },
            });
        }
        return user;
    }
    return null;
};
const authMiddleware = async (req, res, next) => {
    try {
        const user = await getUserFromHeader(req);
        if (!user) {
            return res.status(401).json({
                message: "Auth failed",
            });
        }
        req.ctx = { user };
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Auth failed",
        });
    }
};
// TRPC
const createContext = async ({ req, res, }) => {
    let user = await getUserFromHeader(req);
    return {
        req,
        user,
    };
};
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: router_1.appRouter,
    createContext,
}));
app.get("/test", (req, res) => {
    res.send("Hello World!");
});
// Static files
const fullPath = path_1.default.join(__dirname, "../../public");
logger_1.default.info(`Serving static files from ${fullPath}`);
app.use(express_1.default.static(fullPath));
app.get("*", (_, response) => {
    response.sendFile(path_1.default.join(fullPath, "index.html"));
});
app.listen(4000, () => {
    logger_1.default.info("🤘 Server started on http://localhost:4000");
});
//# sourceMappingURL=index.js.map