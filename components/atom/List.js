import Image from "next/image";
import {useMemo} from "react";
import {pri, warning} from "./Color";
import {TagDefault} from "./Tag";

export function ListUploadedImage({data, className, type}) {
	const handleType = useMemo(() => {
		switch (type) {
			case "receipt":
				return {
					backgroundColor: pri.light,
					color: pri.main,
					title: "Struk",
				};
			case "item":
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
			<Image
				height={56}
				width={56}
				src={data.url}
				objectFit="cover"
				className="rounded-3"
				alt={data.name}
			/>

			<div className="ms-3">
				<TagDefault
					title={title}
					backgroundColor={backgroundColor}
					color={color}
				/>
				<p className="--f-semismall-regular mt-1 lh-base">
					{data?.name}
				</p>
			</div>
		</div>
	);
}
