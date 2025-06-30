import { MinusIcon } from "@heroicons/react/24/solid";
import type { User } from "../../../utils/types";
import type { FC } from "react";
import { formatDate } from "../../../utils/data-configs";

interface IProps {
  users: User[];
}

const UsersTable: FC<IProps> = ({ users }) => {
  const emptyAva = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <>
      {!users.length ? (
        <p className="text-center text-5xl text-text-secondary font-bold">There are no users yet</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Avatar
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Created at
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated at
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={user.id}
                >
                  <th scope="row" className="px-6 py-4">
                    <img
                      src={user.photoUrl || emptyAva}
                      alt=''
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </th>
                  <td className="px-6 py-4">
                    {!!user.firstName ? (
                      <>{user.firstName}</>
                    ) : (
                      <MinusIcon className="size-5 text-gray-50" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!!user.lastName ? (
                      <>{user.lastName}</>
                    ) : (
                      <MinusIcon className="size-5 text-gray-50" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(new Date(user.createdAt))}
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(new Date(user.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default UsersTable;
