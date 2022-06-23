import { useEffect, useRef } from "react";
import Image from "next/image";

import styles from "../../styles/GiphyModal/GiphyTile.module.css";

const GiphyTile = ({ gif, showGiphy, setShowGiphy, setFile }) => {
	const tileBackground = useRef();

	const handleClick = () => {
		setFile({
			src: gif?.images.downsized.url,
			height: gif?.images.downsized.height,
			width: gif?.images.downsized.width,
		});
		setShowGiphy(!showGiphy);
	};

	const randomBackground = () => {
		const colors = [255, 255, 255];
		const randomColor = colors.map((color) => {
			const randomNumber = Math.floor(Math.random() * (color - 0) + 0);
			return randomNumber;
		});
		tileBackground.current.style.backgroundColor = `rgb(${randomColor})`;
	};

	useEffect(() => {
		randomBackground();
	}, []);

	return (
		<button
			ref={tileBackground}
			type="button"
			className={styles.giphyTile}
			onClick={handleClick}
		>
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
