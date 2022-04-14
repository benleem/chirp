import { protectedRoute } from "../hooks/routes";

const Favorites = () => {
	return (
		<main>
			<p>This is the favorites page</p>
		</main>
	);
};

export default protectedRoute(Favorites);
