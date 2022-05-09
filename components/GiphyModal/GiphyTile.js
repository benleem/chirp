import styles from "../../styles/Giphy/GiphyTile.module.css";

const GiphyTile = ({ gif, showGiphy, setShowGiphy, setFile }) => {
	const handleClick = () => {
		setFile(gif?.images.downsized.url);
		setShowGiphy(!showGiphy);
	};

	return (
		<button type="button" className={styles.giphyTile}>
			<img
				autoPlay="autoPlay"
				loop
				muted
				className={styles.gif}
				src={gif?.images.downsized.url}
				alt="gif"
				onClick={handleClick}
			/>
		</button>
	);
};

export default GiphyTile;
