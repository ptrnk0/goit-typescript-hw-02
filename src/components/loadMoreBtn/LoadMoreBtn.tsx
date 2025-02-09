import { forwardRef } from "react";
import css from "./LoadMoreBtn.module.css";
import { Props } from "./LoadMoreBtn.types";

const LoadMoreBtn = forwardRef<HTMLButtonElement, Props>((props, ref) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className={css.loadMoreBtn}
			ref={ref}
		>
			Load more
		</button>
	);
});

LoadMoreBtn.displayName = "LoadMoreBtn";

export default LoadMoreBtn;
