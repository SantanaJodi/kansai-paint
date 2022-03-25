import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Button from "../../../components/atom/Button";
import { gs, pri, warning } from "../../../components/atom/Color";
import { HtmlPage } from "../../../components/atom/HtmlPage";
import Icon from "../../../components/atom/Icon";
import { ToasterBasic } from "../../../components/atom/Toaster";
import { BottomsheetConfirmRedeem } from "../../../components/molecule/Bottomsheet";
import { FooterGraphic } from "../../../components/molecule/Footer";
import { HeaderMainStore } from "../../../components/molecule/Header";
import { ModalRedeemSuccess } from "../../../components/molecule/Modal";
import { getData } from "../../../lib/fetcher";
import Error from "../../_error";

export default function TukarHadiah() {
	const { query } = useRouter();
	const { token } = query;

	const { push } = useRouter();

	const [redeemConfirmation, setRedeemConfirmation] = useState(false);
	const [redeemSuccess, setRedeemSuccess] = useState(false);
	const [insuficientPoint, setInsuficientPoint] = useState(false);

	const [redeemData, setRedeemData] = useState(null);

	const {
		data: payLoad,
		mutate,
		isValidating,
		error,
	} = useSWR(token ? ["/api/store/point-and-rewards", token] : null, getData);
	const { data } = payLoad || {};
	const { user, point, available_rewards } = data || {};

	const handleRedeemConfirmation = (gift) => {
		setRedeemData(gift);
		setRedeemConfirmation(true);
	};

	const handleRedeem = async () => {
		setRedeemSuccess(true);
		setRedeemConfirmation(false);

		// API Contract
		await axios.post(
			"/api/store/redeem",
			{
				reward: {
					id: redeemData?.id,
				},
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
	};

	if (error) return <Error statusCode={403} />;

	return (
		<HtmlPage
			title="Tukar Poin Dengan Hadiah | Kansai Paint"
			desc="Tukar poin yang sudah Anda kumpulkan dengan hadiah menarik dari Kansai Paint"
			background={pri.dark}
			loading={!data || isValidating}
		>
			{/* Toaster */}
			<ToasterBasic
				title="Poin Anda tidak cukup"
				show={insuficientPoint}
				onDismiss={() => setInsuficientPoint(false)}
			/>

			{/* Modal */}
			<ModalRedeemSuccess
				open={redeemSuccess}
				onClose={() => {
					setRedeemSuccess(false);
					setRedeemData(null);
					mutate();
				}}
				data={redeemData}
			/>

			{/* Bottomsheet */}
			<BottomsheetConfirmRedeem
				open={redeemConfirmation}
				onDismiss={() => {
					setRedeemConfirmation(false);
					setRedeemData(null);
				}}
				data={{
					...redeemData,
					userPoint: point?.available,
				}}
				onRedeem={handleRedeem}
			/>

			{/* Main */}
			<HeaderMainStore />

			<section className="m-3">
				<p className="--f-normal-bold lh-base" style={{ color: pri.main }}>
					{user?.name}
				</p>
				<p
					className="--f-small-regular lh-base mt-2"
					style={{ color: gs.white }}
				>
					{user?.address}
				</p>
			</section>

			<section
				className="p-3 d-flex justify-content-between align-items-center"
				style={{ backgroundColor: gs.black }}
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
						style={{ color: warning.main }}
					>
						{point?.available} points
					</p>
				</div>

				<div
					className="d-flex align-items-center"
					style={{ cursor: "pointer" }}
					onClick={() => push(`/poin/hadiah/list/${token}`)}
				>
					<Icon icon="box" fill={gs.white} size={16} />
					<p
						className="--f-semismall-semibold ms-2"
						style={{ textDecoration: "underline", color: gs.white }}
					>
						Riwayat Tukar
					</p>
				</div>
			</section>

			<section className="m-3">
				<p className="--f-normal-bold" style={{ color: gs.white }}>
					Hadiah Untuk Anda
				</p>

				<div className="row mt-3">
					{/* Cards */}
					{available_rewards?.map((gift, key) => (
						<div key={key} className="col-6 col-md-3 p-3">
							<div
								style={{
									borderRadius: 4,
									backgroundColor: pri.dark,
									boxShadow: "8px 8px 24px rgba(0, 0, 0, 0.4)",
									overflow: "hidden",
									cursor: "pointer",
								}}
								className="h-100"
								onClick={() =>
									point?.available > gift.point
										? handleRedeemConfirmation(gift)
										: setInsuficientPoint(true)
								}
							>
								{/* Gift Image */}
								<img
									src={gift.image_link}
									height={156}
									width="100%"
									style={{ objectFit: "cover" }}
									alt="Redeem Gift"
								/>

								{/* Gift Data */}
								<div
									className="d-flex flex-column justify-content-between"
									style={{ height: "calc(100% - 156px)" }}
								>
									<p
										className="--f-normal-bold m-2 lh-base"
										style={{ color: gs.white }}
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
												style={{ color: warning.main }}
											>
												{gift.point} points
											</p>
										</div>

										<Button
											type="primary"
											title="Tukar"
											className="mt-3 w-100"
											style={
												point?.available < gift.point && {
													background: gs.gray,
												}
											}
											onClick={() =>
												point?.available < gift.point
													? setInsuficientPoint(true)
													: handleRedeemConfirmation(gift)
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
