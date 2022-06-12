import styles from "../../styles/GiphyModal/GiphyTile.module.css";

const GiphyTile = ({ gif, showGiphy, setShowGiphy, setFile }) => {
	const handleClick = () => {
		setFile({
			src: gif?.images.downsized.url,
			height: gif?.images.downsized.height,
			width: gif?.images.downsized.width,
		});
		setShowGiphy(!showGiphy);
	};

	return (
		<button type="button" className={styles.giphyTile}>
			<img
				className={styles.gif}
				src={gif?.images.downsized.url}
				alt="gif"
				onClick={handleClick}
			/>
		</button>
	);
};

export default GiphyTile;
