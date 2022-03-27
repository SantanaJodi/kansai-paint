import { useRouter } from "next/router";
import useSWR from "swr";
import { ButtonHelp } from "../../../../../components/atom/Button";
import { gs, pri, warning } from "../../../../../components/atom/Color";
import { HtmlPage } from "../../../../../components/atom/HtmlPage";
import { FooterGraphic } from "../../../../../components/molecule/Footer";
import { HeaderChild } from "../../../../../components/molecule/Header";
import { getData } from "../../../../../lib/fetcher";
import { handleTimestamp } from "../../../../../lib/function";

export default function GiftDetail() {
	const { push, query } = useRouter();
	const { token, redeem_id } = query;

	const { data: payLoad } = useSWR(
		token ? [`/api/store/reward-history/${redeem_id}`, token] : null,
		getData
	);
	const { data } = payLoad || {};
	const { reward } = data || {};

	return (
		<HtmlPage
			title="Detail Hadiah | Kansai Paint"
			desc="Tukar poin yang sudah Anda kumpulkan dengan hadiah menarik dari Kansai Paint"
			background={pri.dark}
		>
			<HeaderChild
				onBack={() => push(`/poin/hadiah/list/${token}`)}
				title="Detail Hadiah"
			/>

			<div className="d-flex align-items-center m-3">
				<img
					alt={reward?.name}
					src={reward?.image_link}
					height={64}
					width={64}
					style={{ borderRadius: 4, objectFit: "cover" }}
				/>

				<div className="ms-3">
					<p className="--f-normal-bold lh-base" style={{ color: gs.white }}>
						{reward?.name}
					</p>

					<div className="d-flex align-items-center">
						<img
							src="/image/pixel/Coin.png"
							height={16}
							width={16}
							alt="Kansai Points"
						/>
						<p
							className="--f-semismall-semibold lh-base ms-2"
							style={{ color: warning.main }}
						>
							{reward?.allocated_point} points
						</p>
					</div>
				</div>
			</div>

			<div className="m-3">
				<p className="--f-semismall-regular lh-base" style={{ color: gs.gray }}>
					ID Hadiah
				</p>
				<p className="--f-normal-bold lh-base" style={{ color: gs.white }}>
					{reward?.id}
				</p>
			</div>

			<div className="m-3">
				<p className="--f-semismall-regular lh-base" style={{ color: gs.gray }}>
					Hadiah ini dikirimkan ke
				</p>
				<p className="--f-normal-bold lh-base mt-1" style={{ color: gs.white }}>
					{reward?.send_to}
				</p>
				<p
					className="--f-semismall-regular lh-base mt-1"
					style={{ color: gs.gray }}
				>
					Pada {handleTimestamp(reward?.claim_time).dateAndTime}
				</p>
			</div>

			<ButtonHelp />

			<FooterGraphic size="small" />
		</HtmlPage>
	);
}
