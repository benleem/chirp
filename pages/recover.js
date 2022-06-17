import MainLayout from "../components/Layouts/MainLayout";
import RecoverEmail from "../components/ProfileSettings/RecoverEmail";
import RecoverPasswordForm from "../components/ProfileSettings/RecoverPasswordForm";
import ResetPassword from "../components/ProfileSettings/ResetPassword";

export const getServerSideProps = async (context) => {
	return {
		props: { query: context.query },
	};
};

const Recover = ({ query }) => {
	switch (query.mode) {
		case "recoverEmail":
			return <RecoverEmail query={query} />;
		case "resetPassword":
			return <ResetPassword query={query} />;
		default:
			return <RecoverPasswordForm />;
	}
};

Recover.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default Recover;
