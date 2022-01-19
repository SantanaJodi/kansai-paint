import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* Charset */}
					<meta charSet="utf-8" />

					{/* Meta Language */}
					<meta name="language" content="id" />
					<meta name="geo.country" content="id" />
					<meta name="geo.placename" content="Indonesia" />

					{/* Theme Color */}
					<meta name="theme-color" content="#009ECE" />

					{/* Favicon */}
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicon/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon/favicon-16x16.png"
					/>
					<link rel="manifest" href="/favicon/site.webmanifest" />

					{/* Font */}
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
						rel="stylesheet"
					/>

					{/* Bootstrap 5 */}
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF"
						crossOrigin="anonymous"
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
