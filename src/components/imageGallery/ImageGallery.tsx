import css from "./ImageGallery.module.css";
import ImageCard from "../imageCard/ImageCard";
import { forwardRef } from "react";
import { Props } from "./ImageGallery.types";

const ImageGallery = forwardRef<HTMLUListElement, Props>((props, ref) => {
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
