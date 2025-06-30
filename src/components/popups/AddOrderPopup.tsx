import { useState, type FC } from "react";
import Popup, { type IPopup } from "./BasePopup";
import { XMarkIcon } from '@heroicons/react/24/solid';

export interface IProps extends Omit<IPopup, 'children'> {
  onCreate: ({ title, description }: {
    title: string;
    description: string;
  }) => Promise<void>;
  isCreating: boolean;
}

const AddOrderPopup: FC<IProps> = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onCreate = () => {
    props.onCreate({ title, description });
  }

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
          Add Order
        </h2>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Title*</p>
          <input
            type="text"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='Order title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-9'>
          <p className='text-dark text-app-m font-medium mb-1'>Description*</p>
          <textarea
            className="px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1 resize-none"
            placeholder="Order description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </div>

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
                disabled={!title.trim() || !description.trim()}
            onClick={onCreate}
          >
            {props.isCreating ? 'Creating...' : 'Add Order'}
          </button>
        </div>
      </div>
    </Popup>
  )
}

export default AddOrderPopup;
