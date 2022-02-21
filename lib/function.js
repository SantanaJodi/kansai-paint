import {format} from "date-fns";

// Handle Timestamp
export const handleTimestamp = (epoch = 0) =>
	epoch && {
		date: format(epoch, "dd MMM, yyyy"),
		time: format(epoch, "HH:mm"),
		dateAndTime: format(epoch, "dd MMM, yyyy - HH:mm"),
	};

// export const baseUrl = "https://kansai-test.motict.com";
export const baseUrl = "http://localhost:3000";
