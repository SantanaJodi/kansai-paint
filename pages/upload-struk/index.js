import {FooterImage} from "../../components/molecule/Footer";
import {HtmlPage} from "../../components/atom/HtmlPage";
import {Header} from "../../components/molecule/Header";

export default function UploadStruk() {
	return (
		<HtmlPage
			title="Upload Struk | Kansai Paint"
			desc="Upload foto struk dan barang yang kamu beli, dapatkan berbagai macam hadiah menarik"
		>
			<Header />
			<FooterImage size="big" />
		</HtmlPage>
	);
}
