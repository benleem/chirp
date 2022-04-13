import { protectedRoute } from "../hooks/routes";

const Favorites = () => {
	return (
		<div>
			<p>This is the favorites page</p>
		</div>
	);
};

export default protectedRoute(Favorites);
