import Lottie from "react-lottie-player";
import Loading from "../../public/animation/Loading White.json";
import {gs} from "./Color";

export function LoadingLine({className}) {
	return (
		<div className={`${className} d-flex align-items-center`}>
			<Lottie
				loop
				animationData={Loading}
				play
				style={{
					width: 24,
					height: 24,
				}}
			/>
			<p className="--f-normal-semibold" style={{color: gs.white}}>
				Memuat...
			</p>
		</div>
	);
}
