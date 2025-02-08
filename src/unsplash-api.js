import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Authorization"] = `Client-ID ${apiKey}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

const getImages = async (query, page = 1) => {
	const response = await axios.get(`/search/photos`, {
		params: {
			query,
			page,
			per_page: 12,
		},
	});

	return response.data;
};

export default getImages;
