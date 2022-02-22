import Image from "next/image";
import {useMemo} from "react";
import {pri, warning} from "./Color";
import {TagDefault} from "./Tag";

export function ListUploadedImage({data, name, className, type}) {
	const handleType = useMemo(() => {
		switch (type) {
			case "receipt":
				return {
					backgroundColor: pri.light,
					color: pri.main,
					title: "Struk",
				};
			case "product":
				return {
					backgroundColor: warning.light,
					color: warning.main,
					title: "Barang",
				};
		}
	}, [type]);

	const {backgroundColor, color, title} = handleType;

	return (
		<div className={`d-flex align-items-center ${className}`}>
			<img
				height={56}
				width={56}
				src={data}
				style={{objectFit: "cover"}}
				className="rounded-3"
				alt={data}
			/>

			<TagDefault
				title={title}
				backgroundColor={backgroundColor}
				color={color}
				className="ms-2"
			/>
		</div>
	);
}
