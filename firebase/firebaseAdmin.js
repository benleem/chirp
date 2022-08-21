import * as admin from "firebase-admin";
// import serviceAccount from "../secret.json";

if (admin.apps.length === 0) {
	const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_KEY);
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
	});
}

const adminAuth = admin.auth();

export { adminAuth };
