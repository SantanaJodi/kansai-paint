import Link from "next/link";
import {HtmlPage} from "../components/atom/HtmlPage";

export default function Home() {
	return (
		<HtmlPage title="Kansai Paint" desc="Halaman awal Kansai Paint">
			<div className="d-flex flex-column align-items-center justify-content-center h-100">
				<div className="mt-3 d-flex flex-column gap-3 align-items-center">
					<Link href="/struk/upload/KzYyODIyMTExMTIzNTg=">
						<a>Halaman Upload Struk</a>
					</Link>
					<Link href="/kupon/gosok/KzYyODIyMTExMTIzNTg=">
						<a>Halaman GoShock</a>
					</Link>
					<Link href="/tukar-hadiah/KzYyODIyMTExMTIzNTg=">
						<a>Halaman Tukar Hadiah</a>
					</Link>
				</div>
			</div>
		</HtmlPage>
	);
}
