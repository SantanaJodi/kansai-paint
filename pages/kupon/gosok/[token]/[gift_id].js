import {useRouter} from "next/router";
import useSWR from "swr";
import {ButtonHelp} from "../../../../components/atom/Button";
import {gs, warning} from "../../../../components/atom/Color";
import {HtmlPage} from "../../../../components/atom/HtmlPage";
import Icon from "../../../../components/atom/Icon";
import {FooterImage} from "../../../../components/molecule/Footer";
import {HeaderChild} from "../../../../components/molecule/Header";
import {getData} from "../../../../lib/fetcher";
import {handleTimestamp} from "../../../../lib/function";

export default function GiftDetail() {
	const {query, back} = useRouter();
	const {gift_id, token} = query;

	const {data: payload} = useSWR([`/api/rewards/${gift_id}`, token], getData);
	const {data} = payload || {};

	return (
		<HtmlPage
			title="Detail Hadiah"
			desc="Detail hadiah kamu dari hasil GOSHOCK di Kansai"
			background="linear-gradient(180deg, #003494 0%, #001954 100%)"
		>
			<HeaderChild title="Detail Hadiah" onBack={() => back()} />

			<section className="d-flex align-items-center justify-content-between">
				<img
					src="/image/vector/Confeti Left.svg"
					alt="Confetti Left"
					height={76}
					width={69}
				/>

				<div className="d-flex flex-column align-items-center lh-base">
					<Icon icon="box_open" fill={warning.main} size={24} />
					<p
						className="--f-normal-regular text-center"
						style={{color: gs.white}}
					>
						Selamat! Anda mendapatkan
					</p>
					<p
						className="--f-normal-bold"
						style={{color: warning.main}}
					>
						{data?.reward.name}
					</p>
				</div>

				<img
					src="/image/vector/Confeti Right.svg"
					alt="Confetti Right"
					height={76}
					width={69}
				/>
			</section>

			<section className="m-3">
				<div className="mt-4">
					<p
						className="--f-semismall-regular lh-base"
						style={{color: gs.gray}}
					>
						Nomor ID Hadiah
					</p>
					<p
						className="--f-normal-bold lh-base mt-2"
						style={{color: gs.white}}
					>
						{data?.reward.id}
					</p>
				</div>

				<div className="mt-4">
					<p
						className="--f-semismall-regular lh-base"
						style={{color: gs.gray}}
					>
						Hadiah Ini dikirimkan ke
					</p>
					<p
						className="--f-normal-bold lh-base mt-2"
						style={{color: warning.main}}
					>
						{data?.reward.send_to}
					</p>
					<p
						className="--f-semismall-regular lh-base mt-2"
						style={{color: gs.white}}
					>
						Pada{" "}
						{handleTimestamp(data?.reward.claim_time).dateAndTime}
					</p>
				</div>

				<div className="mt-4">
					<p
						className="--f-semismall-regular lh-base"
						style={{color: gs.gray}}
					>
						Hadiah Ini didapatkan dari
					</p>

					<div className="d-flex gap-3 mt-2">
						<img
							style={{
								height: "25vw",
								maxHeight: 720 / 4,
								objectFit: "cover",
								width: "100%",
								borderRadius: 8,
							}}
							alt="Receipt Image"
							src={data?.receipt.items[0].image_link}
						/>

						<img
							style={{
								height: "25vw",
								maxHeight: 720 / 4,
								objectFit: "cover",
								width: "100%",
								borderRadius: 8,
							}}
							alt="Receipt Image"
							src={data?.receipt.items[0].image_link}
						/>
					</div>

					<p
						className="--f-semismall-regular lh-base mt-2"
						style={{color: gs.white}}
					>
						Diupload pada{" "}
						{handleTimestamp(data?.receipt.upload_time).dateAndTime}
					</p>
				</div>
			</section>

			<FooterImage size="small" />
			<ButtonHelp onClick={() => console.log("need help")} />
		</HtmlPage>
	);
}
