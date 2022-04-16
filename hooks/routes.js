import { useEffect } from "react";
import { useRouter } from "next/router";

import { auth } from "../firebase/firebaseConfig";
import { useUser } from "../context/UserContext";

import PageLoading from "../components/PageLoading";

export const protectedRoute = (Component) => {
	return function ProtectedRoute(props) {
		const user = useUser();
		const router = useRouter();

		useEffect(() => {
			if (!user) {
				router.push("/auth");
				// return <PageLoading />;
			}
		}, [user]);

		return <Component auth={auth} {...props} />;
	};
};

export const publicRoute = (Component) => {
	return function PublicRoute(props) {
		const user = useUser();
		const router = useRouter();

		useEffect(() => {
			if (user) {
				router.push("/");
				// return <PageLoading />;
			}
		}, [user]);

		return <Component auth={auth} {...props} />;
	};
};
