import { protectedRoute } from "../hooks/routes";

const Messages = () => {
	return (
		<main>
			<p>This is the messages page</p>
		</main>
	);
};

export default protectedRoute(Messages);
