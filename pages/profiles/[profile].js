import { useRouter } from "next/router";

const Profile = () => {
	const router = useRouter();
	const { profile } = router.query;

	return (
		<main>
			<p>Profile: {profile}</p>
		</main>
	);
};

export default Profile;
