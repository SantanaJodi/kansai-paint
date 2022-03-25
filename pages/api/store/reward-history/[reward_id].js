import axios from "axios";

export default async function handler(req, res) {
	const { authorization } = req.headers;
	const { reward_id } = req.query;

	var config = {
		method: "get",
		url: `${process.env.API_URL}/microsite/points/histories/${reward_id}`,
		headers: {
			authorization,
		},
	};

	const { data } = await axios(config);
	res.send(data);
}
