import { useState } from "react";
import { verifyToken } from "../../hooks/server/verifyToken";

import MainLayout from "../../components/Layouts/MainLayout";
import SettingsLayout from "../../components/Layouts/SettingsLayout";
import Reauthenticate from "../../components/ProfileSettings/Reauthenticate";
import ChangePasswordForm from "../../components/ProfileSettings/ChangePasswordForm";
import FormLoading from "../../components/FormState/FormLoading";

export const getServerSideProps = async (context) => {
	try {
		const token = await verifyToken(context);
		const profileId = context.params.profile;

		if (token.uid === profileId) {
			return {
				props: { token },
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

const Settings = ({ token }) => {
	const [formLoading, setFormLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<>
			{formLoading ? <FormLoading /> : null}
			{isAuthenticated ? (
				<ChangePasswordForm setFormLoading={setFormLoading} />
			) : (
				<Reauthenticate
					email={token.email}
					setFormLoading={setFormLoading}
					setIsAuthenticated={setIsAuthenticated}
				/>
			)}
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
