import axios from "axios";

export default async function handler(req, res) {
	const {authorization} = req.headers;

	var config = {
		method: "get",
		url: `${process.env.API_URL}/microsite/coupons/rewards/scretch`,
		headers: {
			Authorization: authorization,
		},
	};

	await axios(config)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			res.send(error);
		});
}
