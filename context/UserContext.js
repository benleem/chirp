import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const user = getUser();
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	return useContext(UserContext);
};

const getUser = () => {
	const [user, setUser] = useState(null);
	const handleUser = (user) => {
		if (user) {
			setUser(user);
		} else {
			setUser(null);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			handleUser(user);
		});
		return () => unsubscribe();
	}, []);

	return user;
};
