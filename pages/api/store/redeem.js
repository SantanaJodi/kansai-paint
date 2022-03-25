import axios from "axios";

export default async function handler(req, res) {
	const { authorization } = req.headers;
	const { reward } = req.body;

	var config = {
		method: "post",
		url: `${process.env.API_URL}/microsite/points/rewards/redeem`,
		headers: {
			authorization,
		},
		data: {
			reward,
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
