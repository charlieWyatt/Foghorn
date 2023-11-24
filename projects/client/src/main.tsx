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

const authenticatedRoutes: Route[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/*",
		element: <Navigate to="/" />,
	},
];

const loggedOutRoutes: Route[] = [
	{
		path: "/login",
		element: <Auth isSignup={false} />,
		layoutOpts: {
			noHeader: true,
			noPadding: true,
			noSidebar: true,
		},
	},
	{
		path: "/*",
		element: <Navigate to="/login" />,
	},
];

const AppContent: React.FC = () => {
	const isAuthenticated = useCurrentUser();

	return (
		<Routes>
			{isAuthenticated
				? authenticatedRoutes.map(({ path, element, layoutOpts }) => (
						<Route
							key={path}
							path={path}
							element={<Layout options={layoutOpts}>{element}</Layout>}
						/>
				  ))
				: loggedOutRoutes.map(({ path, element, layoutOpts }) => (
						<Route
							key={path}
							path={path}
							element={<Layout options={layoutOpts}>{element}</Layout>}
						/>
				  ))}
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
