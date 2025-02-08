import css from "./ImageGallery.module.css";
import ImageCard from "../imageCard/ImageCard";
import { forwardRef } from "react";

const ImageGallery = forwardRef((props, ref) => {
	return (
		<ul className={css.galleryContainer} ref={ref}>
			{props.images.map((image) => {
				return (
					<li key={image.id}>
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
