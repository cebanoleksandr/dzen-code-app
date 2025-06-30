import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAlertAC } from "../store/alertSlice";
import { fetchUsers } from "../api/users";
import { setUsersAC } from "../store/usersSlice";
import Loader from "../components/UI/Loader";
import UsersTable from "../components/business/users/UsersTable";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { items: users } = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  const getUsers = async () => {
    const response = await fetchUsers({});
    dispatch(setUsersAC(response.data));
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      await getUsers();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong', mode: 'error' }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainLayout>
      <p className="font-semibold text-2xl mb-9">Users / {users.length}</p>

      {isLoading ? (
        <Loader />
      ) : (
        <UsersTable users={users} />
      )}
    </MainLayout>
  )
}

export default Users;