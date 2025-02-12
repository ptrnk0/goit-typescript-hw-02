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
import { Image, Images } from "../../services/unsplashApi.types";

const errorNotify = () => toast.error("No results found");

const App = () => {
	const [images, setImages] = useState<Images>([]);
	const [loader, setLoader] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [query, setQuery] = useState<string>("");
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [modalImage, setModalImage] = useState<Image>(null);

	const galleryRef = useRef<HTMLUListElement>(null);
	const loadMoreRef = useRef<HTMLButtonElement>(null);

	const handleOpenModal = (image: Image) => {
		if (modalIsOpen) return;
		setIsOpen(prev=> !prev);
		setModalImage(image);
	};

	const handleCloseModal = () => {
		setIsOpen(prev=> !prev);
		setModalImage(null);
	};

	const handleSearch = (userQuery: string) => {
		if (query === userQuery) return;
		setImages([]);
		setQuery(userQuery);
		setCurrentPage(1);
	};

	const handleClickLoadMore = () => {
		setCurrentPage((prev) => prev + 1);
	};

	useEffect(() => {
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
