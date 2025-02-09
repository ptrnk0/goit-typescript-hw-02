import { Images, Image } from "../../services/unsplashApi.types";

export type Props = {
	images: Images;
	onOpenModal: (image: Image) => void;
};
