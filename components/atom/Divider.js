export function DividerLine({lineColor, className}) {
	return (
		<div
			style={{
				height: 1,
				width: "100%",
				backgroundColor: lineColor,
			}}
			className={className}
		/>
	);
}

export function DividerSection({title, className, color}) {
	return (
		<div className={className}>
			<p className="--f-small-regular" style={{color}}>
				{title}
			</p>

			<DividerLine lineColor={color} className="mt-2" />
		</div>
	);
}
