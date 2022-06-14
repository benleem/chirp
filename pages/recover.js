import MainLayout from "../components/Layouts/MainLayout";
import RecoverEmail from "../components/ProfileSettings/RecoverEmail";
import RecoverPasswordForm from "../components/ProfileSettings/RecoverPasswordForm";

export const getServerSideProps = async (context) => {
	return {
		props: { query: context.query },
	};
};

const Recover = ({ query }) => {
	console.log(query);
	switch (query.mode) {
		case "recoverEmail":
			return <RecoverEmail query={query} />;
		case "resetPassword":
			return <p>Reset Password</p>;
		default:
			return <RecoverPasswordForm />;
	}
};

Recover.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default Recover;
