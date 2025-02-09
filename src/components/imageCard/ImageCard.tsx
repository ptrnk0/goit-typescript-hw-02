import css from "./ImageCard.module.css";
import { Props } from "./ImageCard.types";

const ImageCard = ({ image, onOpenModal }: Props) => {
	return (
		<div className={css.imageCardContainer}>
			<img
				onClick={() => onOpenModal(image)}
				src={image?.urls.small}
				alt={image?.description}
				className={css.imageCardImg}
			/>
			<div className={css.userInfo}>
				<img
					src={image?.user.profile_image.medium}
					alt={image?.user.first_name}
				/>
				<p>
					{image?.user.first_name} {image?.user.last_name}
				</p>
			</div>
		</div>
	);
};

export default ImageCard;
