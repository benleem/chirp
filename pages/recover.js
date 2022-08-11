import Head from "next/head";
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
			return (
				<>
					<Head>
						<title>Recover Email - Chirp</title>
						<meta
							name="description"
							content="Recover email associated with account"
						/>
					</Head>
					<RecoverEmail query={query} />
				</>
			);
		case "resetPassword":
			return (
				<>
					<Head>
						<title>Reset Password - Chirp</title>
						<meta
							name="description"
							content="Reset password associated with account"
						/>
					</Head>
					<ResetPassword query={query} />
				</>
			);
		default:
			return (
				<>
					<Head>
						<title>Recover Password - Chirp</title>
						<meta
							name="description"
							content="Recover password associated with account"
						/>
					</Head>
					<RecoverPasswordForm />
				</>
			);
	}
};

Recover.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default Recover;
