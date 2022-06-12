import Image from "next/image";

import styles from "../../styles/GiphyModal/GiphyTile.module.css";

const GiphyTile = ({ gif, showGiphy, setShowGiphy, setFile }) => {
	console.log(gif);
	const handleClick = () => {
		setFile({
			src: gif?.images.downsized.url,
			height: gif?.images.downsized.height,
			width: gif?.images.downsized.width,
		});
		setShowGiphy(!showGiphy);
	};
	return (
		<button type="button" className={styles.giphyTile} onClick={handleClick}>
			<div className={styles.imgWrapper}>
				<Image
					src={gif?.images.downsized.url}
					alt="Gif selection"
					layout="responsive"
					width={gif?.images.downsized.width}
					height={gif?.images.downsized.height}
				/>
			</div>
		</button>
	);
};

export default GiphyTile;
