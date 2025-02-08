import css from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ image, onCloseModal, value }) => {
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
				src={image.urls.regular}
				alt={image.description}
				className={css.modalImg}
			/>
		</Modal>
	);
};

export default ImageModal;
