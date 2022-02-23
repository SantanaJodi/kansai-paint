import axios from "axios";
import {useRouter} from "next/router";
import {useState} from "react";
import useSWR from "swr";
import {ButtonHelp} from "../../../components/atom/Button";
import {gs, pri, warning} from "../../../components/atom/Color";
import {DividerSection} from "../../../components/atom/Divider";
import {HtmlPage} from "../../../components/atom/HtmlPage";
import Icon, {GoShock} from "../../../components/atom/Icon";
import {LoadingLine} from "../../../components/atom/Loading";
import {BoxCouponCard} from "../../../components/molecule/Box";
import {FooterImage} from "../../../components/molecule/Footer";
import {HeaderMainCustomer} from "../../../components/molecule/Header";
import {
	ModalDigitalPrize,
	ModalPhysicalPrize,
} from "../../../components/molecule/Modal";
import {getData} from "../../../lib/fetcher";
import {handleTimestamp} from "../../../lib/function";

export default function GoShockPage() {
	const {push, query} = useRouter();
	const {token} = query;

	const [chance, setChance] = useState(2);
	const [resetGoshock, setResetGoshock] = useState(false);

	// Prize
	const [prizeData, setPrizeData] = useState(null);
	const [physicalPrize, setPhysicalPrize] = useState(false);
	const [digitalPrize, setDigitalPrize] = useState(false);

	const [prizes, setPrizes] = useState([]);

	const {
		data: payload,
		isValidating,
		mutate,
	} = useSWR(["/api/rewards", token], getData);
	const {data} = payload || {};

	const handleGetReward = async () => {
		const res = await axios.get("/api/scratch", {
			headers: {
				Authorization: token,
			},
		});

		const {
			data: {reward},
		} = await res.data;
		setPrizeData(reward);
		reward?.type === "pg" ? setPhysicalPrize(true) : setDigitalPrize(true);

		mutate();

		console.log(reward);
	};

	const handleSendPhysicalPrize = () => {
		setPhysicalPrize(false);

		// Change to API
		setChance(chance - 1);
		const prizeList = prizes;
		prizeList.push({
			type: "physical",
			id: "jah8374ndkue9",
			name: "iPhone13",
			address:
				"Jl. Nama Jalan RT 01/RW 02, Nama Desa, Nama Kabupaten, Nama Provinsi",
			timestamp: Date.now(),
			img: {
				receipt:
					"https://discuss.poynt.net/uploads/default/original/2X/6/60c4199364474569561cba359d486e6c69ae8cba.jpeg",
				item: "https://mckups.com/wp-content/uploads/2019/12/Bucket-Mockup.jpg",
				timestamp: Date.now(),
			},
		});
		setPrizes(prizeList);

		// Reset Goshock
		setResetGoshock(true);
		setTimeout(() => {
			setResetGoshock(false);
		}, 100);
	};

	const handleSendDigitalPrize = () => {
		setDigitalPrize(false);

		// Change to API
		setChance(chance - 1);
		const prizeList = prizes;
		prizeList.push({
			type: "digital",
			id: "jah8374ndkue9",
			name: "OVO 30.000",
			phone_number: "081234567890",
			timestamp: Date.now(),
			img: {
				receipt:
					"https://discuss.poynt.net/uploads/default/original/2X/6/60c4199364474569561cba359d486e6c69ae8cba.jpeg",
				item: "https://mckups.com/wp-content/uploads/2019/12/Bucket-Mockup.jpg",
				timestamp: Date.now(),
			},
		});
		setPrizes(prizeList);

		// Reset Goshock
		setResetGoshock(true);
		setTimeout(() => {
			setResetGoshock(false);
		}, 100);
	};

	return (
		<HtmlPage
			title="GoShock | Kansai Paint"
			desc="Gosok kuponnya dan menangkan berbagai macam hadiah menarik"
			background="linear-gradient(180deg, #003494 0%, #001954 100%)"
		>
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
					<p
						className="--f-normal-bold lh-base"
						style={{color: gs.white}}
					>
						Selamat!
					</p>
				)}
				<p
					className="--f-normal-regular lh-base mt-2"
					style={{color: gs.white}}
				>
					Anda memiliki kesempatan
				</p>

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

				<p
					className="--f-normal-regular lh-base mt-2"
					style={{color: gs.white}}
				>
					Untuk melakukan <GoShock className="--f-normal-bold" />{" "}
					kupon berhadiah
				</p>
			</div>

			{data?.Coupon.available && (
				<BoxCouponCard
					onGetReward={handleGetReward}
					reset={resetGoshock}
				/>
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
							{data?.reward_histories?.map((reward, key) => (
								<div
									key={key}
									className="p-3"
									style={{
										borderRadius: 4,
										backgroundColor: gs.white,
										borderLeft: `2px solid ${warning.main}`,
										cursor: "pointer",
									}}
									onClick={() =>
										push(`/goshock/${token}/${reward?.id}`)
									}
								>
									<header className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<Icon
												icon="box_open"
												size={24}
												fill={warning.main}
											/>
											<p className="ms-2 --f-semismall-bold">
												{reward?.name}
											</p>
										</div>

										{reward?.code && (
											<p
												className="--f-small-regular px-2 py-1"
												style={{
													color: gs.gray,
													backgroundColor: gs.light,
													borderRadius: 4,
												}}
											>
												{reward?.code}
											</p>
										)}
									</header>

									<div className="mt-2">
										<p
											className="--f-small-regular lh-base"
											style={{color: gs.gray}}
										>
											Dikirim ke:{" "}
											<span style={{color: gs.black}}>
												{reward?.send_to}
											</span>
										</p>

										<p
											className="--f-small-regular lh-base mt-1"
											style={{color: gs.gray}}
										>
											Pada:{" "}
											<span style={{color: gs.black}}>
												{
													handleTimestamp(
														reward?.claim_time
													).dateAndTime
												}
											</span>
										</p>
									</div>

									<p
										className="--f-small-regular mt-2 text-end"
										style={{color: pri.main}}
									>
										Lihat Detail {">"}
									</p>
								</div>
							))}
						</section>
					</>
				)}

			<FooterImage size="big" />
			<ButtonHelp onClick={() => console.log("need help")} />
		</HtmlPage>
	);
}
