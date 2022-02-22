import axios from "axios";

export async function getData(url, token) {
	const res = await axios.get(url, {
		headers: {
			Authorization: token,
		},
	});

	const data = await res.data;

	return data;
}
