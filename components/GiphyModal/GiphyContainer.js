import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { GiphyFetch } from "@giphy/js-fetch-api";

import InfiniteScroll from "react-infinite-scroll-component";
import GiphyTile from "./GiphyTile";

import styles from "../../styles/GiphyModal/GiphyContainer.module.css";

const GiphyContainer = ({ showGiphy, setShowGiphy, setFile }) => {
	const gf = new GiphyFetch(`${process.env.NEXT_PUBLIC_GIPHY_KEY}`);

	const giphyContainer = useRef();

	const [gifsArray, setGifsArray] = useState([]);
	const [gifSearch, setGifSearch] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [checkHasMore, setCheckHasMore] = useState(true);

	const trendingGifs = async () => {
		const { data: gifs } = await gf.trending({
			limit: 10,
			offset: 0,
			rating: "pg-13",
		});
		setGifsArray(gifs);
	};

	const searchGifs = async () => {
		const { data: gifs } = await gf.search(gifSearch, {
			sort: "relevant",
			lang: "es",
			limit: 10,
			type: "gifs",
			offset: 0,
		});
		if (gifs.length < 1) {
			setIsSearching(false);
			trendingGifs();
		} else {
			setGifsArray(gifs);
		}
	};

	const newGifsBatch = async () => {
		const gifsOffset = gifsArray.length;
		const gifs = await checkIfSearching(gifsOffset);
		if (gifs.length < 1) {
			setCheckHasMore(false);
		} else {
			setGifsArray([...gifsArray, ...gifs]);
			setCheckHasMore(true);
		}
	};

	const checkIfSearching = async (gifsOffset) => {
		if (isSearching === true) {
			const { data: gifs } = await gf.search(gifSearch, {
				sort: "relevant",
				lang: "es",
				limit: 5,
				type: "gifs",
				offset: gifsOffset,
			});
			return gifs;
		} else if (isSearching === false) {
			const { data: gifs } = await gf.trending({
				limit: 5,
				rating: "pg-13",
				offset: gifsOffset,
			});
			return gifs;
		}
	};

	const handleChange = (e) => {
		setGifSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		giphyContainer.current.scrollTop = 0;
		setIsSearching(true);
		searchGifs();
	};

	useEffect(() => {
		trendingGifs();
	}, []);

	return (
		<motion.div
			ref={giphyContainer}
			id="giphyContainer"
			className={styles.giphyContainer}
			initial={{ x: "100vw", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "100vw", opacity: 0 }}
			transition={{
				duration: 0.4,
				type: "spring",
				bounce: 0.3,
			}}
		>
			<div className={styles.giphyContainerTop}>
				<button
					className={styles.backButton}
					type="button"
					onClick={() => setShowGiphy(!showGiphy)}
				>
					{"<"}
				</button>
				<form className={styles.searchForm} onSubmit={(e) => handleSubmit(e)}>
					<button type="submit" className={styles.searchButton}>
						<img className={styles.searchImage} src="/img/search.svg" alt="" />
					</button>
					<input
						className={styles.searchGiphy}
						type="text"
						name="giphySearch"
						autoComplete="off"
						placeholder="Search Giphy"
						onChange={(e) => handleChange(e)}
					/>
				</form>
			</div>
			<InfiniteScroll
				dataLength={gifsArray.length}
				next={newGifsBatch}
				hasMore={checkHasMore}
				loader={<h4>Loading...</h4>}
				scrollableTarget="giphyContainer"
				scrollThreshold={0.9}
			>
				{gifsArray.map((gif, index) => (
					<GiphyTile
						key={gif.id + index}
						gif={gif}
						showGiphy={showGiphy}
						setShowGiphy={setShowGiphy}
						setFile={setFile}
					/>
				))}
			</InfiniteScroll>
		</motion.div>
	);
};

export default GiphyContainer;
