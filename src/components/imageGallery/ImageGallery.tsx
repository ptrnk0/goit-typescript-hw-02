import css from "./ImageGallery.module.css";
import ImageCard from "../imageCard/ImageCard";
import { forwardRef } from "react";
import { Image, Images } from "../../services/unsplashApi.types";

type Props = {
	images: Images
	onOpenModal: (image: Image) => void
}

const ImageGallery = forwardRef((props: Props, ref) => {
	return (
		<ul className={css.galleryContainer} ref={ref}>
			{props.images.map((image) => {
				return (
					<li key={image?.id}>
						<ImageCard
							image={image}
							onOpenModal={props.onOpenModal}
						/>
					</li>
				);
			})}
		</ul>
	);
});

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
