import Button from "../atom/Button";
import {gs, warning} from "../atom/Color";
import Icon from "../atom/Icon";

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
				onClick={onClick}
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

export function BoxInfo({desc, icon, className, style}) {
	return (
		<div
			className={`${className} d-flex align-items-start p-3`}
			style={{...style, backgroundColor: warning.light, borderRadius: 4}}
		>
			<Icon icon={icon} size={16} fill={warning.dark} />
			<p
				className="ms-2 lh-base --f-semismall-regular"
				style={{color: warning.dark}}
			>
				{desc}
			</p>
		</div>
	);
}
