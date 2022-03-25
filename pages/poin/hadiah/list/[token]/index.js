import { useRouter } from "next/router";
import useSWR from "swr";
import { gs, pri, warning } from "../../../../../components/atom/Color";
import { HtmlPage } from "../../../../../components/atom/HtmlPage";
import { FooterGraphic } from "../../../../../components/molecule/Footer";
import { HeaderChild } from "../../../../../components/molecule/Header";
import { getData } from "../../../../../lib/fetcher";
import { handleTimestamp } from "../../../../../lib/function";

export default function RedeemHistory() {
	const { push, query } = useRouter();
	const { token } = query;

	const { data: payLoad } = useSWR(
		token ? ["/api/store/reward-history", token] : null,
		getData
	);
	const { data } = payLoad || {};
	const { reward_histories } = data || {};

	return (
		<HtmlPage
			title="Riwayat Tukar Hadiah | Kansai Paint"
			desc="Tukar poin yang sudah Anda kumpulkan dengan hadiah menarik dari Kansai Paint"
			background={pri.dark}
		>
			<HeaderChild
				title="Riwayat Tukar"
				onBack={() => push(`/poin/hadiah/${token}`)}
			/>

			{!reward_histories && (
				<div
					className="w-100 d-flex align-items-center justify-content-center"
					style={{ height: "calc(100% - 80px)" }}
				>
					<p className="--f-normal-regular" style={{ color: gs.white }}>
						Tidak ada riwayat tukar untuk ditampilkan
					</p>
				</div>
			)}

			{reward_histories && (
				<ul className="m-3">
					{/* HistoryCards */}
					{reward_histories
						.map((gift, key) => (
							<li
								key={key}
								className="mb-3"
								onClick={() => push(`/poin/hadiah/list/${token}/${gift.id}`)}
							>
								<div
									className="p-3 d-flex"
									style={{
										backgroundColor: pri.dark,
										boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.3)",
										borderRadius: 4,
									}}
								>
									{/* Gift Image */}
									<img
										src={gift?.image_link}
										height={64}
										width={64}
										style={{
											objectFit: "cover",
											borderRadius: 4,
										}}
										alt="Redeem Gift"
									/>

									{/* Gift Data */}
									<div className="ms-3 d-flex flex-column flex-fill justify-content-between">
										<p
											className="--f-normal-bold lh-base"
											style={{ color: gs.white }}
										>
											{gift?.name}
										</p>

										<div className="d-flex justify-content-between">
											<p
												className="--f-small-regular lh-base"
												style={{ color: gs.gray }}
											>
												{handleTimestamp(gift?.claim_time).dateAndTime}
											</p>

											<div className="d-flex align-items-center">
												<img
													src="/image/pixel/Coin.png"
													height={12}
													width={12}
													alt="Kansai Points"
												/>
												<p
													className="--f-small-semibold ms-2 lh-base"
													style={{
														color: warning.main,
													}}
												>
													{gift?.allocated_point} points
												</p>
											</div>
										</div>

										<div className="d-flex justify-content-between">
											<p
												className="--f-small-regular lh-base"
												style={{ color: gs.gray }}
											>
												ID: {gift?.id}
											</p>

											<p
												className="--f-small-semibold ms-2 lh-base"
												style={{
													color: pri.main,
													textDecoration: "underline",
												}}
											>
												Lihat Detail {">"}
											</p>
										</div>
									</div>
								</div>
							</li>
						))
						.reverse()}
				</ul>
			)}

			<FooterGraphic size="small" />
		</HtmlPage>
	);
}
