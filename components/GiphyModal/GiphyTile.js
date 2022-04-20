import styles from "../../styles/Giphy/GiphyTile.module.css";

const GiphyTile = ({ gif, showGiphy, setShowGiphy, setFile }) => {
	const handleClick = () => {
		setFile(gif?.images.original.url);
		setShowGiphy(!showGiphy);
	};

	return (
		<button type="button" className={styles.giphyTile}>
			<img
				className={styles.gif}
				src={gif?.images.original.url}
				alt="gif"
				onClick={handleClick}
			/>
		</button>
	);
};

export default GiphyTile;
