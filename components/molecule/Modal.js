import { useState } from "react";
import Button from "../atom/Button";
import { danger, gs, pri, success } from "../atom/Color";
import Icon, { GoShock } from "../atom/Icon";
import { Input, InputDropDown, TextArea } from "../atom/Input";

function LightBox({ open, onClose, children }) {
	return (
		<div
			style={{
				position: "fixed",
				width: "100%",
				height: "100%",
				transition: "300ms",
				zIndex: 99,
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				pointerEvents: open ? "auto" : "none",
			}}
			className="d-flex justify-content-center align-items-center p-3">
			{/* Lightbox */}
			<div
				style={{
					position: "absolute",
					backgroundColor: `rgba(0, 0, 0, ${open ? 0.5 : 0})`,
					width: "100%",
					height: "100%",
					transition: "300ms",
				}}
				onClick={onClose}
			/>

			{children}
		</div>
	);
}

function Modal({ children, open, onClose, transparentBackground }) {
	return (
		<LightBox open={open} onClose={onClose}>
			{/* Modal */}
			<div
				style={{
					backgroundColor: transparentBackground ? "transparent" : gs.white,
					borderRadius: 8,
					opacity: open ? 1 : 0,
					transform: open ? "scale(1)" : "scale(0)",
					transition: "300ms",
					maxWidth: 720 - 32,
				}}
				className="d-flex flex-column align-items-center justify-content-center p-3 w-100">
				{children}
			</div>
		</LightBox>
	);
}

export function ModalSuccessUpload({ open, onClose }) {
	return (
		<Modal open={open} onClose={onClose}>
			<img
				alt="Send Icon"
				height={64}
				width={64}
				src="/image/vector/Paper Plane.svg"
			/>

			<p className="--f-normal-bold lh-base mt-3">Foto Berhasil Diupload</p>

			<p
				className="--f-semismall-regular lh-base text-center mt-2"
				style={{ color: gs.dark }}>
				Foto struk dan barang anda telah berhasil diupload. Admin akan segera
				melakukan validasi untuk ditukarkan dengan kesempatan{" "}
				<GoShock className="--f-semismall-bold" />
			</p>

			<Button
				title="Mengerti"
				type="primary"
				onClick={onClose}
				className="mt-3 w-100"
			/>
		</Modal>
	);
}

export function ModalPhysicalPrize({ open, prizeName, onSend }) {
	const [address, setAddress] = useState("");

	return (
		<Modal open={open} onClose={() => {}}>
			<img
				alt="Gift Icon"
				height={64}
				width={64}
				src="/image/vector/Gift.svg"
			/>

			<div className="text-center">
				<p className="--f-normal-regular lh-base">Selamat Anda Mendapatkan:</p>
				<p className="--f-normal-bold lh-base" style={{ color: pri.main }}>
					{prizeName}
				</p>
			</div>

			<p
				className="--f-semismall-regular lh-base text-center mt-2"
				style={{ color: gs.gray }}>
				Isi formulir di bawah ini dengan alamat pengiriman hadiah Anda
			</p>

			<TextArea
				placeholder="Masukan alamat Anda..."
				className="w-100 mt-3"
				value={address}
				onChange={(val) => setAddress(val)}
			/>

			<Button
				type="primary"
				title="Kirim"
				className="mt-3 w-100"
				onClick={() => {
					setAddress("");
					onSend(address);
				}}
				disabled={!address}
			/>
		</Modal>
	);
}

export function ModalDigitalPrize({ open, prizeName, onSend }) {
	const [phoneNumber, setPhoneNumber] = useState(null);

	return (
		<Modal open={open} onClose={() => {}}>
			<img
				alt="Gift Icon"
				height={64}
				width={64}
				src="/image/vector/Gift.svg"
			/>

			<div className="text-center">
				<p className="--f-normal-regular lh-base">Selamat Anda Mendapatkan:</p>
				<p className="--f-normal-bold lh-base" style={{ color: pri.main }}>
					{prizeName}
				</p>
			</div>

			<p
				className="--f-semismall-regular lh-base text-center mt-2"
				style={{ color: gs.gray }}>
				Masukan nomor handphone Anda sebagai penerima hadiah
			</p>

			<Input onChange={(val) => setPhoneNumber(val)} className="w-100 mt-3" />

			<Button
				type="primary"
				title="Kirim"
				className="mt-3 w-100"
				onClick={() => onSend()}
			/>
		</Modal>
	);
}

export function ModalRedeemDigitalPrize({ open, onClose, onRedeem }) {
	return (
		<Modal open={open} onClose={onClose}>
			<p className="--f-normal-bold lh-base" style={{ color: success.main }}>
				Selamat Anda Mendapatkan:
			</p>
			<p className="--f-normal-regular lh-base">[Nama Hadiah]</p>

			<p className="--f-small-regular lh-base" style={{ color: gs.gray }}>
				Redeem hadiah Anda dengan klik tombol di bawah
			</p>

			<Button
				title="Oke"
				type="primary"
				className="mt-3 w-100"
				onClick={onRedeem}
			/>
		</Modal>
	);
}

export function ModalRedeemSuccess({ open, onClose, data }) {
	return (
		<Modal open={open} onClose={onClose}>
			<Icon icon="check" size={56} fill={success.main} />
			<p className="--f-normal-bold lh-base" style={{ color: success.main }}>
				Redeem Berhasil!
			</p>
			<p className="--f-normal-regular lh-base">{data?.name}</p>

			<div className="d-flex align-items-center mt-3">
				<img
					src="/image/pixel/Coin.png"
					height={16}
					width={16}
					alt="Kansai Points"
				/>
				<p
					className="--f-semismall-semibold ms-2"
					style={{ color: danger.main }}>
					- {data?.points} points
				</p>
			</div>

			<Button
				title="Oke"
				type="primary"
				className="mt-3 w-100"
				onClick={onClose}
			/>
		</Modal>
	);
}

export function ModalZoomInReceipt({ open, onClose, src }) {
	return (
		<Modal open={open} onClose={onClose} transparentBackground>
			<div
				className="d-flex align-items-center gap-1"
				onClick={onClose}
				style={{ cursor: "pointer" }}>
				<p className="--f-normal-regular" style={{ color: gs.white }}>
					Tutup
				</p>
				<Icon icon="x" fill={gs.white} size={24} />
			</div>

			<img
				src={src}
				style={{ objectFit: "scale-down", height: "80vh", width: "auto" }}
				alt="Display"
				className="mt-3"
			/>
		</Modal>
	);
}
