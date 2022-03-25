import axios from "axios";

export default async function handler(req, res) {
	const { authorization } = req.headers;

	var config = {
		method: "get",
		url: `${process.env.API_URL}//microsite/points/histories`,
		headers: {
			authorization,
		},
	};

	try {
		const { data } = await axios(config);
		res.status(200).send(data);
		res.end();
	} catch {
		res.status(403);
		res.end();
	}
}
