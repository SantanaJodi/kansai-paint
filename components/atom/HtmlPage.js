import Head from "next/head";
import {gs, pri} from "./Color";

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

export function HtmlPage({title, desc, children, background, loading}) {
	return (
		<>
			<HtmlHead title={title} desc={desc} />
			<div
				className="d-flex justify-content-center"
				style={{
					minHeight: "100vh",
					background,
					zIndex: 0,
				}}
			>
				<div
					style={{
						maxWidth: 720,
						width: 720,
						position: "relative",
						zIndex: 0,
					}}
				>
					{loading && (
						<div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
							<img src="/image/logo/white.png" height={56} />
							<p style={{color: gs.white}}>Memuat...</p>
						</div>
					)}
					{!loading && children}
				</div>
			</div>
		</>
	);
}
