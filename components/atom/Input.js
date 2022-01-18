import Ripples from "react-ripples";
import {gs, pri} from "./Color";
import Icon from "./Icon";

export function InputUploadPhoto({title, className, onChange, image}) {
	return (
		<Ripples className={className}>
			<label
				className={`text-center justify-content-center alignitems-center w-100 ${
					!image && "p-3"
				}`}
				style={{
					borderRadius: 4,
					border: !image && `1px dashed ${gs.light}`,
					position: "relative",
					overflow: "hidden",
					cursor: "pointer",
				}}
			>
				{/* Main */}
				{!image && (
					<>
						<Icon icon="add" fill={pri.main} size={24} />
						<p
							className="lh-base --f-normal-semibold"
							style={{color: pri.main}}
						>
							{title}
						</p>
					</>
				)}

				{image && (
					<img
						src={image}
						height="100%"
						width="100%"
						style={{objectFit: "cover"}}
					/>
				)}

				{/* Input */}
				<input
					type="file"
					accept="image/png, image/jpeg, image/jpg"
					style={{display: "none"}}
					onInput={(e) => {
						const files = e.target.files[0];
						files && onChange(URL.createObjectURL(files));
					}}
				/>
			</label>
		</Ripples>
	);
}
