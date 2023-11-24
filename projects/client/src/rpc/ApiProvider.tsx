import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import { ReactNode, useState } from "react";
import { trpc } from "../trpc";
import { redirectOnForbiddenErrorLink } from "./RedirectLink";
import { getAuthToken, getBaseUrl } from "./rpcUtils";

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				redirectOnForbiddenErrorLink,
				httpBatchLink({
					url: `${getBaseUrl()}/trpc`,
					headers() {
						const token = getAuthToken();
						if (token) {
							return {
								authorization: token,
							};
						}
						return {};
					},
				}),
			],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</trpc.Provider>
	);
};
