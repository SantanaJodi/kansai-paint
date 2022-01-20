import {useState} from "react";
import {gs, warning} from "../../components/atom/Color";
import {HtmlPage} from "../../components/atom/HtmlPage";
import Icon, {GoShock} from "../../components/atom/Icon";
import {BoxCouponCard} from "../../components/molecule/Box";
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

			<BoxCouponCard />

			<FooterImage size="big" />
		</HtmlPage>
	);
}
