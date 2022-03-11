import { pri } from "../components/atom/Color";
import { HtmlPage } from "../components/atom/HtmlPage";
import { FooterGraphic } from "../components/molecule/Footer";

function ServerError({ errorStatus }) {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center h-100">
			<p style={{ fontSize: 50, color: pri.main, fontWeight: "bold" }}>
				{errorStatus}
			</p>
			<p className="--f-normal-regular lh-base">
				{errorStatus == 404
					? "Halaman tidak ditemukan"
					: "Terjadi kesalahan pada sistem"}
			</p>
		</div>
	);
}

function ClientError() {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center h-100">
			<p style={{ fontSize: 50, color: pri.main, fontWeight: "bold" }}>
				Mohon Maaf
			</p>
			<p className="--f-normal-regular lh-base">
				Sepertinya kami telah menemukan kesalahan. Kami akan segera
				memperbaikinya.
			</p>
		</div>
	);
}

function Error({ statusCode }) {
	return (
		<HtmlPage title={`Error ${statusCode}`} desc={`Error ${statusCode}`}>
			{statusCode ? <ServerError errorStatus={statusCode} /> : <ClientError />}

			<FooterGraphic size="big" />
		</HtmlPage>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
