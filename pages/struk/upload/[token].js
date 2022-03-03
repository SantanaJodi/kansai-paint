import {FooterImage} from "../../../components/molecule/Footer";
import {HtmlPage} from "../../../components/atom/HtmlPage";
import {HeaderMainCustomer} from "../../../components/molecule/Header";
import {BoxUpload} from "../../../components/molecule/Box";
import {BottomsheetUploadReceiptAndItem} from "../../../components/molecule/Bottomsheet";
import {useState} from "react";
import {ModalSuccessUpload} from "../../../components/molecule/Modal";
import {useRouter} from "next/router";
import {gs} from "../../../components/atom/Color";
import {DividerSection} from "../../../components/atom/Divider";
import {handleTimestamp} from "../../../lib/function";
import {TagStatus} from "../../../components/atom/Tag";
import {ListUploadedImage} from "../../../components/atom/List";
import {ButtonHelp} from "../../../components/atom/Button";
import useSWR from "swr";
import {getData} from "../../../lib/fetcher";
import {LoadingLine} from "../../../components/atom/Loading";

export default function UploadStruk() {
	const {query, push} = useRouter();
	const {token, s} = query;

	const [uploadBS, setUploadBS] = useState(false);

	const {
		data: payload,
		mutate,
		isValidating,
	} = useSWR(["/api/receipts", token], getData);
	const {data} = payload || {};

	return (
		<HtmlPage
			title="Upload Struk | Kansai Paint"
			desc="Upload foto struk dan barang yang kamu beli, dapatkan berbagai macam hadiah menarik"
			background="linear-gradient(180deg, #003494 0%, #001954 100%)"
		>
			{/* Modal */}
			<ModalSuccessUpload
				open={s}
				onClose={() => {
					push(`/struk/upload/${token}`);
					mutate();
				}}
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
			{isValidating && (
				<div className="w-100 d-flex justify-content-center">
					<LoadingLine />
				</div>
			)}

			{!isValidating && data?.receipts && (
				<section>
					{/* Title */}
					<DividerSection
						title="Riwayat Foto Struk &amp; Barang Anda"
						className="m-3"
						color={gs.gray}
					/>

					{/* Cards */}
					{data.receipts
						?.map((image, key) => (
							<div
								key={key}
								className="m-3 p-3"
								style={{
									boxShadow:
										"8px 8px 16px rgba(0, 0, 0, 0.08)",
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
											handleTimestamp(image?.upload_time)
												.dateAndTime
										}
									</p>

									<TagStatus status={image?.status} />
								</div>

								{/* Body */}
								<div className="d-flex gap-3 mt-2">
									<ListUploadedImage
										data={image?.items[0].image_link}
										type={image?.items[0].category}
									/>

									<ListUploadedImage
										data={image?.items[1].image_link}
										type={image?.items[1].category}
									/>
								</div>
							</div>
						))
						.reverse()}
				</section>
			)}

			<FooterImage size="big" />
			<ButtonHelp/>
		</HtmlPage>
	);
}
