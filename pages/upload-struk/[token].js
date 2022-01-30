import {FooterImage} from "../../components/molecule/Footer";
import {HtmlPage} from "../../components/atom/HtmlPage";
import {HeaderMainCustomer} from "../../components/molecule/Header";
import {BoxUpload} from "../../components/molecule/Box";
import {BottomsheetUploadReceiptAndItem} from "../../components/molecule/Bottomsheet";
import {useContext, useState} from "react";
import {ModalSuccessUpload} from "../../components/molecule/Modal";
import {useRouter} from "next/router";
import {Context} from "../../components/atom/Context";
import {gs} from "../../components/atom/Color";
import {DividerSection} from "../../components/atom/Divider";
import {handleTimestamp} from "../../lib/function";
import {TagStatus} from "../../components/atom/Tag";
import {ListUploadedImage} from "../../components/atom/List";
import {ButtonHelp} from "../../components/atom/Button";

export default function UploadStruk() {
	const [{images}] = useContext(Context);

	const {query, push} = useRouter();
	const {token, s} = query;

	const [uploadBS, setUploadBS] = useState(false);

	return (
		<HtmlPage
			title="Upload Struk | Kansai Paint"
			desc="Upload foto struk dan barang yang kamu beli, dapatkan berbagai macam hadiah menarik"
			background="linear-gradient(180deg, #003494 0%, #001954 100%)"
		>
			{/* Modal */}
			<ModalSuccessUpload
				open={s}
				onClose={() => push(`/upload-struk/${token}`)}
			/>

			{/* Bottomsheet */}
			<BottomsheetUploadReceiptAndItem
				open={uploadBS}
				onDismiss={() => setUploadBS(false)}
			/>

			{/* Main */}
			<HeaderMainCustomer />

			<BoxUpload className="m-3" onClick={() => setUploadBS(true)} />

			{/* Photo History of Receipt and Item */}
			{images && (
				<section>
					{/* Title */}
					<DividerSection
						title="Riwayat Foto Struk &amp; Barang Anda"
						className="m-3"
						color={gs.gray}
					/>

					{/* Cards */}
					{images?.map((image, key) => (
						<div
							key={key}
							className="m-3 p-3"
							style={{
								boxShadow: "8px 8px 16px rgba(0, 0, 0, 0.08)",
								backgroundColor: gs.white,
								borderRadius: 4,
							}}
						>
							{/* Header */}
							<div className="d-flex justify-content-between align-items-center">
								<p
									className="--f-small-regular lh-base"
									style={{color: gs.gray}}
								>
									{
										handleTimestamp(image?.timestamp)
											.dateAndTime
									}
								</p>

								<TagStatus status={image?.status} />
							</div>

							{/* Body */}
							<ListUploadedImage
								data={image?.receipt}
								type="receipt"
								className="mt-2"
							/>

							<ListUploadedImage
								data={image?.item}
								type="item"
								className="mt-2"
							/>
						</div>
					))}
				</section>
			)}

			<FooterImage size="big" />
			<ButtonHelp onClick={() => console.log("need help")} />
		</HtmlPage>
	);
}
