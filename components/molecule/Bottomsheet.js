import axios from "axios";
import {useRouter} from "next/router";
import {useCallback, useContext, useState} from "react";
import {BottomSheet} from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../atom/Button";
import {danger, gs, warning} from "../atom/Color";
import {Context} from "../atom/Context";
import {DividerLine} from "../atom/Divider";
import {InputUploadPhoto} from "../atom/Input";
import {BoxInfo} from "./Box";
import {HeaderBottomsheet} from "./Header";
import {ModalZoomInReceipt} from "./Modal";
import FormData from "form-data";
import {ToasterBasic} from "../atom/Toaster";

export function BottomsheetUploadReceiptAndItem({open, onDismiss}) {
	const {push, query} = useRouter();
	const {token} = query;

	// Toaster
	const [uploadError, setUploadError] = useState(false);

	// Images
	const [receiptImage, setReceiptImage] = useState(null);
	const [itemImage, setItemImage] = useState(null);

	// Upload Status
	const [isUploading, setIsUploading] = useState(false);

	// Receipt Example
	const [zoomReceipt, setZoomReceipt] = useState(false);
	const [receiptExample, setReceiptExample] = useState(null);

	const clearState = useCallback(() => {
		setReceiptImage(null);
		setItemImage(null);
		setIsUploading(false);
	}, []);

	const handleUploadPhotos = async () => {
		// Change with API
		setIsUploading(true);

		var formData = new FormData();
		formData.append("product", itemImage.file);
		formData.append("receipt", receiptImage.file);

		await axios
			.post(`/api/upload`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: token,
				},
			})
			.then((response) => {
				console.log(response);

				if (response.data.message === "success") {
					push(`/upload-struk/${token}?s=true`);
					onDismiss();
				} else {
					setUploadError(true);
					onDismiss();
				}

				clearState();
			})
			.catch(() => {
				setUploadError(true);
				onDismiss();
				clearState();
			});
	};

	return (
		<>
			<ModalZoomInReceipt
				open={zoomReceipt}
				onClose={() => setZoomReceipt(false)}
				src={receiptExample}
			/>

			<ToasterBasic
				show={uploadError}
				onDismiss={() => setUploadError(false)}
				title="Ukuran File Terlalu Besar"
			/>

			{!zoomReceipt && (
				<BottomSheet
					open={open}
					onDismiss={!isUploading && onDismiss}
					snapPoints={({minHeight, maxHeight}) => [
						minHeight,
						maxHeight,
					]}
					defaultSnap={({lastSnap, snapPoints}) =>
						lastSnap && Math.min(...snapPoints)
					}
					expandOnContentDrag={!isUploading}
				>
					<HeaderBottomsheet
						title="Upload Foto Struk &amp; Barang"
						onClose={() => !isUploading && onDismiss()}
					/>

					<div className="d-flex flex-column align-items-center justify-content-center">
						<p
							className="--f-semismall-semibold mt-3"
							style={{color: gs.gray}}
						>
							Contoh Struk Yang Diterima
						</p>
						<img
							src="/image/pixel/bon_example.png"
							height={360}
							alt="Receipt Example 1"
							style={{
								objectFit: "cover",
								borderRadius: 4,
								cursor: "pointer",
							}}
							onClick={() => {
								setZoomReceipt(true);
								setReceiptExample(
									"/image/pixel/bon_example.png"
								);
							}}
						/>
					</div>

					<div className="m-3 d-flex gap-3">
						<InputUploadPhoto
							className="w-100"
							title="Upload Foto Struk"
							onChange={(blob) => setReceiptImage(blob)}
							image={receiptImage?.url}
						/>
						<InputUploadPhoto
							className="w-100"
							title="Upload Foto Barang"
							onChange={(blob) => setItemImage(blob)}
							image={itemImage?.url}
						/>
					</div>

					<BoxInfo
						icon="info"
						desc="Pastikan foto struk yang di-upload sesuai dengan barang yang Anda beli."
						className="m-3"
					/>

					<Button
						className="w-100 px-3 pb-3"
						type="primary"
						title={isUploading ? "Mengupload..." : "Upload"}
						onClick={handleUploadPhotos}
						disabled={!receiptImage || !itemImage || isUploading}
					/>
				</BottomSheet>
			)}
		</>
	);
}

export function BottomsheetConfirmRedeem({open, onDismiss, data, onRedeem}) {
	const [{userPoints}] = useContext(Context);

	return (
		<BottomSheet
			open={open}
			onDismiss={onDismiss}
			snapPoints={({minHeight, maxHeight}) => [minHeight, maxHeight]}
			defaultSnap={({lastSnap, snapPoints}) =>
				lastSnap && Math.min(...snapPoints)
			}
			expandOnContentDrag
		>
			<HeaderBottomsheet
				title="Konfirmasi Redeem Hadiah"
				onClose={onDismiss}
				color="black"
			/>

			<section className="m-3">
				<p
					className="--f-semismall-regular lh-base"
					style={{color: gs.gray}}
				>
					Anda akan melakukan redeem untuk hadiah dengan detail
					berikut ini
				</p>

				<div className="mt-3 d-flex align-items-center">
					<img
						src={data?.img}
						height={80}
						width={80}
						style={{objectFit: "cover", borderRadius: 8}}
						alt="Redeem Gift"
					/>

					<div className="ms-3">
						<p className="--f-normal-bold lh-base">{data?.name}</p>

						<div className="d-flex align-items-center">
							<img
								src="/image/pixel/Coin.png"
								height={16}
								width={16}
								alt="Kansai Points"
							/>
							<p
								className="--f-semismall-semibold ms-2 lh-base"
								style={{color: warning.main}}
							>
								{data?.points} points
							</p>
						</div>
					</div>
				</div>

				<div className="mt-3">
					<div className="d-flex justify-content-between">
						<p
							className="--f-semismall-semibold"
							style={{color: gs.gray}}
						>
							Rincian
						</p>

						<div>
							<div className="d-flex align-items-center text-end">
								<img
									src="/image/pixel/Coin.png"
									height={16}
									width={16}
									alt="Kansai Points"
								/>
								<p
									className="--f-semismall-semibold ms-2 lh-base"
									style={{color: gs.black}}
								>
									{userPoints} points
								</p>
							</div>

							<p
								className="--f-semismall-semibold ms-2 lh-base text-end"
								style={{color: danger.main}}
							>
								- {data?.points} points
							</p>
						</div>
					</div>

					<DividerLine className="my-3" lineColor={gs.gray} />

					<div className="d-flex justify-content-between">
						<p
							className="--f-semismall-semibold"
							style={{color: gs.gray}}
						>
							Sisa points Anda
						</p>
						<p
							className="--f-semismall-semibold ms-2 lh-base"
							style={{color: warning.main}}
						>
							{userPoints - data?.points} points
						</p>
					</div>
				</div>

				<Button
					type="primary"
					title="Tukar"
					className="mt-3 w-100"
					onClick={onRedeem}
				/>
			</section>
		</BottomSheet>
	);
}
