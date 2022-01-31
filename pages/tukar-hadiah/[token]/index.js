import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import Button from "../../../components/atom/Button";
import {gs, pri, warning} from "../../../components/atom/Color";
import {Context} from "../../../components/atom/Context";
import {HtmlPage} from "../../../components/atom/HtmlPage";
import Icon from "../../../components/atom/Icon";
import {BottomsheetConfirmRedeem} from "../../../components/molecule/Bottomsheet";
import {FooterGraphic} from "../../../components/molecule/Footer";
import {HeaderMainStore} from "../../../components/molecule/Header";
import {ModalRedeemSuccess} from "../../../components/molecule/Modal";

export default function TukarHadiah() {
	const {push} = useRouter();
	const [{userPoints, redeemHistory}, setState] = useContext(Context);

	const [redeemConfirmation, setRedeemConfirmation] = useState(false);
	const [redeemSuccess, setRedeemSuccess] = useState(false);

	const [redeemData, setRedeemData] = useState(null);

	const dummyGiftDatabase = [
		{
			name: "Kipas Angin Cosmos Wadesta",
			img: "https://images.unsplash.com/photo-1618941716939-553df3c6c278?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGZhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
			points: 180,
			id: "01",
		},
		{
			name: "Aesthetic Chair",
			img: "https://images.unsplash.com/photo-1622147681210-d7da05b4a7d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGNoYWlyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
			points: 1000,
			id: "02",
		},
		{
			name: "Minimalist Door That’s Open",
			img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80",
			points: 1200,
			id: "03",
		},
		{
			name: "Cool Lamp",
			img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhbXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
			points: 500,
			id: "04",
		},
	];

	const handleRedeemConfirmation = (gift) => {
		setRedeemData(gift);
		setRedeemConfirmation(true);
	};

	const handleRedeem = () => {
		setRedeemSuccess(true);
		setRedeemConfirmation(false);

		const redeemList = redeemHistory || [];
		redeemList.push({
			...redeemData,
			id: redeemList.length,
			timestamp: Date.now(),
			address:
				"Jl. Perangai Jaya Alam Bina Nusantara no 94, RT 01 RW 02, Jakarta Utara, DKI Jakarta",
		});

		setState((prev) => ({
			...prev,
			userPoints: userPoints - redeemData?.points,
			redeemHistory: redeemList,
		}));
	};

	useEffect(() => {
		// Change with API
		setState((prev) => ({
			...prev,
			userPoints: 990,
		}));
	}, [setState]);

	return (
		<HtmlPage
			title="Tukar Poin Dengan Hadiah | Kansai Paint"
			desc="Tukar poin yang sudah Anda kumpulkan dengan hadiah menarik dari Kansai Paint"
			background={pri.dark}
		>
			{/* Modal */}
			<ModalRedeemSuccess
				open={redeemSuccess}
				onClose={() => setRedeemSuccess(false)}
				data={redeemData}
			/>

			{/* Bottomsheet */}
			<BottomsheetConfirmRedeem
				open={redeemConfirmation}
				onDismiss={() => {
					setRedeemConfirmation(false);
					setRedeemData(null);
				}}
				data={redeemData}
				onRedeem={handleRedeem}
			/>

			{/* Main */}
			<HeaderMainStore />

			<section className="m-3">
				<p
					className="--f-normal-bold lh-base"
					style={{color: pri.main}}
				>
					Toko Bangun Jaya Abadi
				</p>
				<p
					className="--f-small-regular lh-base mt-2"
					style={{color: gs.white}}
				>
					Jl. Perangai Jaya Alam Bina Nusantara no 94, RT 01 RW 02,
					Jakarta Utara, DKI Jakarta
				</p>
			</section>

			<section
				className="p-3 d-flex justify-content-between align-items-center"
				style={{backgroundColor: gs.black}}
			>
				<div className="d-flex align-items-center">
					<img
						src="/image/pixel/Coin.png"
						height={16}
						width={16}
						alt="Kansai Points"
					/>
					<p
						className="--f-semismall-semibold ms-2"
						style={{color: warning.main}}
					>
						{userPoints} points
					</p>
				</div>

				<div
					className="d-flex align-items-center"
					style={{cursor: "pointer"}}
					onClick={() => push("/tukar-hadiah/01/riwayat")}
				>
					<Icon icon="box" fill={gs.white} size={16} />
					<p
						className="--f-semismall-semibold ms-2"
						style={{textDecoration: "underline", color: gs.white}}
					>
						Riwayat Tukar
					</p>
				</div>
			</section>

			<section className="m-3">
				<p className="--f-normal-bold" style={{color: gs.white}}>
					Hadiah Untuk Anda
				</p>

				<div className="row mt-3">
					{/* Cards */}
					{dummyGiftDatabase.map((gift, key) => (
						<div key={key} className="col-6 col-md-3 p-2">
							<div
								style={{
									borderRadius: 4,
									backgroundColor: pri.dark,
									boxShadow:
										"8px 8px 24px rgba(0, 0, 0, 0.4)",
									overflow: "hidden",
									cursor: "pointer",
								}}
								className="h-100"
								onClick={() =>
									userPoints > gift.points &&
									handleRedeemConfirmation(gift)
								}
							>
								{/* Gift Image */}
								<img
									src={gift.img}
									height={156}
									width="100%"
									style={{objectFit: "cover"}}
									alt="Redeem Gift"
								/>

								{/* Gift Data */}
								<div
									className="d-flex flex-column justify-content-between"
									style={{height: "calc(100% - 156px)"}}
								>
									<p
										className="--f-normal-bold m-2 lh-base"
										style={{color: gs.white}}
									>
										{gift.name}
									</p>

									<div className="m-2">
										<div className="d-flex align-items-center">
											<img
												src="/image/pixel/Coin.png"
												height={16}
												width={16}
												alt="Kansai coin"
											/>
											<p
												className="--f-semismall-semibold ms-2"
												style={{color: warning.main}}
											>
												{gift.points} points
											</p>
										</div>

										<Button
											type="primary"
											title="Tukar"
											className="mt-3 w-100"
											disabled={userPoints < gift.points}
											onClick={() =>
												handleRedeemConfirmation(gift)
											}
										/>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<FooterGraphic size="big" />
		</HtmlPage>
	);
}
