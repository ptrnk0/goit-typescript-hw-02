import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { Props } from "./ImageModal.types";

Modal.setAppElement("#root");

const ImageModal = ({ image, onCloseModal, value }: Props) => {
	if (!image) return null;
	
	return (
		<Modal
			isOpen={value}
			onRequestClose={onCloseModal}
			contentLabel="Modal window for image"
			className={css.modalContent}
			overlayClassName={css.modalOverlay}
		>
			<img
				onClick={onCloseModal}
				src={image?.urls.regular}
				alt={image?.description}
				className={css.modalImg}
			/>
		</Modal>
	);
};

export default ImageModal;
