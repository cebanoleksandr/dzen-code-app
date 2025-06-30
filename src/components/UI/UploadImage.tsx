import type { ChangeEvent, FC } from "react";

interface IProps {
  onChangeImage: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage: FC<IProps> = ({ onChangeImage }) => {
  return (
    <div className="mb-9">
      <label className='text-dark text-app-m font-medium mb-1'>Upload image</label>
      <input
        type="file"
        accept='image/*'
        onChange={onChangeImage}
        className='w-full rounded-md border border-gray-300 shadow-sm p-2'
      />
    </div>
  )
}

export default UploadImage;
