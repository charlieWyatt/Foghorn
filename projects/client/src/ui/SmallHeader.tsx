import { Link } from "react-router-dom";
import { useCurrentUser } from "../auth/useCurrentUser";
import { FunkyButton } from "./FunkyButton";

export const SmallHeader = ({
	onToggleSidebar,
}: {
	onToggleSidebar: () => void;
}) => {
	const user = useCurrentUser();

	return (
		<>
			<div className="w-full py-3 px-3 h-18 flex justify-between items-center text-sm">
				<div className="flex items-center space-x-4">
					<Link to="/">
						<h1 className="text-xl md:text-3xl bg-yellow-400 p-1">
							F O G H O R N
						</h1>
					</Link>

					<div className="hidden md:flex space-x-2">
						<Link to="/contact" className="text-gray-700 hover:text-black">
							<FunkyButton type="info">Contact Us</FunkyButton>
						</Link>
					</div>
				</div>

				<div className="space-x-2 flex items-center">
					{user ? (
						<>
							<Link to={`/s/${user.username}`}>
								<FunkyButton>{user.username}</FunkyButton>
							</Link>
						</>
					) : (
						<Link to="/login">
							<FunkyButton>Login</FunkyButton>
						</Link>
					)}
					<div className="cursor-pointer" onClick={onToggleSidebar}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</div>
				</div>
			</div>
		</>
	);
};
