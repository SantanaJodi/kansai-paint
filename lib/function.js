import {format} from "date-fns";

// Handle Timestamp
export const handleTimestamp = (date = 0) => {
	const epoch = new Date(date).getTime();

	return {
		date: format(epoch, "dd MMM, yyyy"),
		time: format(epoch, "HH:mm"),
		dateAndTime: format(epoch, "dd MMM, yyyy - HH:mm"),
	};
};

export const baseUrl = "https://kansai-test.motict.com";
