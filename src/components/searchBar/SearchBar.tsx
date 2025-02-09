import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";
import { Props } from "./SearchBar.types";

const errorNotify = () => toast.error("The field must not be empty.");

const SearchBar = ({ onSearch }: Props) => {
	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		const form = evt.target as HTMLFormElement;
		let userQuery = (form.elements.namedItem('search') as HTMLInputElement).value;

		if (userQuery.trim() === "") {
			errorNotify();
			return;
		}

		onSearch(userQuery);
		userQuery = "";
	};

	return (
		<form onSubmit={handleSubmit} className={css.searchBar}>
			<input
				type="text"
				autoComplete="off"
				autoFocus
				placeholder="Search images and photos"
				name="search"
				className={css.searchBarInput}
			/>
			<button type="submit" className={css.searchBarBtn}>
				Search
			</button>
		</form>
	);
};

export default SearchBar;
