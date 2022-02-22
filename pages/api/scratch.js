import axios from "axios";

export default function (req, res) {
	const {authorization} = req.headers;

	var config = {
		method: "get",
		url: "https://kansai-test.motict.com/microsite/coupons/rewards/scretch",
		headers: {
			Authorization: authorization,
		},
	};

	axios(config)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			res.send(error);
		});
}
