import ImageGallery from "../imageGallery/ImageGallery";
import SearchBar from "../searchBar/SearchBar";
import ErrorMessage from "../errorMessage/ErrorMessage";
import LoadMoreBtn from "../loadMoreBtn/LoadMoreBtn";
import getImages from "../../services/unsplashApi";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import { RotatingSquare } from "react-loader-spinner";
import css from "./App.module.css";
import ImageModal from "../imageModal/ImageModal";
import { Image } from "../../services/unsplashApi.types";

const errorNotify = () => toast.error("No results found");

const App = () => {
	const [images, setImages] = useState([]);
	const [loader, setLoader] = useState(false);
	const [error, setError] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const [query, setQuery] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalImage, setModalImage] = useState<Image>(null);

	const galleryRef = useRef<HTMLUListElement>(null);
	const loadMoreRef = useRef<HTMLButtonElement>(null);

	const handleOpenModal = (image: Image): void => {
		setIsOpen(true);
		setModalImage(image);
	};

	const handleCloseModal = (): void => {
		setIsOpen(false);
		setModalImage(null);
	};

	const handleSearch = (userQuery: string): void => {
		if (query === userQuery) return;
		setImages([]);
		setQuery(userQuery);
		setCurrentPage(1);
	};

	const handleClickLoadMore = (): void => {
		setCurrentPage((prev) => prev + 1);
	};

	useEffect((): void => {
		if (!query) return;

		async function fetchImages() {
			try {
				setError(false);
				setLoader(true);
				const data = await getImages(query, currentPage);

				if (data.results.length < 1) {
					return errorNotify();
				}

				setHasMore(data.total_pages > currentPage);
				setImages((prev)=> [...prev, ...data.results]);
			} catch (error) {
				setError(true);
			} finally {
				setLoader(false);
			}
		}

		fetchImages();
	}, [query, currentPage]);

	useEffect(() => {
		if (images.length > 0 && hasMore) {
			loadMoreRef.current?.scrollIntoView({ behavior: "smooth" });
		} else if (!hasMore) {
			galleryRef.current?.scrollIntoView({
				block: "end",
				inline: "nearest",
				behavior: "smooth",
			});
		}
	}, [images, hasMore, currentPage]);

	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			<header className={css.header}>
				<SearchBar onSearch={handleSearch} />
			</header>
			<main className={css.main}>
				{error && <ErrorMessage />}
				{images && (
					<ImageGallery
						images={images}
						onOpenModal={handleOpenModal}
						ref={galleryRef}
					/>
				)}
				{modalImage && (
					<ImageModal
						value={modalIsOpen}
						onCloseModal={handleCloseModal}
						image={modalImage}
					/>
				)}
				{loader && (
					<RotatingSquare
						color="rgb(255, 216, 164)"
						wrapperStyle={{
							display: "flex",
							justifyContent: "center",
						}}
					/>
				)}
				{hasMore && (
					<LoadMoreBtn
						onClick={handleClickLoadMore}
						ref={loadMoreRef}
					/>
				)}
			</main>
		</>
	);
};

export default App;
