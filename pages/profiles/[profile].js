import { useRouter } from "next/router";
import { protectedRoute } from "../../hooks/routes";

const Profile = () => {
	const router = useRouter();
	const { profile } = router.query;

	return (
		<main>
			<p>Profile: {profile}</p>
		</main>
	);
};

export default protectedRoute(Profile);
