import axios from "axios";

export default async function (req, res) {
	const {authorization} = req.headers;

	var config = {
		method: "get",
		url: "https://kansai-test.motict.com/microsite/receipts",
		headers: {
			authorization,
		},
	};

	const {data} = await axios(config);
	res.send(data);
}
