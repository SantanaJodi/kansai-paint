import Link from "next/link";
import {HtmlPage} from "../components/atom/HtmlPage";

export default function Home() {
	return (
		<HtmlPage title="Kansai Paint" desc="Halaman awal Kansai Paint">
			<div className="d-flex flex-column align-items-center justify-content-center h-100">
				<p className="--f-normal-bold">Hello World</p>

				<div className="mt-3">
					<Link href="/upload-struk">
						<a>Halaman Upload Struk</a>
					</Link>
				</div>
			</div>
		</HtmlPage>
	);
}
