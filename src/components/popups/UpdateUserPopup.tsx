import { useLayoutEffect, useState, type FC } from "react";
import Popup, { type IPopup } from "./BasePopup";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from "../../store/hooks";
import type { UpdateUserDTO } from "../../api/users";
import { getPhotoLink } from "../../utils/photo";
import UploadImage from "../UI/UploadImage";

export interface IProps extends Omit<IPopup, 'children'> {
  onUpdate: (updateUserDTO: UpdateUserDTO) => Promise<void>;
  isUpdating: boolean;
}

const UpdateUserPopup: FC<IProps> = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { item: user } = useAppSelector(state => state.user);

  useLayoutEffect(() => {
    if (user?.firstName) {
      setFirstName(user.firstName);
    }
    if (user?.lastName) {
      setFirstName(user.lastName);
    }
  }, []);

  const onUpdate = async () => {
    let imageUrl = '';

    if (!!image) {
      imageUrl = await getPhotoLink(image);
    }

    props.onUpdate({ firstName, lastName, userId: user?._id!, photoUrl: imageUrl });
  }

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Popup
      state={props.state}
      setState={props.setState}
    >
      <div className='w-[700px] bg-white p-7 rounded-xl'>
        <div className='flex justify-end'>
          <XMarkIcon
            className='w-6 h-6 text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer'
            onClick={() => props.setState(false)}
          />
        </div>

        <h2 className='text-center text-dark text-2xl font-semibold mb-10'>
          Update user
        </h2>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>First Name</p>
          <input
            type="text"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='First Name'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className='mb-9'>
          <p className='text-dark text-app-m font-medium mb-1'>Last Name</p>
          <input
            type="text"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='Last Name'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <UploadImage onChangeImage={onChangeImage} />

        <div className='flex justify-end items-center gap-2'>
          <button
            className='text-gray-900 bg-white px-3 py-2 rounded-xl border border-gray-200 w-44
                hover:bg-gray-100 active:bg-gray-200 transition duration-300'
            onClick={() => props.setState(false)}
          >
            Cancel
          </button>

          <button
            className='text-white bg-green-500 px-3 py-2 rounded-xl font-medium w-44
                hover:bg-green-400 active:bg-green-600 transition duration-300 
                disabled:bg-gray-400 disabled:text-gray-900 disabled:cursor-default'
            onClick={onUpdate}
          >
            {props.isUpdating ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </div>
    </Popup>
  )
}

export default UpdateUserPopup;
