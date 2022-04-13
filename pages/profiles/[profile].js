import { useRouter } from "next/router";
import { protectedRoute } from "../../hooks/routes";

const Profile = () => {
	const router = useRouter();
	const { profile } = router.query;

	return (
		<div>
			<p>Profile: {profile}</p>
		</div>
	);
};

export default protectedRoute(Profile);
