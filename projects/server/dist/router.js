"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const userRouter_1 = require("./modules/user/userRouter");
exports.appRouter = (0, trpc_1.router)({
    user: userRouter_1.userRouter,
});
//# sourceMappingURL=router.js.map