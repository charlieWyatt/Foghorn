"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.publicProcedure = exports.middleware = exports.router = void 0;
const server_1 = require("@trpc/server");
const t = server_1.initTRPC.context().create();
exports.router = t.router;
exports.middleware = t.middleware;
exports.publicProcedure = t.procedure;
const isAuthed = t.middleware(({ next, ctx }) => {
    console.log("isAuthed", ctx.user);
    if (!ctx.user) {
        throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
        });
    }
    return next({
        ctx: {
            req: ctx.req,
            user: ctx.user, // makes it so User can not be null in a authed procedure
        },
    });
});
exports.protectedProcedure = t.procedure.use(isAuthed);
//# sourceMappingURL=trpc.js.map