import {gs, pri} from "../atom/Color";
import Icon from "../atom/Icon";

export function HeaderMain() {
	return (
		<>
			{/* Header */}
			<header
				className="--fixed-full-width d-flex justify-content-between"
				style={{
					padding: 16,
					backgroundColor: pri.dark,
					zIndex: 1,
				}}
			>
				<img
					src={`/image/logo/white.png`}
					height={40}
					width="auto"
					alt="Kansai Logo"
				/>

				<img
					src={`/image/pixel/Goshock Header.png`}
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

export function HeaderChild({title, onBack}) {
	return (
		<>
			{/* Header */}
			<header
				className="--fixed-full-width d-flex justify-content-between align-items-center"
				style={{
					padding: 16,
					backgroundColor: pri.dark,
					zIndex: 1,
				}}
			>
				<Icon
					icon="arrow_back"
					fill={pri.main}
					size={24}
					onClick={onBack}
				/>
				<p className="--f-normal-bold" style={{color: gs.white}}>
					{title}
				</p>

				{/* Dummy to center title */}
				<div style={{height: 24, width: 24}} />
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
