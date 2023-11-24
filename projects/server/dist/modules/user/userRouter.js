"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const zod_1 = require("zod");
const db_1 = require("../../db");
const trpc_1 = require("../../trpc");
exports.userRouter = (0, trpc_1.router)({
    getUser: trpc_1.publicProcedure
        .input(zod_1.z.object({ username: zod_1.z.string() }))
        .query((req) => {
        return db_1.prisma.user.findFirst({
            where: { username: req.input.username },
            select: { username: true },
        });
    }),
});
//# sourceMappingURL=userRouter.js.map