import nookies from "nookies";
import { adminAuth } from "../../firebase/firebaseAdmin";

export const verifyToken = async (context) => {
	const cookies = nookies.get(context);
	const token = await adminAuth.verifyIdToken(cookies.token);

	return token;
};
