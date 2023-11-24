import { FC, ReactNode, useState } from "react";
import { SmallHeader } from "./ui/SmallHeader";
import { useCurrentUser } from "./auth/useCurrentUser";
import classNames from "classnames";

export const Layout: FC<{
	children?: ReactNode;
	options?: {
		noHeader?: boolean;
		noPadding?: boolean;
		noSidebar?: boolean;
	};
}> = ({ children, options }) => {
	const user = useCurrentUser();
	const [showSidebarInternal, setShowSidebar] = useState(false);
	const showSidebar = showSidebarInternal && !options?.noSidebar;
	return (
		<div className="grid grid-cols-6">
			<div
				className={classNames({
					"col-span-6": !showSidebar,
					"col-span-5": showSidebar,
				})}
			>
				{options?.noHeader ? null : (
					<SmallHeader
						onToggleSidebar={() => setShowSidebar((prev) => !prev)}
					/>
				)}
				{options?.noPadding ? (
					children
				) : (
					<div className="pt-2 lg:w-4/6 sm:w-3/4 mx-auto font-sans">
						{children}
					</div>
				)}
			</div>
			{showSidebar && (
				<div className="col-span-1">
					<div className="fixed right-0 top-0 bottom-0 w-1/6">
						{user ? (
							<Sidebar />
						) : (
							<div className="bg-neutral-200 p-2 shadow-md w-full min-h-screen flex items-center justify-center">
								<p>Please log in to see your foghorns</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

const Sidebar = () => {
	return (
		<div className="bg-neutral-200 p-2 shadow-md w-full min-h-screen flex-col items-center">
			<p className="text-center font-bold mb-7">My FogHorns</p>
			<div className="space-y-4 overflow-y-scroll"></div>
		</div>
	);
};
