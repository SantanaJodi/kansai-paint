export function FooterImage({size}) {
	return (
		<img
			src={`/image/footer/${size}.svg`}
			height="auto"
			width="100%"
			alt="Footer Image"
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%",
				maxWidth: 720,
				zIndex: -1,
			}}
		/>
	);
}
