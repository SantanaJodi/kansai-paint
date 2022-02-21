import nextConnect from "next-connect";
import multer from "multer";
import axios from "axios";
import path from "path";
import FormData from "form-data";
import fs from "fs";

export default function (req, res) {
	const {receipt, products, token} = req.body;

	console.log(req.body);
}

// const upload = multer({
// 	storage: multer.diskStorage({
// 		destination: "./public/uploads",
// 		filename: (req, file, cb) => cb(null, file.originalname),
// 	}),
// });

// const apiRoute = nextConnect({
// 	onNoMatch(req, res) {
// 		res.status(405).json({error: `Method ${req.method} Not Allowed`});
// 	},
// });

// const uploadMiddleware = upload.array("theFiles");

// apiRoute.use(uploadMiddleware);

// apiRoute.post((req, res) => {
// 	res.status(200).json({data: "success"});
// });

// export default apiRoute;

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// export default function handler(req, res) {
// 	console.log(req.body.receipt);
// 	console.log(req.body.products);

// 	var receiptFile = blobToFile(req.body.receipt.file, req.body.receipt.name);
// 	var productsFile = blobToFile(
// 		req.body.products.file,
// 		req.body.products.name
// 	);

// 	console.log(receiptFile);
// 	console.log(productsFile);

// 	data.append("receipt", fs.createReadStream(receiptFile.name));
// 	data.append("product", fs.createReadStream(productsFile.name));

// 	var config = {
// 		method: "post",
// 		url: "https://kansai-test.motict.com/microsite/receipts",
// 		headers: {
// 			Authorization: "KzYyODIyMTExMTIzNTg=",
// 			...data.getHeaders(),
// 		},
// 		data: data,
// 	};

// 	axios(config)
// 		.then(function (response) {
// 			res.status(200).json(response.data);
// 			console.log(JSON.stringify(response.data));
// 		})
// 		.catch(function (error) {
// 			res.send(error);
// 			console.log(error);
// 		});
// }

// function blobToFile(theBlob, fileName) {
// 	theBlob.lastModifiedDate = new Date();
// 	theBlob.name = fileName;
// 	return theBlob;
// }
