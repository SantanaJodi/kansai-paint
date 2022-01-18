import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import {BottomSheet} from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../atom/Button";
import {gs, pri} from "../atom/Color";
import {Context} from "../atom/Context";
import {InputUploadPhoto} from "../atom/Input";
import {BoxInfo} from "./Box";
import {HeaderBottomsheet} from "./Header";

export function BottomsheetUploadReceiptAndItem({open, onDismiss}) {
	const {push} = useRouter();
	const [state, setState] = useContext(Context);

	// Images
	const [receiptImage, setReceiptImage] = useState(null);
	const [itemImage, setItemImage] = useState(null);

	// Upload Status
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const clearState = () => {
		setReceiptImage(null);
		setItemImage(null);
		setIsUploading(false);
	};

	const handleUploadPhotos = () => {
		setIsUploading(true);

		// Progress percentage, change with API
		for (let i = 0; i <= 100; i++) {
			setTimeout(() => {
				setUploadProgress(i);
			}, 30 * i);
		}
	};

	const handleCancelUpload = () => {
		setUploadProgress(0);
		setIsUploading(false);
	};

	useEffect(() => {
		// Change with API
		if (isUploading && uploadProgress === 100) {
			const images = state.images || [];
			images.push({
				receipt: receiptImage,
				item: itemImage,
			});

			setState((prev) => ({
				...prev,
				images,
			}));

			// Normalize
			clearState();
			onDismiss();
			push("/upload-struk?s=true");
		}
	}, [uploadProgress]);

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
					image={receiptImage}
				/>
				<InputUploadPhoto
					className="w-100"
					title="Upload Foto Barang"
					onChange={(blob) => setItemImage(blob)}
					image={itemImage}
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
