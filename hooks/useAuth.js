import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
	const { user } = useContext(AuthContext);
	return user;
};
