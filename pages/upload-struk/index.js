import {FooterImage} from "../../components/molecule/Footer";
import {HtmlPage} from "../../components/atom/HtmlPage";
import {HeaderMain} from "../../components/molecule/Header";
import {BoxUpload} from "../../components/molecule/Box";
import {BottomsheetUploadReceiptAndItem} from "../../components/molecule/Bottomsheet";
import {useState} from "react";

export default function UploadStruk() {
	const [uploadBS, setUploadBS] = useState(false);

	return (
		<HtmlPage
			title="Upload Struk | Kansai Paint"
			desc="Upload foto struk dan barang yang kamu beli, dapatkan berbagai macam hadiah menarik"
		>
			{/* Bottomsheet */}
			<BottomsheetUploadReceiptAndItem
				open={uploadBS}
				onDismiss={() => setUploadBS(false)}
			/>

			{/* Main */}
			<HeaderMain color="black" />

			<BoxUpload className="m-3" onClick={() => setUploadBS(true)} />

			<FooterImage size="big" />
		</HtmlPage>
	);
}
