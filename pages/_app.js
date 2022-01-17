import "../styles/reset.css";
import "../styles/globals.css";
import {GlobalState} from "../components/atom/Context";

function MyApp({Component, pageProps}) {
	return (
		<GlobalState>
			<Component {...pageProps} />;
		</GlobalState>
	);
}

export default MyApp;
