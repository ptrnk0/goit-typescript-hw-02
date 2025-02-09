import { Image } from "../../services/unsplashApi.types";

export type Props = {
	image: Image;
	onCloseModal: () => void;
	value: boolean;
};
