import { useLayoutEffect, useState, type FC } from "react";
import { Bars3Icon, TrashIcon } from "@heroicons/react/24/solid";
import type { Order, Product } from "../../../utils/types";
import { calculatePrice, formatDate } from "../../../utils/data-configs";
import DeleteOrderPopup from "../../popups/DeleteOrderPopup";
import { useAppDispatch } from "../../../store/hooks";
import { deleteOrder, fetchOrders } from "../../../api/orders";
import { setOrdersAC } from "../../../store/ordersSlice";
import { setAlertAC } from "../../../store/alertSlice";
import { fetchProducts } from "../../../api/products";

interface IOrderItem {
  order: Order;
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  selectedOrder: Order | null;
}

const OrderItem: FC<IOrderItem> = ({ order, setSelectedOrder, selectedOrder }) => {
  const [isDeleteOrderPopupOpen, setIsDeleteOrderPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useAppDispatch();

  const getProducts = async () => {
    const response = await fetchProducts({ orderId: order._id });
    setProducts(response.data);
  }

  useLayoutEffect(() => {
    getProducts();
  }, []);

  const getOrders = async () => {
    const response = await fetchOrders({});
    dispatch(setOrdersAC(response.data));
  };

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteOrder(order._id);
      await getOrders();
      dispatch(setAlertAC({ text: 'Order is deleted', mode: 'warning' }));
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something wrong with deleting order', mode: 'error' }));
    } finally {
      setIsDeleteOrderPopupOpen(false);
      setIsDeleting(false);
    }
  }

  return (
    <div className={`relative w-full py-4 px-8 border border-gray-200 rounded-lg mb-1 hover:shadow-soft transition duration-300 flex items-center`}>
      <p 
        className={`
          flex-grow text-gray-500 text-lg font-medium
          ${!!selectedOrder ? 'w-0 opacity-0 -z-10' : 'truncate overflow-hidden whitespace-nowrap'}
        `}
      >{order.title}</p>

      <div
        className={
          `flex items-center justify-between transition-all duration-500 ease-in-out
          ${!!selectedOrder ? 'w-full' : 'w-[700px] overflow-hidden'}`
        }
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full border border-gray-2 p-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition duration-300"
            onClick={() => setSelectedOrder(order)}
          >
            <Bars3Icon className="size-6 text-gray-800" />
          </div>

          <div>
            <p className="text-gray-800 text-lg">{products.length}</p>
            <p className="text-gray-600">Products</p>
          </div>
        </div>

        <div>
          <p>{formatDate(new Date(order.createdAt))}</p>
        </div>

        <div>
          <p className="text-xs text-gray-600">{calculatePrice(products).totalUSD} $</p>
          <p className="text-gray-800">{calculatePrice(products).totalUAH} UAH</p>
        </div>

        <TrashIcon
          className='size-6 text-red-500 cursor-pointer hover:text-red-400 active:text-red-600 transition duration-300'
          onClick={() => setIsDeleteOrderPopupOpen(true)}
        />
      </div>

      {!!selectedOrder && order._id === selectedOrder._id && (
        <div className="absolute top-0 right-0 bottom-0 flex items-center justify-center w-6 bg-green-600 rounded-r-lg text-white font-bold">
          &#62;
        </div>
      )}

      <DeleteOrderPopup
        state={isDeleteOrderPopupOpen}
        setState={setIsDeleteOrderPopupOpen}
        onDelete={onDelete}
        order={order}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default OrderItem;
