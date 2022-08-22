import { useRouter } from "next/router";

import styles from "../../styles/PageErrors/NoPosts.module.css";

const NoPosts = ({ profileData }) => {
	const router = useRouter();

	const CheckData = () => {
		switch (router.pathname) {
			case "/home":
				return (
					<div className={styles.noPosts}>
						<p className={styles.title}>There are no posts!</p>
						<video
							className={styles.mp4Gif}
							autoPlay="autoplay"
							loop
							muted
							playsInline
							src="https://media.giphy.com/media/jU9OCvBiO1besabUKU/giphy.mp4"
						/>
						<p className={styles.altTitle}>See posts from everyone</p>
						<p className={styles.details}>
							When someone adds a post it will show up here. Reload the page or
							add a post yourself
						</p>
					</div>
				);
			case "/[profile]":
				return (
					<div className={styles.noPosts}>
						<p className={styles.title}>
							{profileData.displayName} doesn&apos;t have any posts!
						</p>
						<video
							className={styles.mp4Gif}
							autoPlay="autoplay"
							loop
							muted
							playsInline
							src="https://media.giphy.com/media/TeyLTZpDWHAik1TD2N/giphy.mp4"
						/>
						<p className={styles.altTitle}>See user posts</p>
						<p className={styles.details}>
							When {profileData.displayName} starts posting, their posts will be
							here. To return, just put their profile link in the browser. You
							can also click their name on one of their posts
						</p>
					</div>
				);
		}
	};

	return <CheckData />;
};

export default NoPosts;
