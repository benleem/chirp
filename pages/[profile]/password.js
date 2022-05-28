import { useState } from "react";
import { verifyToken } from "../../hooks/server/verifyToken";

import MainLayout from "../../components/Layouts/MainLayout";
import SettingsLayout from "../../components/Layouts/SettingsLayout";
import ChangePasswordForm from "../../components/ProfileSettings/ChangePasswordForm";
import FormLoading from "../../components/FormState/FormLoading";

export const getServerSideProps = async (context) => {
	try {
		const token = await verifyToken(context);
		const profileId = context.params.profile;

		if (token.uid === profileId) {
			return {
				props: { token, profileId, message: "User has access to this page" },
			};
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

const Settings = () => {
	const [formLoading, setFormLoading] = useState(false);

	return (
		<>
			{formLoading ? <FormLoading /> : null}
			<ChangePasswordForm setFormLoading={setFormLoading} />
		</>
	);
};

Settings.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<SettingsLayout>{page}</SettingsLayout>
		</MainLayout>
	);
};

export default Settings;
