import {useMemo} from "react";
import {danger, gs, pri} from "./Color";
import Icon from "./Icon";
import Ripples from "react-ripples";

export default function Button({
	title,
	onClick,
	icon,
	type,
	className,
	style,
	disabled,
}) {
	const handleType = useMemo(() => {
		switch (type) {
			case "primary":
				return {
					backgroundColor: disabled
						? gs.gray
						: "linear-gradient(99.09deg, #009ECE 0%, #0267A0 100%)",
					border: "none",
					color: gs.white,
				};
			case "secondary":
				return {
					backgroundColor: gs.soft,
					border: `1px solid ${disabled ? gs.light : pri.light}`,
					color: disabled ? gs.gray : pri.main,
				};
			case "ghost":
				return {
					backgroundColor: gs.soft,
					border: "none",
					color: disabled ? gs.gray : pri.main,
				};
			case "danger":
				return {
					backgroundColor: gs.soft,
					border: "none",
					color: disabled ? gs.gray : danger.main,
				};
			default:
				return {
					backgroundColor: disabled
						? gs.gray
						: "linear-gradient(99.09deg, #009ECE 0%, #0267A0 100%)",
					border: "none",
					color: gs.white,
				};
		}
	}, [type, disabled]);

	return (
		<Ripples>
			<button
				style={{
					cursor: "pointer",
					background: handleType.backgroundColor,
					border: handleType.border,
					borderRadius: 4,
					...style,
				}}
				className={`py-2 px-3 d-flex align-items-center ${className}`}
				onClick={onClick}
				disabled={disabled}
			>
				{icon && (
					<Icon
						icon={icon}
						size={24}
						fill={handleType.color}
						className="me-2"
					/>
				)}
				<p
					className="--f-normal-semibold"
					style={{color: handleType.color}}
				>
					{title}
				</p>
			</button>
		</Ripples>
	);
}
