import { useState, useEffect } from "react";

export function useCurrentUser() {
	const [currentUser, setCurrentUser] = useState<{
		username: string;
		email: string;
		id: string;
	} | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const base64Url = token.split(".")[1];
			const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
			const decodedToken = JSON.parse(window.atob(base64));
			setCurrentUser(decodedToken);
		}
	}, []);

	return currentUser;
}

export function logout() {
	localStorage.removeItem("token");
	window.location.reload();
  }