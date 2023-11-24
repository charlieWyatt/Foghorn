import { ReactNode } from "react";
import classnames from "classnames";

export const FunkyButton = ({
	children,
	onClick,
	type,
	isShaking,
	htmlType,
	disabled,
}: {
	children: ReactNode;
	type?: "success" | "danger" | "warning" | "info";
	htmlType?: "submit" | "button" | "reset";
	isShaking?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}) => {
	const cls = classnames({
		"font-semibold py-2 px-4 border-b-4 border-gray-300 hover:border-gray-400 rounded-lg transform transition duration-100 active:scale-95 active:shadow-md cursor-pointer hover:shadow-md hover:scale-105":
			true,
		"bg-green-100 hover:bg-green-200 text-green-600 border-green-300 hover:border-green-400":
			type === "success",
		"bg-red-100 hover:bg-red-200 text-red-600 border-red-300 hover:border-red-400":
			type === "danger",
		"bg-yellow-100 hover:bg-yellow-200 text-yellow-600 border-yellow-300 hover:border-yellow-400":
			type === "warning",
		"bg-blue-100 hover:bg-blue-200 text-blue-600 border-blue-400 hover:border-blue-500":
			type === "info",
		"bg-white hover:bg-gray-200 text-gray-600 ": type === undefined,
		shake: isShaking,
		"bg-gray-300 border-gray-400 text-gray-600": disabled,
	});

	return (
		<button
			disabled={disabled}
			className={cls}
			onClick={onClick}
			type={htmlType}
		>
			{children}
		</button>
	);
};
