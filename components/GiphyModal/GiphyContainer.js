import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { GiphyFetch } from "@giphy/js-fetch-api";

import GiphyTile from "./GiphyTile";

import styles from "../../styles/GiphyModal/GiphyContainer.module.css";

const GiphyContainer = ({ showGiphy, setShowGiphy, setFile }) => {
	const gf = new GiphyFetch(`${process.env.NEXT_PUBLIC_GIPHY_KEY}`);

	const [gifs, setGifs] = useState([]);
	const [gifSearch, setGifSearch] = useState("");

	const trendingGifs = async () => {
		const { data: gifs } = await gf.trending({
			limit: 25,
			offset: 25,
			rating: "pg-13",
		});
		setGifs(gifs);
	};

	const searchGifs = async () => {
		const { data: gifs } = await gf.search(gifSearch, {
			sort: "relevant",
			lang: "es",
			limit: 25,
			type: "gifs",
		});
		if (gifs.length < 1) {
			trendingGifs();
		} else {
			setGifs(gifs);
		}
	};

	const handleChange = (e) => {
		setGifSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		searchGifs();
	};

	useEffect(() => {
		trendingGifs();
	}, []);

	return (
		<motion.div
			className={styles.giphyContainer}
			initial={{ x: "100%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
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
			{gifs.map((gif, index) => (
				<GiphyTile
					key={gif.id + index}
					gif={gif}
					showGiphy={showGiphy}
					setShowGiphy={setShowGiphy}
					setFile={setFile}
				/>
			))}
		</motion.div>
	);
};

export default GiphyContainer;
