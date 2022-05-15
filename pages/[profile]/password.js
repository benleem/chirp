import { verifyToken } from "../../hooks/server/verifyToken";

import MainLayout from "../../components/Layouts/MainLayout";
import SettingsLayout from "../../components/Layouts/SettingsLayout";

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
	return <div>This is the change password page</div>;
};

Settings.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<SettingsLayout>{page}</SettingsLayout>
		</MainLayout>
	);
};

export default Settings;
