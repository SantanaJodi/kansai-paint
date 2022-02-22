// import nextConnect from "next-connect";
// import multer from "multer";
// import axios from "axios";
// import path from "path";
// import FormData from "form-data";
// import fs from "fs";
// var formidable = require("formidable"),
//     http = require("http"),
//     util = require("util");
// var multiparty = require("multiparty");

// export default function (req, res) {
//     // console.log(req.body);
//     // let productURL = fetch(req.body.products.url).then((r) => r.blob());
//     // console.log(productURL);
//     // console.log(req.body.product);
//     // const receiptFile = multer().single("receipt");
//     // const productFile = multer().single("product");

//     // receiptFile(req, res, function (err) {
//     //     if (err instanceof multer.MulterError) {
//     //         // A Multer error occurred when uploading.
//     //     } else if (err) {
//     //         // An unknown error occurred when uploading.
//     //     }

//     //     // Everything went fine.
//     //     console.log(req.file);
//     // });

//     // console.log(receiptFile)
//     // console.log(productFile)
//     // res.send(200).json({ status: "success" });
//     // console.log(req.file);
//     // var form = new multiparty.Form();

//     // form.parse(req, function (err, fields, files) {
//     //     // res.writeHead(200, { "content-type": "text/plain" });
//     //     // res.write("received upload:\n\n");
//     //     res.end(util.inspect({ fields: fields, files: files }));
//     // });

//     // res.writeHead(200, { "content-type": "text/html" });
//     // res.end(
//     //     '<form action="/upload" enctype="multipart/form-data" method="post">' +
//     //         '<input type="text" name="title"><br>' +
//     //         '<input type="file" name="upload" multiple="multiple"><br>' +
//     //         '<input type="submit" value="Upload">' +
//     //         "</form>"
//     // );
//     // var form = new formidable.IncomingForm();

//     // // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.

//     // form.parse(req, function (err, fields, files) {
//     //     console.log(req);
//     //     if (err) {
//     //         // Check for and handle any errors here.

//     //         console.error(err.message);
//     //         return;
//     //     }
//     //     res.writeHead(200, { "content-type": "text/plain" });
//     //     res.write("received upload:\n\n");

//     //     // This last line responds to the form submission with a list of the parsed data and files.

//     //     res.end(util.inspect({ fields: fields, files: files }));
//     // });
//     // var fileReceipt = URL.revokeObjectURL(req.body.receipt.url);
//     // console.log(fileReceipt);
//     // console.log(req.body);
//     // var fileData = dataURLtoFile(req.body.receipt.url, "imageName.jpg");
//     // var fileData = dataURItoBlob(req.body.receipt.url)
//     // console.log("Here is JavaScript File Object", fileData);
//     // let url =
//     //     "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg";
//     // const toDataURL = (url) =>
//     //     fetch(url)
//     //         .then((response) => response.blob())
//     //         .then(
//     //             (blob) =>
//     //                 new Promise((resolve, reject) => {
//     //                     const reader = new FileReader();
//     //                     reader.onloadend = () => resolve(reader.result);
//     //                     reader.onerror = reject;
//     //                     reader.readAsDataURL(blob);
//     //                 })
//     //         );

//     // toDataURL(url).then((dataUrl) => {
//     //     console.log("Here is Base64 Url", dataUrl);
//     //     var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
//     //     console.log("Here is JavaScript File Object", fileData);
//     //     fileArr.push(fileData);
//     // });
//     // var myFile = blobToFile(req.body.products.url, req.body.products.name);
//     // let blob = fetch(req.body.products.url).then((r) => r.blob());
//     // console.log(blob);

//     // console.log(req.files.product);

//     // console.log(req.headers.authorization);
//     // var formData = new FormData();
//     // formData.append("product", req.body.product);
//     // formData.append("receipt", req.body.receipt);

//     // axios
//     //     .post("https://kansai-test.motict.com/microsite/receipts", formData, {
//     //         headers: {
//     //             "Content-Type": "multipart/form-data",
//     //             Authorization: req.headers.authorization,
//     //         },
//     //     })
//     //     .then(function (response) {
//     //         console.log(response);
//     //     })
//     //     .catch(function (error) {
//     //         console.log(error);
//     //     });
//     // const { receipt, products, token } = req.body;
//     // var data = new FormData();
//     // // console.log(req.body);
//     // // console.log(req.headers);
//     // data.append("receipt", fs.createReadStream(req.body.receipt));
//     // data.append("product", fs.createReadStream(req.body.product));

