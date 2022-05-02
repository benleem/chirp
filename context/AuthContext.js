import { createContext, useState, useEffect } from "react";
import { query, doc, getDoc, onSnapshot } from "firebase/firestore";
import nookies from "nookies";

import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [userInfo, setUserInfo] = useState(null);

	// listen for token changes
	// call setUser and write new token as a cookie
	useEffect(() => {
		return auth.onIdTokenChanged(async (user) => {
			if (!user) {
				setUser(null);
				nookies.set(undefined, "token", "", {
					path: "/",
				});
			} else {
				const token = await user.getIdToken();
				setUser(user);
				nookies.set(undefined, "token", token, {
					path: "/",
				});
			}
		});
	}, []);

	// force refresh the token every 10 minutes
	useEffect(() => {
		const handle = setInterval(async () => {
			const user = auth.currentUser;
			if (user) await user.getIdToken(true);
		}, 10 * 60 * 1000);

		// clean up setInterval
		return () => clearInterval(handle);
	}, []);

	const getUserData = async () => {
		try {
			const userQuery = query(doc(db, `users/${user.uid}`));
			onSnapshot(userQuery, (doc) => {
				const userInfo = doc.data();
				setUserInfo(userInfo);
			});
		} catch (error) {
			setUserInfo(null);
		}
	};

	useEffect(() => {
		if (!user) {
			setUserInfo(null);
		} else {
			getUserData();
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, userInfo }}>
			{children}
		</AuthContext.Provider>
	);
}
