export function FooterImage({size}) {
	return (
		<img
			src={`/image/footer/${size}.svg`}
			height="auto"
			width="100%"
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				maxWidth: 720,
				zIndex: -1,
			}}
			alt="Footer Image"
		/>
	);
}
