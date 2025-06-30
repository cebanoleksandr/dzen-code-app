import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { formatDate } from "../../../utils/data-configs";
import Avatar from "../../UI/Avatar";
import UpdateUserPopup from "../../popups/UpdateUserPopup";
import { updateUser, type UpdateUserDTO } from "../../../api/users";
import { setAlertAC } from "../../../store/alertSlice";
import { getPhotoLink } from "../../../utils/photo";
import { setUserAC } from "../../../store/userSlice";
import DeleteAvaPopup from "../../popups/DeleteAvaPopup";

const UserInfo = () => {
  const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false);
  const [isDeleteAvaPopupOpen, setIsDeleteAvaPopupOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAvaUpdating, setIsAvaUpdating] = useState(false);

  const { item: user } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const onUpdate = async (updateUserDTO: UpdateUserDTO) => {
    setIsUpdating(true);
    try {
      const response = await updateUser(updateUserDTO);
      dispatch(setUserAC(response.data));
      dispatch(setAlertAC({ text: 'User is updated', mode: 'success' }));
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong with updating user', mode: 'error' }));
    } finally {
      setIsUpdateUserPopupOpen(false);
      setIsUpdating(false);
      setIsAvaUpdating(false);
      setIsDeleteAvaPopupOpen(false);
    }
  }

  const onDeleteAva = async () => {
    onUpdate({ userId: user?._id!, photoUrl: '' });
  }

  const onUploadAva = async (image: File) => {
    setIsAvaUpdating(true);

    let imageUrl = '';

    if (!!image) {
      imageUrl = await getPhotoLink(image);
    }

    onUpdate({ userId: user?._id!, photoUrl: imageUrl });
  }

  return (
    <div>
      <h2 className="text-gray-800 font-semibold text-lg mb-3">User info</h2>

      <div className="flex gap-10">
        <div className="w-96">
          <Avatar
            user={user!}
            onDelete={() => setIsDeleteAvaPopupOpen(true)}
            onUpload={onUploadAva}
            isUpdating={isAvaUpdating}
          />
        </div>

        <div>
          <button
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 active:bg-blue-600 transition duration-300 mb-9'
            onClick={() => setIsUpdateUserPopupOpen(true)}
          >
            Update user
          </button>

          {(!!user?.firstName || !!user?.lastName) && (
            <p className="font-semibold mb-2">Name: <span className="font-normal">{user?.firstName} {user?.lastName}</span></p>
          )}

          <p className="font-semibold mb-2">Email: <span className="font-normal">{user?.email}</span></p>

          <p className="font-semibold mb-2 ">Created at: <span className="font-normal">{formatDate(new Date(user?.createdAt!))}</span></p>

          <p className="font-semibold mb-2">Updated at: <span className="font-normal">{formatDate(new Date(user?.updatedAt!))}</span></p>
        </div>
      </div>

      <UpdateUserPopup
        state={isUpdateUserPopupOpen}
        setState={setIsUpdateUserPopupOpen}
        onUpdate={onUpdate}
        isUpdating={isUpdating}
      />

      <DeleteAvaPopup
        state={isDeleteAvaPopupOpen}
        setState={setIsDeleteAvaPopupOpen}
        onDelete={onDeleteAva}
        isDeleting={isUpdating}
      />
    </div>
  )
}

export default UserInfo;
