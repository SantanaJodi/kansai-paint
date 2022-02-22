import middleware from "./middleware/middleware";
import nextConnect from "next-connect";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
	var data = new FormData();
	data.append("receipt", fs.createReadStream(req.files.receipt[0].path));
	data.append("product", fs.createReadStream(req.files.product[0].path));

	var config = {
		method: "post",
		url: "https://kansai-test.motict.com/microsite/receipts",
		headers: {
			Authorization: req.headers.authorization,
			...data.getHeaders(),
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			res.send(error);
		});
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
