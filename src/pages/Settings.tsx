import UserInfo from "../components/business/users/UserInfoBlock";
import MainLayout from "../components/layouts/MainLayout";

const Settings = () => {
  return (
    <MainLayout>
      <p className="font-semibold text-2xl mb-9">Settings</p>

      <UserInfo />
    </MainLayout>
  )
}

export default Settings;