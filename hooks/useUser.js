import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export const useUser = () => {
	const { userInfo } = useContext(AuthContext);
	return userInfo;
};
