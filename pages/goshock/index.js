import {useState} from "react";
import {gs, warning} from "../../components/atom/Color";
import {HtmlPage} from "../../components/atom/HtmlPage";
import Icon, {GoShock} from "../../components/atom/Icon";
import {FooterImage} from "../../components/molecule/Footer";
import {HeaderMain} from "../../components/molecule/Header";

export default function GoShockPage() {
	const [count, setCount] = useState(2);

	return (
		<HtmlPage
			title="GoShock | Kansai Paint"
			desc="Gosok kuponnya dan menangkan berbagai macam hadiah menarik"
			isBlack
		>
			{/* Main */}
			<HeaderMain logo="white" />

			<div className="text-center m-3">
				<p
					className="--f-normal-bold lh-base"
					style={{color: gs.white}}
				>
					Selamat!
				</p>
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
						{count} x
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

			{/* Coupon Card */}
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
						className="d-flex align-items-center p-2 pe-3"
					>
						<img
							alt="Kansai GOSHOCK Ticker"
							src="/image/pixel/Scratch Gift.png"
							width="100%"
						/>
					</div>

					<img
						alt="Kansai GOSHOCK Ticker"
						src="/image/vector/Ticket.svg"
						style={{width: "100%", maxWidth: 328}}
					/>
				</div>
			</div>

			<FooterImage size="big" />
		</HtmlPage>
	);
}
