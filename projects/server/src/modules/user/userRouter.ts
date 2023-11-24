import bcrypt from "bcrypt";

import { z } from "zod";
import { prisma } from "../../db";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { createToken } from "../auth/jwt";

export const userRouter = router({
	signup: publicProcedure
		.input(
			z.object({
				username: z.string().min(3),
				firstName: z.string().nullish(),
				lastName: z.string().nullish(),
				email: z.string().email(),
				password: z.string().min(8),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const passwordHash = await bcrypt.hash(input.password, 10);

			const user = await prisma.user.create({
				data: {
					username: input.username,
					email: input.email,
					firstName: input.firstName,
					lastName: input.lastName,
					passwordHash,
				},
			});

			return {
				token: createToken(user),
			};
		}),
	getUser: publicProcedure
		.input(z.object({ username: z.string() }))
		.query((req) => {
			return prisma.user.findFirst({
				where: { username: req.input.username },
				select: { username: true },
			});
		}),
	login: publicProcedure
		.input(z.object({ email: z.string(), password: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const user = await prisma.user.findFirst({
				where: {
					email: input.email,
				},
			});

			if (!user) {
				throw new Error("Incorrect username or password.");
			}

			const valid = await bcrypt.compare(input.password, user.passwordHash);

			if (!valid) {
				throw new Error("Incorrect username or password.");
			}

			return {
				token: createToken(user),
			};
		}),
});
