import {useMemo} from "react";
import {danger, gs, success} from "./Color";

export function TagDefault({backgroundColor, color, title, className, style}) {
	return (
		<div
			className={`px-2 py-1 d-inline-flex align-items-center justify-content-center ${className}`}
			style={{borderRadius: 100, backgroundColor, ...style}}
		>
			<p className="--f-small-regular" style={{color}}>
				{title}
			</p>
		</div>
	);
}

export function TagStatus({status, className, style}) {
	const handleStatus = useMemo(() => {
		switch (status) {
			case "on_process":
				return {
					title: "Diproses",
					backgroundColor: gs.soft,
					color: gs.gray,
				};
			case "success":
				return {
					title: "Sukses",
					backgroundColor: success.light,
					color: success.main,
				};
			case "denied":
				return {
					title: "Sukses",
					backgroundColor: danger.light,
					color: danger.main,
				};
		}
	}, [status]);

	const {title, backgroundColor, color} = handleStatus;

	return (
		<div
			className={`px-2 py-1 d-flex align-items-center justify-content-center ${className}`}
			style={{borderRadius: 100, backgroundColor, ...style}}
		>
			<p className="--f-small-regular" style={{color}}>
				Status Validasi: {title}
			</p>
		</div>
	);
}
