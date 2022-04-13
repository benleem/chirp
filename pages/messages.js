import { protectedRoute } from "../hooks/routes";

const Messages = () => {
	return (
		<div>
			<p>This is the messages page</p>
		</div>
	);
};

export default protectedRoute(Messages);
