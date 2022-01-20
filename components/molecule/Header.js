import {gs, pri} from "../atom/Color";
import Icon from "../atom/Icon";

export function HeaderMain({logo}) {
	return (
		<>
			{/* Header */}
			<header
				className="--fixed-full-width d-flex justify-content-center"
				style={{
					padding: 16,
					backgroundColor: logo === "white" ? pri.dark : gs.white,
					zIndex: 1,
				}}
			>
				<img
					src={`/image/logo/${logo}.png`}
					height={40}
					width="auto"
					alt="Kansai Logo"
				/>
			</header>

			{/* Dummy */}
			<div
				style={{
					height: 72,
				}}
			/>
		</>
	);
}
export function HeaderBottomsheet({title, onClose}) {
	return (
		<>
			{/* Header */}
			<header className="d-flex justify-content-between p-3 --header-bs">
				<p className="--f-normal-bold">{title}</p>
				<Icon icon="x" fill={gs.light} size={16} onClick={onClose} />
			</header>

			{/* Dummy */}
			<div
				style={{
					height: 32,
				}}
			/>
		</>
	);
}
