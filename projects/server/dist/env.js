"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProd = exports.config = void 0;
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    ENV: zod_1.default.enum(["development", "production"]),
    DATABASE_URL: zod_1.default.string(),
    JWT_SECRET: zod_1.default.string(),
    R2_ACCOUNT_ID: zod_1.default.string(),
    R2_ACCESS_KEY_ID: zod_1.default.string(),
    R2_SECRET_ACCESS_KEY: zod_1.default.string(),
    R2_BUCKET_NAME: zod_1.default.string(),
    OPENAI_API_KEY: zod_1.default.string(),
});
// Load environment variables and validate them against the schema
exports.config = envSchema.parse(process.env);
exports.isProd = exports.config.ENV === "production";
//# sourceMappingURL=env.js.map