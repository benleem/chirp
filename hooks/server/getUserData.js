import { query, doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getUserData = async (uid) => {
	const userQuery = query(doc(db, `users/${uid}`));
	const userData = (await getDoc(userQuery)).data();

	return userData;
};
