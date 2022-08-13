import { useEffect, useRef, useState } from "react";

import styles from "../../styles/Feed/InfiniteScroll.module.css";

const InfiniteScroll = ({ children }) => {
	// const [scrollPosition, setscrollPosition] = useState();
	const scrollContainer = useRef();

	// const trackScroll = () => {
	// 	const options = {
	// 		root: null,
	// 		rootMargin: "0px",
	// 		threshold: 0.8,
	// 	};
	// 	const observer = new IntersectionObserver(([entry]) => {
	// 		if (entry) {

	// 		}
	// 		console.log(entries);
	// 	});
	// 	observer.observe(scrollContainer.current);
	// 	setscrollPosition(observer);
	// };

	// const getNewBatch = () => {
	// 	console.log("hello");
	// };

	// useEffect(() => {}, []);

	// useEffect(() => {
	// 	console.log(scrollPosition);
	// }, [scrollPosition]);

	return (
		<div ref={scrollContainer} className={styles.infiniteScrollContainer}>
			{children}
		</div>
	);
};

export default InfiniteScroll;
