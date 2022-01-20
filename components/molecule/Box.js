import Button from "../atom/Button";
import {gs, warning} from "../atom/Color";
import Icon from "../atom/Icon";
import {useSpring, animated} from "@react-spring/web";
import {useDrag} from "@use-gesture/react";
import {useState} from "react";

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

export function BoxCouponCard() {
	// Animation Hooks
	const defaultStyle = useSpring({
		loop: true,
		config: {duration: 300},
		to: [
			{transform: "translateX(8px)"},
			{transform: "translateX(-8px)"},
			{transform: "translateX(0px)"},
		],
		from: {
			transform: "translateX(0px)",
			height: 56,
			width: 56,
			borderRadius: "100%",
			border: `3px solid ${warning.dark}`,
			backgroundColor: warning.main,
			touchAction: "none",
		},
	});

	const [animStyle, setAnimStyle] = useState(defaultStyle);

	const [{x, y}, api] = useSpring(() => ({x: 0, y: 0}));

	const bind = useDrag(
		({dragging, offset: [ox, oy]}) => {
			api.start({
				x: ox,
				y: oy,
				immediate: dragging,
			});
			dragging &&
				setAnimStyle((prev) => ({
					x,
					y,
					...prev,
				}));
			dragging && console.log("oke");
		},
		{
			bounds: {left: -76, right: 64, top: -16, bottom: 76},
			rubberband: true,
		}
	);

	return (
		<div className="d-flex justify-content-center">
			<div
				className="position-relative text-center"
				style={{
					width: "calc(100% - 32px)",
					maxWidth: 328,
				}}
			>
				<div
					style={{
						width: "68%",
						height: "100%",
						position: "absolute",
						right: 0,
					}}
					className="d-flex align-items-center p-3 ps-0 pe-4"
				>
					<div
						style={{
							border: `1px dashed ${gs.light}`,
							width: "100%",
							height: "100%",
							borderRadius: 8,
						}}
						className="d-flex flex-column align-items-center justify-content-center"
					>
						<animated.div
							{...bind()}
							style={animStyle}
							className="d-flex justify-content-center align-items-center"
						>
							<p
								className="--f-normal-bold"
								style={{color: warning.dark}}
							>
								K
							</p>
						</animated.div>
						<p className="--f-small-semibold lh-base mt-2 p-2">
							Gunakan koin di atas untuk mulai menggosok
						</p>
					</div>
				</div>

				<img
					alt="Kansai GOSHOCK Ticket"
					src="/image/vector/Ticket.svg"
					style={{width: "100%", maxWidth: 328}}
				/>
			</div>
		</div>
	);
}
