import {useState} from "react";
import Ripples from "react-ripples";
import {gs, pri} from "./Color";
import Icon from "./Icon";

export function InputUploadPhoto({title, className, onChange, image}) {
	return (
		<Ripples className={className}>
			<label
				className={`text-center justify-content-center alignitems-center w-100 ${
					!image && "p-3"
				}`}
				style={{
					borderRadius: 4,
					border: !image && `1px dashed ${gs.light}`,
					position: "relative",
					overflow: "hidden",
					cursor: "pointer",
				}}
			>
				{/* Main */}
				{!image && (
					<>
						<Icon icon="add" fill={pri.main} size={24} />
						<p
							className="lh-base --f-normal-semibold"
							style={{color: pri.main}}
						>
							{title}
						</p>
					</>
				)}

				{image && (
					<img
						src={image}
						height="100%"
						width="100%"
						style={{objectFit: "cover"}}
						alt="Receipt and item"
					/>
				)}

				{/* Input */}
				<input
					type="file"
					accept="image/png, image/jpeg, image/jpg"
					style={{display: "none"}}
					onInput={(e) => {
						const file = e.target.files[0];
						file &&
							onChange({
								url: URL.createObjectURL(file),
								name: file.name,
							});
					}}
				/>
			</label>
		</Ripples>
	);
}

export function Input({
	label,
	type,
	value,
	onChange,
	isRequired,
	iconStart,
	placeholder,
	maxLength,
	pattern,
	inputMode,
	...rest
}) {
	const [focus, setFocus] = useState(false);

	return (
		<div {...rest}>
			<label className="d-flex flex-column">
				{/* Label */}
				{label && (
					<p className="--fs-normal-bold mb-2">
						{label}{" "}
						{isRequired && (
							<span style={{color: danger.main}}>*</span>
						)}
					</p>
				)}

				{/* Field */}
				<div
					className="p-2 d-flex"
					style={{
						borderRadius: 8,
						backgroundColor: gs.soft,
						boxShadow: focus
							? `0px 0px 0px 2px ${pri.main}`
							: `0px 0px 0px 0px ${pri.main}`,
						transition: "300ms",
					}}
				>
					<Icon
						icon={iconStart}
						fill={gs.gray}
						size={24}
						className="me-2"
					/>
					<input
						type={type}
						value={value}
						placeholder={placeholder}
						onChange={(e) => onChange && onChange(e.target.value)}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						className="w-100"
						maxLength={maxLength}
						pattern={pattern}
						inputMode={inputMode}
					/>
				</div>
			</label>
		</div>
	);
}

export function TextArea({
	label,
	value,
	onChange,
	isRequired,
	iconStart,
	placeholder,
	maxLength,
	className,
	style,
}) {
	const [focus, setFocus] = useState(false);

	return (
		<div className={className} style={style}>
			<label className="d-flex flex-column">
				{/* Label */}
				{label && (
					<p className="--fs-normal-bold mb-2">
						{label}{" "}
						{isRequired && (
							<span style={{color: danger.main}}>*</span>
						)}
					</p>
				)}

				{/* Field */}
				<div
					className="p-2 d-flex"
					style={{
						borderRadius: 4,
						backgroundColor: gs.soft,
						boxShadow: focus
							? `0px 0px 0px 2px ${pri.main}`
							: `0px 0px 0px 0px ${pri.main}`,
						transition: "300ms",
					}}
				>
					<Icon
						icon={iconStart}
						fill={gs.gray}
						size={24}
						className="me-2"
					/>
					<textarea
						value={value}
						placeholder={placeholder}
						onChange={(e) => onChange && onChange(e.target.value)}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						className="w-100 lh-base"
						maxLength={maxLength}
						style={{resize: "none"}}
					/>
				</div>
			</label>
		</div>
	);
}
