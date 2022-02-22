import axios from "axios";

export default async function handler(req, res) {
	const {authorization} = req.headers;
	const {id} = req.query;

	var config = {
		method: "get",
		url: `https://kansai-test.motict.com/microsite/coupons/rewards/${id}`,
		headers: {
			authorization,
		},
	};

	const {data} = await axios(config);
	res.send(data);
}
