import { useState } from "react";

import { verifyToken } from "../../hooks/server/verifyToken";
import { getUserData } from "../../hooks/server/getUserData";
import { getUserPostsIds } from "../../hooks/server/getUserPostsIds";

import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout";
import SettingsLayout from "../../components/Layouts/SettingsLayout";
import EditProfileForm from "../../components/ProfileSettings/EditProfileForm";
import FormLoading from "../../components/FormState/FormLoading";

export const getServerSideProps = async (context) => {
	try {
		const token = await verifyToken(context);
		const profileId = context.params.profile;

		if (token.uid === profileId) {
			try {
				const userData = await getUserData(token.uid);
				const userPosts = await getUserPostsIds(token.uid);
				return { props: { token, userData, userPosts } };
			} catch (error) {
				return { props: { error: error.message } };
			}
		} else {
			context.res.writeHead(302, { Location: `/${profileId}` });
			context.res.end();

			return { props: {} };
		}
	} catch (err) {
		context.res.writeHead(302, { Location: "/" });
		context.res.end();

		return { props: {} };
	}
};

const Edit = ({ token, userData, userPosts, error }) => {
	const [formLoading, setFormLoading] = useState(false);

	return (
		<>
			<Head>
				<title>Edit Profile - Chirp</title>
				<meta
					name="description"
					content="Edit basic parts of your profile such as pictures, description, and display name"
				/>
			</Head>
			{formLoading ? <FormLoading /> : null}
			<EditProfileForm
				token={token}
				userData={userData}
				userPosts={userPosts}
				setFormLoading={setFormLoading}
			/>
		</>
	);
};

Edit.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<SettingsLayout>{page}</SettingsLayout>
		</MainLayout>
	);
};

export default Edit;
