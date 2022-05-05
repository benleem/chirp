import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../../styles/NoPosts.module.css";

const NoPosts = ({ profileData }) => {
	const router = useRouter();

	const CheckData = () => {
		switch (router.pathname) {
			case "/home":
				return (
					<div className={styles.noPosts}>
						<p className={styles.title}>There are no posts!</p>
						<div className={styles.imgWrapper}>
							<Image
								src="/img/sad.gif"
								alt="No favorites :("
								width={440}
								height={245}
								layout="responsive"
							/>
						</div>
						<p className={styles.altTitle}>See posts from everyone</p>
						<p className={styles.details}>
							When someone adds a post it will show up here. Reload the page or
							add a post yourself
						</p>
					</div>
				);
			case "/favorited":
				return (
					<div className={styles.noPosts}>
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
						<p className={styles.altTitle}>Save posts for later.</p>
						<p className={styles.details}>
							When you see a post you like, click the heart button. It'll be
							waiting for you here!
						</p>
					</div>
				);
			default:
				return (
					<div className={styles.noPosts}>
						<p className={styles.title}>
							{profileData.displayName} doesn't have any posts!
						</p>
						<div className={styles.imgWrapper}>
							<Image
								src="/img/sad.gif"
								alt="No favorites :("
								width={440}
								height={245}
								layout="responsive"
							/>
						</div>
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
