import Image from "next/image";

import styles from "../../styles/Favorited/NoFavorites.module.css";

const NoFavorites = () => {
	return (
		<div className={styles.noFavorites}>
			<p className={styles.title}>You don't have any favorites!</p>
			<div className={styles.imgWrapper}>
				<Image
					src="/img/sad.gif"
					alt="No favorites :("
					width={440}
					height={245}
					layout="responsive"
				/>
			</div>
			{/* <img className={styles.img} src="/img/sad.gif" alt="" /> */}
			<p className={styles.altTitle}>Save posts for later.</p>
			<p className={styles.details}>
				When you see a post you like, click the heart button. It'll be waiting
				for you here!
			</p>
		</div>
	);
};

export default NoFavorites;
