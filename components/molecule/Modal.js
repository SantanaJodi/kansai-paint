import Button from "../atom/Button";
import {gs} from "../atom/Color";
import {GoShock} from "../atom/Icon";

function Modal({children, open, onClose, transparentBackground}) {
	return (
		// Light Box
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
			className="d-flex justify-content-center align-items-center p-3"
		>
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

			{/* Modal */}
			<div
				style={{
					backgroundColor: transparentBackground
						? "transparent"
						: gs.white,
					borderRadius: 16,
					opacity: open ? 1 : 0,
					transform: open ? "scale(1)" : "scale(0)",
					transition: "300ms",
					maxWidth: 720 - 32,
				}}
				className="d-flex flex-column align-items-center justify-content-center p-3 w-100"
			>
				{children}
			</div>
		</div>
	);
}

export function ModalSuccessUpload({open, onClose}) {
	return (
		<Modal open={open} onClose={onClose}>
			<img
				alt="Send Icon"
				height={64}
				width={64}
				src="/image/vector/Paper Plane.svg"
			/>

			<p className="--f-normal-bold lh-base mt-3">
				Foto Berhasil Diupload
			</p>

			<p
				className="--f-semismall-regular lh-base text-center mt-2"
				style={{color: gs.dark}}
			>
				Foto struk dan barang anda telah berhasil diupload. Admin akan
				segera melakukan validasi untuk ditukarkan dengan kesempatan{" "}
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