import Button from "../atom/Button";
import {gs, warning, pri, success} from "../atom/Color";
import Icon from "../atom/Icon";
import {useSpring, animated} from "@react-spring/web";
import {useDrag} from "@use-gesture/react";
import {useState, useRef, useEffect} from "react";
import Lottie from "react-lottie-player";
import Kado from "../../public/animation/Kado.json";

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

export function BoxCouponCard({onGetReward, active}) {
	const couponRef = useRef();
	const [couponIsLoaded, setCouponIsLoaded] = useState(false);
	const [goshockPercentage, setGoshockPercentage] = useState(0);

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
		},
	});

	const [animStyle, setAnimStyle] = useState(defaultStyle);

	const [{x, y}, api] = useSpring(() => ({x: 0, y: 0}));

	const bind = useDrag(
		({down, dragging, offset: [ox, oy]}) => {
			api.start({
				x: ox,
				y: oy,
				immediate: down,
			});
			down &&
				setAnimStyle((prev) => ({
					x,
					y,
					...prev,
				}));
			dragging &&
				goshockPercentage < 100 &&
				setGoshockPercentage(goshockPercentage + 1);
		},
		{
			bounds: {left: -76, right: 64, top: -16, bottom: 76},
			rubberband: true,
		}
	);

	useEffect(() => {
		couponRef.current?.complete && setCouponIsLoaded(true); // Check if image is loaded

		if (goshockPercentage === 100) {
			setGoshockPercentage(0);
			onGetReward();
		}
	}, [goshockPercentage, onGetReward, couponRef]);

	return (
		<div className="d-flex justify-content-center">
			<div className="position-relative text-center">
				{couponIsLoaded && (
					<div
						style={{
							width: "68%",
							height: "100%",
							position: "absolute",
							right: 0,
						}}
						className="d-flex align-items-center py-3"
					>
						{/* Goshock area */}
						<div
							style={{
								border: `1px dashed ${
									goshockPercentage === 100
										? success.main
										: warning.main
								}`,
								width: "100%",
								height: "100%",
								borderRadius: 8,
								backgroundColor: warning.light,
								position: "relative",
								cursor: "pointer",
								zIndex: 0,
							}}
							className="d-flex flex-column align-items-center justify-content-center me-4"
						>
							<animated.div
								{...bind()}
								style={{
									...animStyle,
									display:
										active && goshockPercentage !== 100
											? "block"
											: "none",
									touchAction: "none",
									height: 56,
									width: 56,
									borderRadius: 100,
									backgroundColor: warning.main,
								}}
							>
								<img
									height={56}
									width={56}
									src="/image/pixel/Coin.png"
									draggable={false}
									alt="Kansai coin"
								/>
							</animated.div>

							{active && goshockPercentage === 0 && (
								<p className="--f-small-semibold lh-base mt-2 p-2">
									Gunakan koin di atas untuk mulai menggosok
								</p>
							)}

							{active &&
								goshockPercentage !== 0 &&
								goshockPercentage < 100 && (
									<p className="--f-small-semibold lh-base mt-2 p-2">
										Terus gosok!{" "}
										{Math.floor(goshockPercentage)}%
									</p>
								)}

							{!active && (
								<>
									<div
										className="d-flex align-items-center"
										style={{height: 80, overflow: "hidden"}}
									>
										<Lottie
											loop
											animationData={Kado}
											play
											style={{
												width: 150,
												height: 150,
												marginTop: -48,
											}}
										/>
									</div>
									<p
										className="--f-small-semibold lh-base"
										style={{color: success.dark}}
									>
										Memuat hadiahmu...
									</p>
								</>
							)}

							{/* Progress background */}
							{active && (
								<div
									style={{
										height: `100%`,
										width: `${goshockPercentage}%`,
										backgroundColor:
											goshockPercentage === 100
												? success.light
												: gs.white,
										position: "absolute",
										borderRadius: 8,
										zIndex: -1,
										left: 0,
									}}
								/>
							)}
						</div>
					</div>
				)}

				<img
					alt="Kansai GOSHOCK Ticket"
					src="/image/vector/Ticket.svg"
					style={{width: "100%", maxWidth: 328}}
					onLoad={() => setCouponIsLoaded(true)} // Need onLoad for the first image render
					ref={couponRef}
				/>
			</div>
		</div>
	);
}
