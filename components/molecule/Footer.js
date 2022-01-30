export function FooterImage() {
	return (
		<img
			src="/image/pixel/Goshock.png"
			height="auto"
			width="100%"
			alt="Goshock Logo"
			style={{
				width: "100%",
				maxWidth: 720,
				zIndex: -1,
			}}
			className="p-3"
		/>
	);
}

export function FooterGraphic({size}) {
	return (
		<img
			src={`/image/footer/${size}.svg`}
			height="auto"
			width="100%"
			alt="Footer Image Kansai"
			style={{
				position: "absolute",
				width: "100%",
				maxWidth: 720,
				zIndex: -1,
				bottom: 0,
			}}
		/>
	);
}
