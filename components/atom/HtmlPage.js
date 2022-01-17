import Head from "next/head";

export default function HtmlHead({title, desc}) {
	return (
		<Head>
			<meta name="title" content={title} />
			<meta name="description" content={desc} />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>

			<title>{title}</title>
		</Head>
	);
}

export function HtmlPage({title, desc, children}) {
	return (
		<>
			<HtmlHead title={title} desc={desc} />
			<main
				style={{minHeight: "100vh"}}
				className="d-flex justify-content-center"
			>
				<div
					style={{
						maxWidth: 720,
						width: 720,
					}}
				>
					{children}
				</div>
			</main>
		</>
	);
}
