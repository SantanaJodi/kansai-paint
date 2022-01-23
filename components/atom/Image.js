import NextImage from "next/image";

export function Image({style, src, alt}) {
	return (
		<div
			style={{
				...style,
				position: "relative",
				borderRadius: 8,
				overflow: "hidden",
			}}
		>
			<NextImage src={src} alt={alt} layout="fill" objectFit="cover" />
		</div>
	);
}
