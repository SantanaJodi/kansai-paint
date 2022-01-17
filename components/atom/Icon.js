import Add from "../../public/icon/Add.svg";
import ArrowBack from "../../public/icon/Arrow Back.svg";
import BoxOpen from "../../public/icon/Box Open.svg";
import Check from "../../public/icon/Check.svg";
import Gift from "../../public/icon/Gift.svg";
import Info from "../../public/icon/Info.svg";
import PaperPlane from "../../public/icon/Paper Plane.svg";
import Phone from "../../public/icon/Phone.svg";
import Scratch from "../../public/icon/Scratch.svg";
import Ticket from "../../public/icon/Ticket.svg";
import Trash from "../../public/icon/Trash.svg";
import WhatsApp from "../../public/icon/WhatsApp.svg";
import X from "../../public/icon/X.svg";

const customIcon = (fill, size) => ({
	add: <Add fill={fill} size={size} width={size} />,
	arrow_back: <ArrowBack fill={fill} size={size} width={size} />,
	box_open: <BoxOpen fill={fill} size={size} width={size} />,
	check: <Check fill={fill} size={size} width={size} />,
	gift: <Gift fill={fill} size={size} width={size} />,
	info: <Info fill={fill} size={size} width={size} />,
	paper_plane: <PaperPlane fill={fill} size={size} width={size} />,
	phone: <Phone fill={fill} size={size} width={size} />,
	scratch: <Scratch fill={fill} size={size} width={size} />,
	ticket: <Ticket fill={fill} size={size} width={size} />,
	trash: <Trash fill={fill} size={size} width={size} />,
	whatsapp: <WhatsApp fill={fill} size={size} width={size} />,
	x: <X fill={fill} size={size} width={size} />,
});

export default function Icon({fill, size, icon, style, onClick, className}) {
	return (
		<span
			style={{...style, cursor: onClick && "pointer"}}
			className={className}
			onClick={onClick}
		>
			{customIcon(fill, size)[icon]}
		</span>
	);
}
