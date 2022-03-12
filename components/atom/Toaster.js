import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { danger, gs } from "./Color";

export function ToasterBasic({ title, show, onDismiss }) {
	const { top } = useSpring({
		top: show ? 16 : -80,
		config: { mass: 8, tension: 800, friction: 80 },
	});

	useEffect(
		() => setTimeout(() => show && onDismiss(), 3000),
		[show, onDismiss]
	);

	return (
		<animated.div
			className="p-3 m-3 d-flex gap-2 align-items-center"
			style={{
				backgroundColor: danger.main,
				borderRadius: 4,
				position: "fixed",
				zIndex: 999,
				top: top,
				width: "calc(100% - 32px)",
				maxWidth: 720 - 32,
			}}
		>
			<div
				style={{
					height: 24,
					width: 4,
					backgroundColor: danger.dark,
					borderRadius: 100,
				}}
			/>
			<p className="--f-normal-semibold" style={{ color: gs.white }}>
				{title}
			</p>
		</animated.div>
	);
}
