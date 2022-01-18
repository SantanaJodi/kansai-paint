import Button from "../atom/Button";
import {gs} from "../atom/Color";

export function BoxUpload({className, onClick}) {
	return (
		<div
			className={`p-3 d-flex flex-column align-items-center ${className}`}
			style={{
				backgroundColor: gs.soft,
				borderRadius: 4,
				border: `1px dashed ${gs.light}`,
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			<p
				className="--f-normal-regular lh-base text-center"
				style={{color: gs.gray}}
			>
				Sentuh di sini untuk mengupload{" "}
				<span className="--f-normal-bold">
					foto struk &amp; foto barang yang Anda beli
				</span>
			</p>

			<Button
				type="primary"
				title="Upload Foto"
				icon="add"
				className="mt-3"
			/>

			<p
				className="--f-normal-regular lh-base text-center mt-3"
				style={{color: gs.gray}}
			>
				Hanya menerima foto dalam format
			</p>
			<p
				className="--f-normal-regular lh-base text-center"
				style={{color: gs.gray}}
			>
				PNG / JPG
			</p>
		</div>
	);
}
