import {useRouter} from "next/router";
import {useCallback, useContext, useEffect, useState} from "react";
import {BottomSheet} from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../atom/Button";
import {danger, gs, pri, warning} from "../atom/Color";
import {Context} from "../atom/Context";
import {DividerLine} from "../atom/Divider";
import {InputUploadPhoto} from "../atom/Input";
import {BoxInfo} from "./Box";
import {HeaderBottomsheet} from "./Header";

export function BottomsheetUploadReceiptAndItem({open, onDismiss}) {
	const [state, setState] = useContext(Context);
	const {push, query} = useRouter();
	const {token} = query;

	// Images
	const [receiptImage, setReceiptImage] = useState(null);
	const [itemImage, setItemImage] = useState(null);

	// Upload Status
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const clearState = useCallback(() => {
		setReceiptImage(null);
		setItemImage(null);
		setIsUploading(false);
		setUploadProgress(0);
	}, []);

	const handleUploadPhotos = () => {
		// Change with API
		setIsUploading(true);
		setUploadProgress(0);

		for (let i = 0; i <= 100; i++) {
			setTimeout(() => {
				setUploadProgress(i);
			}, 30 * i);
		}
	};

	const handleCancelUpload = () => {
		setIsUploading(false);
		setUploadProgress(0);
	};

	// Change with API
	useEffect(() => {
		if (isUploading && uploadProgress === 100) {
			const images = state.images || [];
			images.push({
				timestamp: Date.now(),
				status: "on_process",
				receipt: receiptImage,
				item: itemImage,
			});

			setState((prev) => ({
				...prev,
				images: images?.reverse(),
			}));

			// Normalize
			clearState();
			onDismiss();
			push(`/upload-struk/${token}?s=true`);
		}
	}, [
		isUploading,
		uploadProgress,
		receiptImage,
		itemImage,
		clearState,
		onDismiss,
		push,
		setState,
		state.images,
		token,
	]);

	return (
		<BottomSheet
			open={open}
			onDismiss={!isUploading && onDismiss}
			snapPoints={({minHeight, maxHeight}) => [minHeight, maxHeight]}
			defaultSnap={({lastSnap, snapPoints}) =>
				lastSnap && Math.min(...snapPoints)
			}
			expandOnContentDrag={!isUploading}
		>
			<HeaderBottomsheet
				title="Upload Foto Struk &amp; Barang"
				onClose={onDismiss}
			/>

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

			{/* Progress Bar */}
			{isUploading && (
				<div className="m-3">
					<div className="d-flex justify-content-between align-items-center">
						<p
							className="--f-semismall-regular lh-base"
							style={{color: gs.gray}}
						>
							Sedang mengupload...
						</p>
						<p
							className="--f-semismall-regular lh-base"
							style={{color: gs.gray}}
						>
							{uploadProgress}%
						</p>
					</div>

					<div style={{backgroundColor: gs.soft}} className="mt-3">
						<div
							style={{
								width: `${uploadProgress}%`,
								height: 3,
								backgroundColor: pri.main,
							}}
						/>
					</div>
				</div>
			)}

			<div className="m-3">
				{!isUploading ? (
					<Button
						className="w-100"
						type="primary"
						title="Upload"
						onClick={handleUploadPhotos}
						disabled={!receiptImage || !itemImage}
					/>
				) : (
					<Button
						className="w-100"
						type="danger"
						title="Batalkan"
						onClick={handleCancelUpload}
					/>
				)}
			</div>
		</BottomSheet>
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
