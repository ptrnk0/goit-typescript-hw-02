export type Image = {
	id: string;
	urls: {
		small: string;
	};
	description: string;
	user: {
		profile_image: {
			medium: string;
		};
		first_name: string;
		last_name: string;
	};
} | null;

export type Images = Image[];

export type ApiResponse = {
	results: Images;
	total: number;
	total_pages: number;
};
