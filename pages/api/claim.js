import axios from "axios";

export default async function handler(req, res) {
	const {authorization} = req.headers;
	const {reward} = req.body;

	var config = {
		method: "post",
		url: `${process.env.API_URL}/microsite/coupons/rewards/claim`,
		headers: {
			authorization,
			"Content-Type": "application/json",
		},
		data: {
			reward,
		},
	};

	const {data} = await axios(config);
	res.send(data);
}
