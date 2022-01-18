import {BottomSheet} from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import {HeaderBottomsheet} from "./Header";

export function BottomsheetUploadReceiptAndItem({open, onDismiss}) {
	return (
		<BottomSheet
			open={open}
			onDismiss={onDismiss}
			snapPoints={({minHeight, maxHeight}) => [minHeight, maxHeight]}
			defaultSnap={({lastSnap, snapPoints}) =>
				lastSnap && Math.min(...snapPoints)
			}
			expandOnContentDrag
		>
			<HeaderBottomsheet
				title="Upload Foto Struk &amp; Barang"
				onClose={onDismiss}
			/>

			<p>
				A more elaborate example that showcases how snap points work. It
				also shows how it behaves if you want it to be open by default,
				and not closable. Notice how it responds if you resize the
				window, or scroll to the bottom and starts adjusting the height
				of the sheet without scrolling back up first.
			</p>
		</BottomSheet>
	);
}
