import MainLayout from "../components/Layouts/MainLayout";
import RecoverPasswordForm from "../components/ProfileSettings/RecoverPasswordForm";

const Recover = () => {
	return <RecoverPasswordForm />;
};

Recover.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default Recover;
