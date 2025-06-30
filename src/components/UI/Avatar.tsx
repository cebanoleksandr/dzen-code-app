import { useState, useRef, type FC } from "react";
import Popup from "../popups/BasePopup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { TrashIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import type { User } from "../../utils/types";
import Loader from "./Loader";

interface IProps {
  user: User;
  onUpload: (file: File) => Promise<void>;
  onDelete: () => void;
  isUpdating: boolean;
}

const Avatar: FC<IProps> = ({ user, onUpload, onDelete, isUpdating }) => {
  const [showPopup, setShowPopup] = useState(false);
  const hasAvatar = !!user?.photoUrl;
  const emptyAva = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDelete = () => {
    onDelete();
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file);
  };

  return (
    <>
      <div
        className="relative size-52 cursor-pointer group rounded-full overflow-hidden"
        onClick={() => hasAvatar && setShowPopup(true)}
      >
        <img
          src={user?.photoUrl || emptyAva}
          alt="User Avatar"
          className="rounded-full"
        />

        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-end gap-4 opacity-0 
          group-hover:opacity-100 transition-opacity rounded-full"
        >
          <button
            onClick={handleUploadClick}
            className="bg-white p-2 rounded-full hover:bg-gray-200"
            title="Загрузить фото"
          >
            <ArrowUpTrayIcon className="w-5 h-5 text-gray-700" />
          </button>
          {!!user?.photoUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="bg-white p-2 rounded-full hover:bg-gray-200"
              title="Удалить фото"
            >
              <TrashIcon className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {isUpdating && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader />
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <Popup state={showPopup} setState={setShowPopup}>
        <div className="relative">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6 text-text-secondary hover:text-text-secondary transition duration-300 cursor-pointer" />
          </button>

          <img
            src={user?.photoUrl!}
            alt="Full Size Avatar"
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-lg"
          />
        </div>
      </Popup>
    </>
  );
};

export default Avatar;
