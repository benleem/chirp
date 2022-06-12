import Image from "next/image";

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
			<Image
				src={gif?.images.downsized.url}
				alt="Gif selection"
				layout="responsive"
				width={gif?.images.downsized.width}
				height={gif?.images.downsized.height}
			/>
		</button>
	);
};

export default GiphyTile;
