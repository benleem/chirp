import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";

export const protectedRoute = (Component) => {
	return function ProtectedRoute(props) {
		const router = useRouter();

		auth.onAuthStateChanged((user) => {
			if (!user) {
				router.push("/auth");
			}
		});
		return <Component auth={auth} {...props} />;
	};
};

export const publicRoute = (Component) => {
	return function PublicRoute(props) {
		const router = useRouter();

		auth.onAuthStateChanged((user) => {
			if (user) {
				router.push("/");
			}
		});
		return <Component auth={auth} {...props} />;
	};
};
