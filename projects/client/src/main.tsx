import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCurrentUser } from "./auth/useCurrentUser";
import { Home } from "./routes/Home";
import { Layout } from "./Layout.tsx";
import { Auth } from "./routes/Auth.tsx";
import { ApiProvider } from "./rpc/ApiProvider.tsx";

type Route = {
	path: string;
	element: React.ReactNode;
	layoutOpts?: {
		noHeader?: boolean;
		noPadding?: boolean;
		noSidebar?: boolean;
	};
};

const routes: Route[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Auth isSignup={false} />,
		layoutOpts: {
			noHeader: true,
			noPadding: true,
			noSidebar: true,
		},
	},
];

const AppContent: React.FC = () => {
	const isAuthenticated = useCurrentUser();

	return (
		<Routes>
			{isAuthenticated ? (
				routes.map(({ path, element, layoutOpts }) => (
					<Route
						key={path}
						path={path}
						element={<Layout options={layoutOpts}>{element}</Layout>}
					/>
				))
			) : (
				<>
					<Route path="/login" element={<Auth isSignup={false} />} />
					<Route
						// Redirect unauthenticated users to the Signup page for any other paths
						path="/*"
						element={<Navigate to="/signup" />}
					/>
				</>
			)}
		</Routes>
	);
};

const App: React.FC = () => {
	return (
		<React.StrictMode>
			<BrowserRouter basename="/">
				<ApiProvider>
					<AppContent />
				</ApiProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