//     // var config = {
//     //     method: "post",
//     //     url: "https://kansai-test.motict.com/microsite/receipts",
//     //     headers: {
//     //         Authorization: req.body.token,
//     //         ...data.getHeaders(),
//     //     },
//     //     data: data,
//     // };

//     // axios(config)
//     //     .then(function (response) {
//     //         res.status(200).json(response.data);
//     //         console.log(JSON.stringify(response.data));
//     //     })
//     //     .catch(function (error) {
//     //         res.send(error);
//     //         console.log(error);
//     //     });
// }
// // }

// // const upload = multer({
// // 	storage: multer.diskStorage({
// // 		destination: "./public/uploads",
// // 		filename: (req, file, cb) => cb(null, file.originalname),
// // 	}),
// // });

// // const apiRoute = nextConnect({
// // 	onNoMatch(req, res) {
// // 		res.status(405).json({error: `Method ${req.method} Not Allowed`});
// // 	},
// // });

// // const uploadMiddleware = upload.array("theFiles");

// // apiRoute.use(uploadMiddleware);

// // apiRoute.post((req, res) => {
// // 	res.status(200).json({data: "success"});
// // });

// // export default apiRoute;

// // export const config = {
// // 	api: {
// // 		bodyParser: false,
// // 	},
// // };

// // export default function handler(req, res) {
// // 	console.log(req.body.receipt);
// // 	console.log(req.body.products);

// // 	var receiptFile = blobToFile(req.body.receipt.file, req.body.receipt.name);
// // 	var productsFile = blobToFile(
// // 		req.body.products.file,
// // 		req.body.products.name
// // 	);

// // 	console.log(receiptFile);
// // 	console.log(productsFile);

// // 	data.append("receipt", fs.createReadStream(receiptFile.name));
// // 	data.append("product", fs.createReadStream(productsFile.name));

// // 	var config = {
// // 		method: "post",
// // 		url: "https://kansai-test.motict.com/microsite/receipts",
// // 		headers: {
// // 			Authorization: "KzYyODIyMTExMTIzNTg=",
// // 			...data.getHeaders(),
// // 		},
// // 		data: data,
// // 	};

// // 	axios(config)
// // 		.then(function (response) {
// // 			res.status(200).json(response.data);
// // 			console.log(JSON.stringify(response.data));
// // 		})
// // 		.catch(function (error) {
// // 			res.send(error);
// // 			console.log(error);
// // 		});
// // }

// // function blobToFile(theBlob, fileName) {
// //     theBlob.lastModifiedDate = new Date();
// //     theBlob.name = fileName;
// //     return theBlob;
// // }

// // function dataURLtoFile(dataurl, filename) {
// //     var arr = dataurl.split(","),
// //         mime = arr[0].match(/:(.*?);/)[1],
// //         bstr = atob(arr[1]),
// //         n = bstr.length,
// //         u8arr = new Uint8Array(n);
// //     while (n--) {
// //         u8arr[n] = bstr.charCodeAt(n);
// //     }
// //     return new File([u8arr], filename, { type: mime });
// // }

// // function dataURItoBlob(dataURI) {
// //     // convert base64 to raw binary data held in a string
// //     // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
// //     var byteString = atob(dataURI.split(',')[1]);

// //     // separate out the mime component
// //     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

// //     // write the bytes of the string to an ArrayBuffer
// //     var ab = new ArrayBuffer(byteString.length);
// //     var ia = new Uint8Array(ab);
// //     for (var i = 0; i < byteString.length; i++) {
// //         ia[i] = byteString.charCodeAt(i);
// //     }

// //     //Old Code
// //     //write the ArrayBuffer to a blob, and you're done
// //     //var bb = new BlobBuilder();
// //     //bb.append(ab);
// //     //return bb.getBlob(mimeString);

// //     //New Code
// //     return new Blob([ab], {type: mimeString});

// // }
import middleware from "../middleware/middleware";
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
            console.log(error);
        });
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
