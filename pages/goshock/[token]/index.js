import {useRouter} from "next/router";
import {useState} from "react";
import {ButtonHelp} from "../../../components/atom/Button";
import {gs, pri, warning} from "../../../components/atom/Color";
import {DividerSection} from "../../../components/atom/Divider";
import {HtmlPage} from "../../../components/atom/HtmlPage";
import Icon, {GoShock} from "../../../components/atom/Icon";
import {BoxCouponCard} from "../../../components/molecule/Box";
import {FooterImage} from "../../../components/molecule/Footer";
import {HeaderMain} from "../../../components/molecule/Header";
import {
	ModalDigitalPrize,
	ModalPhysicalPrize,
} from "../../../components/molecule/Modal";
import {handleTimestamp} from "../../../lib/function";

export default function GoShockPage() {
	const {push, query} = useRouter();
	const {token} = query;

	const [chance, setChance] = useState(2);
	const [resetGoshock, setResetGoshock] = useState(false);

	const [physicalPrize, setPhysicalPrize] = useState(false);
	const [digitalPrize, setDigitalPrize] = useState(false);

	const [prizes, setPrizes] = useState([]);

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
			isBlack
		>
			{/* Modal */}
			<ModalPhysicalPrize
				open={physicalPrize}
				onClose={() => setPhysicalPrize(false)}
				prizeName="iPhone 13"
				onSend={handleSendPhysicalPrize}
			/>

			<ModalDigitalPrize
				open={digitalPrize}
				onClose={() => setDigitalPrize(false)}
				prizeName="OVO 30.000"
				onSend={handleSendDigitalPrize}
			/>

			{/* Main */}
			<HeaderMain logo="white" />

			<div className="text-center m-3">
				{chance && (
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
						{chance} x
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

			{chance !== 0 && (
				<BoxCouponCard
					onClick={() =>
						chance < 2
							? setDigitalPrize(true)
							: setPhysicalPrize(true)
					}
					reset={resetGoshock}
				/>
			)}

			{prizes.length !== 0 && (
				<>
					<DividerSection
						title="Hadiah Anda"
						color={gs.white}
						className="m-3"
					/>

					{/* Cards */}
					<section className="m-3 d-flex flex-column gap-3">
						{prizes.map((prize, key) => (
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
									push(`/goshock/${token}/${prize.id}`)
								}
							>
								<header className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<Icon
											icon="box_open"
											size={24}
											fill={warning.main}
										/>
										<p className="ms-2 --f-normal-bold">
											{prize.name}
										</p>
									</div>

									<p
										className="--f-semismall-regular"
										style={{color: gs.gray}}
									>
										ID: {prize.id}
									</p>
								</header>

								<div className="mt-2">
									<p
										className="--f-small-regular lh-base"
										style={{color: gs.gray}}
									>
										Dikirim ke:{" "}
										<span style={{color: gs.black}}>
											{prize.type === "physical"
												? prize.address
												: prize.phone_number}
										</span>
									</p>

									<p
										className="--f-small-regular lh-base mt-1"
										style={{color: gs.gray}}
									>
										Pada:{" "}
										<span style={{color: gs.black}}>
											{
												handleTimestamp(prize.timestamp)
													.dateAndTime
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
