import axios from "axios";

export default async function (req, res) {
	const {authorization} = req.headers;
	const {id} = req.query;

	var config = {
		method: "get",
		url: `https://kansai-test.motict.com/microsite/coupons/rewards/${id}`,
		headers: {
			authorization,
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
