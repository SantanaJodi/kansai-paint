import Head from "next/head";
import {pri} from "./Color";

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

export function HtmlPage({title, desc, children, isBlack}) {
	return (
		<>
			<HtmlHead title={title} desc={desc} />
			<div
				className="d-flex justify-content-center"
				style={{
					minHeight: "100vh",
					backgroundColor: isBlack && pri.dark,
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
					{children}
				</div>
			</div>
		</>
	);
}
