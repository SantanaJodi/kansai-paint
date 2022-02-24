import axios from "axios";

export default async function handler(req, res) {
	const {authorization} = req.headers;

	var config = {
		method: "get",
		url: `${process.env.API_URL}/microsite/coupons/rewards`,
		headers: {
			authorization,
		},
	};

	const {data} = await axios(config);
	res.send(data);
}
