import {useMemo} from "react";
import {danger, gs, pri, success} from "./Color";
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
						: "linear-gradient(180deg, #003494 0%, #001954 100%)",
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
		<Ripples className={className}>
			<button
				style={{
					cursor: "pointer",
					background: handleType.backgroundColor,
					border: handleType.border,
					borderRadius: 4,
					...style,
				}}
				className={`py-2 px-3 d-flex align-items-center justify-content-center w-100`}
				onClick={onClick}
				disabled={disabled}
				tabIndex={-1}
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

export function ButtonHelp() {
	return (
		<>
			{/* Dummy */}
			<div style={{height: 80}} />

			{/* Main */}
			<div
				className="d-flex justify-content-end p-3"
				style={{
					position: "fixed",
					width: "100%",
					bottom: 0,
					maxWidth: 720,
				}}
			>
				<button
					style={{
						borderRadius: 100,
						padding: "8px 12px",
						backgroundColor: gs.white,
						border: `1px solid ${gs.soft}`,
					}}
					onClick={(e) => {
						e.preventDefault();
						window.open('https://api.whatsapp.com/send?phone=6281280700757', '_blank')
					}}
					className="text-start d-flex align-items-center gap-2"
				>
					<Icon icon="whatsapp" fill={success.main} size={24} />
					<div>
						<p
							className="--f-semismall-regular lh-base"
							style={{color: gs.gray}}
						>
							Butuh Bantuan?
						</p>
						<p
							className="--f-semismall-bold lh-base"
							style={{color: gs.gray}}
						>
							Hubungi Kami
						</p>
					</div>
				</button>
			</div>
		</>
	);
}
