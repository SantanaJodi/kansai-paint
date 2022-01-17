export function Header({color}) {
	return (
		<header
			className="--fixed-full-width d-flex justify-content-center"
			style={{padding: 16}}
		>
			<img
				src="/image/logo/black.png"
				height={32}
				width="auto"
				alt="Kansai Logo"
			/>
		</header>
	);
}
