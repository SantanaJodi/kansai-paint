import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { ButtonHelp } from "../../../../components/atom/Button";
import { gs, pri, warning } from "../../../../components/atom/Color";
import { DividerSection } from "../../../../components/atom/Divider";
import { HtmlPage } from "../../../../components/atom/HtmlPage";
import Icon, { GoShock } from "../../../../components/atom/Icon";
import { LoadingLine } from "../../../../components/atom/Loading";
import { ToasterBasic } from "../../../../components/atom/Toaster";
import { BoxCouponCard } from "../../../../components/molecule/Box";
import { FooterImage } from "../../../../components/molecule/Footer";
import { HeaderMainCustomer } from "../../../../components/molecule/Header";
import {
	ModalDigitalPrize,
	ModalPhysicalPrize,
} from "../../../../components/molecule/Modal";
import { getData } from "../../../../lib/fetcher";
import { handleTimestamp } from "../../../../lib/function";

export default function GoShockPage() {
	const { push, query } = useRouter();
	const { token } = query;

	const [isGosokable, setIsGosokable] = useState(true);

	// Prize
	const [prizeData, setPrizeData] = useState(null);
	const [physicalPrize, setPhysicalPrize] = useState(false);
	const [digitalPrize, setDigitalPrize] = useState(false);

	// Error Toaster
	const [claimDPError, setClaimDPError] = useState(false);

	const {
		data: payload,
		isValidating,
		mutate,
	} = useSWR(["/api/rewards", token], getData);
	const { data } = payload || {};

	const handleGetReward = async () => {
		setIsGosokable(false);
		const res = await axios.get("/api/scratch", {
			headers: {
				Authorization: token,
			},
		});

		const {
			data: { reward },
		} = await res.data;
		setPrizeData(reward);
		reward?.type === "pg" ? setPhysicalPrize(true) : setDigitalPrize(true);

		mutate();
	};

	const handleSendPhysicalPrize = async (address) => {
		setPhysicalPrize(false);

		await axios.post(
			"/api/claim",
			{
				reward: {
					...prizeData,
					send_to: address,
				},
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);

		mutate();

		// Reset Goshock
		setPrizeData(null);
		setIsGosokable(true);
	};

	const handleSendDigitalPrize = async (phoneNumber) => {
		await axios
			.post(
				"api/claim",
				{
					reward: {
						...prizeData,
						send_to: phoneNumber,
					},
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
			.then((res) => {
				if (res.status === 200) {
					setDigitalPrize(false);
					mutate();

					// Reset Goshock
					setPrizeData(null);
					setIsGosokable(true);
				} else {
					setClaimDPError(true);
				}
			});
	};

	return (
		<HtmlPage
			title="GoShock | Kansai Paint"
			desc="Gosok kuponnya dan menangkan berbagai macam hadiah menarik"
			background="linear-gradient(180deg, #003494 0%, #001954 100%)"
		>
			{/* Toaster */}
			<ToasterBasic
				title="Terjadi kesalahan, coba lagi"
				show={claimDPError}
				onDismiss={() => setClaimDPError(false)}
			/>

			{/* Modal */}
			<ModalPhysicalPrize
				open={physicalPrize}
				onClose={() => setPhysicalPrize(false)}
				prizeName={prizeData?.name}
				onSend={handleSendPhysicalPrize}
			/>

			<ModalDigitalPrize
				open={digitalPrize}
				onClose={() => setDigitalPrize(false)}
				prizeName={prizeData?.name}
				onSend={handleSendDigitalPrize}
			/>

			{/* Main */}
			<HeaderMainCustomer logo="white" />

			<div className="text-center m-3">
				{data?.Coupon.available !== 0 && (
					<p className="--f-normal-bold lh-base" style={{ color: gs.white }}>
						Selamat!
					</p>
				)}
				<p
					className="--f-normal-regular lh-base mt-2"
					style={{ color: gs.white }}
				>
					Anda memiliki kesempatan
				</p>

				{data?.Coupon.available !== undefined && (
					<div className="d-flex align-items-center justify-content-center mt-2">
						<Icon icon="ticket" fill={warning.main} size={32} />
						<p
							style={{
								fontSize: 32,
								fontWeight: "bold",
								color: warning.main,
							}}
							className="lh-base ms-2"
						>
							{data?.Coupon.available} x
						</p>
					</div>
				)}

				<p
					className="--f-normal-regular lh-base mt-2"
					style={{ color: gs.white }}
				>
					Untuk melakukan <GoShock className="--f-normal-bold" /> kupon
					berhadiah
				</p>
			</div>

			{!isValidating && data?.Coupon.available !== 0 && (
				<BoxCouponCard onGetReward={handleGetReward} active={isGosokable} />
			)}

			{isValidating && (
				<div className="d-flex w-100 justify-content-center">
					<LoadingLine />
				</div>
			)}

			{!isValidating &&
				data?.reward_histories &&
				data?.reward_histories.length !== 0 && (
					<>
						<DividerSection
							title="Hadiah Anda"
							color={gs.white}
							className="m-3"
						/>

						{/* Cards */}
						<section className="m-3 d-flex flex-column gap-3">
							{data?.reward_histories
								?.map((reward, key) => (
									<div
										key={key}
										className="p-3"
										style={{
											borderRadius: 4,
											backgroundColor: gs.white,
											borderLeft: `2px solid ${warning.main}`,
											cursor: "pointer",
										}}
										onClick={() => push(`/kupon/gosok/${token}/${reward?.id}`)}
									>
										<header className="d-flex align-items-center justify-content-between">
											<div className="d-flex align-items-center">
												<Icon icon="box_open" size={24} fill={warning.main} />
												<p className="ms-2 --f-semismall-bold">
													{reward?.name}
												</p>
											</div>

											{reward?.code && (
												<p
													className="--f-small-regular px-2 py-1 lh-base --ellipsis-1"
													style={{
														color: gs.gray,
														backgroundColor: gs.light,
														borderRadius: 4,
														maxWidth: 120,
													}}
												>
													{reward?.code}
												</p>
											)}
										</header>

										<div className="mt-2">
											<p
												className="--f-small-regular lh-base"
												style={{ color: gs.gray }}
											>
												Dikirim ke:{" "}
												<span style={{ color: gs.black }}>
													{reward?.send_to}
												</span>
											</p>

											<p
												className="--f-small-regular lh-base mt-1"
												style={{ color: gs.gray }}
											>
												Pada:{" "}
												<span style={{ color: gs.black }}>
													{handleTimestamp(reward?.claim_time).dateAndTime}
												</span>
											</p>
										</div>

										<p
											className="--f-small-regular mt-2 text-end"
											style={{ color: pri.main }}
										>
											Lihat Detail {">"}
										</p>
									</div>
								))
								.reverse()}
						</section>
					</>
				)}

			<FooterImage size="big" />
			<ButtonHelp />
		</HtmlPage>
	);
}
