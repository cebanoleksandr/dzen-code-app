import { useLayoutEffect, useState, type FC } from "react";
import Popup, { type IPopup } from "./BasePopup";
import { XMarkIcon } from '@heroicons/react/24/solid';
import type { CreateProductDTO } from "../../api/products";
import Select from "../UI/Select";
import { formatDateForInput } from "../../utils/data-configs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import OrdersSelect from "../business/orders/OrdersSelect";
import { fetchOrders } from "../../api/orders";
import { setOrdersAC } from "../../store/ordersSlice";
import { getPhotoLink } from "../../utils/photo";
import UploadImage from "../UI/UploadImage";

export interface IProps extends Omit<IPopup, 'children'> {
  onCreate: (createProductDTO: CreateProductDTO) => Promise<void>;
  isCreating: boolean;
  orderId?: string;
}

const AddProductPopup: FC<IProps> = (props) => {
  const [title, setTitle] = useState('');
  const [specification, setSpecification] = useState('');
  const [status, setStatus] = useState<string>('In stock');
  const [type, setType] = useState<string>('New');
  const [UAH, setUAH] = useState<number | null>(null);
  const [dollars, setDollars] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [orderId, setOrderId] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { item: user } = useAppSelector(state => state.user);
  const { items: orders } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();

  const statusOptions = ['In stock', 'Under repair', 'Out of stock'];
  const typeOptions = ['New', 'Used'];

  const getOrders = async () => {
    const response = await fetchOrders({});
    dispatch(setOrdersAC(response.data));
  };

  useLayoutEffect(() => {
    getOrders();
  }, []);

  const onCreate = async () => {
    let imageUrl = '';

    if (!!image) {
      imageUrl = await getPhotoLink(image);
    }

    const body: CreateProductDTO = {
      serialNumber: +new Date(),
      status: status as 'In stock' | 'Under repair' | 'Out of stock',
      photo: imageUrl,
      title,
      type: type as 'New' | 'Used',
      specification,
      guarantee: {
        start: startDate!,
        end: endDate!
      },
      price: [
        { value: UAH!, symbol: 'UAH', isDefault: 0 },
        { value: dollars!, symbol: 'USD', isDefault: 0 }
      ],
      order: props.orderId || orderId,
      authorId: user?._id!
    };
    props.onCreate(body);
  }

  const onPriceChange = (price: number, type: 'UAH' | 'DOLLAR') => {
    if (!price) {
      setDollars(() => null);
      setUAH(() => null);
      return;
    }
    if (type === 'DOLLAR') {
      setDollars(+price.toFixed(2));
      setUAH(+(price * 41.64).toFixed(2));
    } else {
      setDollars(+(price / 41.64).toFixed(2));
      setUAH(+price.toFixed(2));
    }
  }

  const handleStartDateChange = (e: any) => {
    const dateString = e.target.value;

    if (dateString) {
      setStartDate(new Date(dateString));
    } else {
      setStartDate(null);
    }
  };

  const handleEndDateChange = (e: any) => {
    const dateString = e.target.value;

    if (dateString) {
      setEndDate(new Date(dateString));
    } else {
      setEndDate(null);
    }
  };

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
      <div className='w-[700px] bg-white p-7 max-h-[100vh] overflow-auto rounded-xl scrollbar-md'>
        <div className='flex justify-end'>
          <XMarkIcon
            className='w-6 h-6 text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer'
            onClick={() => props.setState(false)}
          />
        </div>

        <h2 className='text-center text-dark text-2xl font-semibold mb-10'>
          Add Product
        </h2>

        {!props.orderId && (
          <div className='mb-3'>
            <p className='text-dark text-app-m font-medium mb-1'>Order*</p>
            <OrdersSelect options={orders} onSelect={setOrderId} />
          </div>
        )}

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Title*</p>
          <input
            type="text"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='Product title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Specification*</p>
          <input
            type="text"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='Specification'
            value={specification}
            onChange={e => setSpecification(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Status*</p>
          <Select options={statusOptions} onSelect={setStatus} />
        </div>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Type*</p>
          <Select options={typeOptions} onSelect={setType} />
        </div>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>UAH*</p>
          <input
            type="number"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='UAH'
            value={UAH?.toString()}
            onChange={e => onPriceChange(+e.target.value, 'UAH')}
          />
        </div>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Dollars*</p>
          <input
            type='number'
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='Dollars'
            value={dollars?.toString()}
            onChange={e => onPriceChange(+e.target.value, 'DOLLAR')}
          />
        </div>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Guarantee from*</p>
          <input
            type="date"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='Guarantee from'
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
          />
        </div>

        <div className='mb-3'>
          <p className='text-dark text-app-m font-medium mb-1'>Guarantee to*</p>
          <input
            type="date"
            className='px-3 py-2 w-full rounded-lg text-app-m border border-grey-3 mb-1'
            placeholder='Guarantee from'
            value={formatDateForInput(endDate)}
            onChange={handleEndDateChange}
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
            disabled={
              !title.trim()
              || !specification.trim()
              || !status.trim()
              || !type.trim()
              || !UAH
              || !dollars
              || !startDate
              || !endDate
              || (!props.orderId && !orderId)
            }
            onClick={onCreate}
          >
            {props.isCreating ? 'Creating...' : 'Add Product'}
          </button>
        </div>
      </div>
    </Popup>
  )
}

export default AddProductPopup;
