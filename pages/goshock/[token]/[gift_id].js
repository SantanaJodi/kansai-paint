import {useRouter} from "next/router";
import {ButtonHelp} from "../../../components/atom/Button";
import {gs, warning} from "../../../components/atom/Color";
import {HtmlPage} from "../../../components/atom/HtmlPage";
import Icon from "../../../components/atom/Icon";
import {Image} from "../../../components/atom/Image";
import {FooterImage} from "../../../components/molecule/Footer";
import {HeaderChild} from "../../../components/molecule/Header";
import {handleTimestamp} from "../../../lib/function";

export default function GiftDetail() {
	const {query, back} = useRouter();
	const {gift_id} = query;

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
						iPhone 14
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
						{gift_id}
					</p>
				</div>

				<div className="mt-4">
					<p
						className="--f-semismall-regular lh-base"
						style={{color: gs.gray}}
					>
						Hadiah Ini dikirimkan ke alamat
					</p>
					<p
						className="--f-normal-bold lh-base mt-2"
						style={{color: gs.white}}
					>
						Jl. Nama Jalan RT 01/RW 02, Nama Desa, Nama Kabupaten,
						Nama Provinsi
					</p>
					<p
						className="--f-semismall-regular lh-base mt-2"
						style={{color: gs.white}}
					>
						Pada {handleTimestamp(Date.now()).dateAndTime}
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
						<Image
							style={{
								height: "25vw",
								maxHeight: 720 / 4,
								width: "100%",
							}}
							alt="Receipt Image"
							src="https://images.unsplash.com/photo-1623123096729-26b481292919?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
						/>

						<Image
							style={{
								height: "25vw",
								maxHeight: 720 / 4,
								width: "100%",
							}}
							alt="Receipt Image"
							src="https://images.unsplash.com/photo-1586527484765-979a20639316?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
						/>
					</div>

					<p
						className="--f-semismall-regular lh-base mt-2"
						style={{color: gs.white}}
					>
						Diupload pada {handleTimestamp(Date.now()).dateAndTime}
					</p>
				</div>
			</section>

			<FooterImage size="small" />
			<ButtonHelp onClick={() => console.log("need help")} />
		</HtmlPage>
	);
}
