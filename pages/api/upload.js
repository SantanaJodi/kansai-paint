import middleware from "./middleware/middleware";
import nextConnect from "next-connect";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
	var formData = new FormData();
	formData.append("receipt", fs.createReadStream(req.files.receipt[0].path));
	formData.append("product", fs.createReadStream(req.files.product[0].path));

	var config = {
		method: "post",
		url: "https://kansai-test.motict.com/microsite/receipts",
		headers: {
			Authorization: req.headers.authorization,
			...formData.getHeaders(),
		},
		data: formData,
	};

	const {data} = await axios(config);
	res.send(data);
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
