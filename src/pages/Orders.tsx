import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import MainLayout from "../components/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAlertAC } from "../store/alertSlice";
import OrdersList from "../components/business/orders/OrdersList";
import Loader from "../components/UI/Loader";
import { setOrdersAC } from "../store/ordersSlice";
import { createOrder, fetchOrders } from "../api/orders";
import AddOrderPopup from "../components/popups/AddOrderPopup";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddOrderPopupOpen, setIsAddOrderPopupOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const { items: orders } = useAppSelector(state => state.orders);
  const { item: user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const getOrders = async () => {
    const response = await fetchOrders({});
    dispatch(setOrdersAC(response.data));
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      await getOrders();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong', mode: 'error' }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onCreateOrder = async ({ title, description }: { title: string, description: string }) => {
    setIsCreating(true);
    try {
      await createOrder({ title, description, authorId: user?._id! });
      await getOrders();
      dispatch(setAlertAC({ text: 'Order is created', mode: 'success' }));
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something wrong with creating order', mode: 'error' }));
    } finally {
      setIsAddOrderPopupOpen(false);
      setIsCreating(false);
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-10">
        <PlusCircleIcon
          className='size-8 text-green-500 cursor-pointer hover:text-green-400 active:text-green-600 transition duration-300'
          onClick={() => setIsAddOrderPopupOpen(true)}
        />
        <p className="font-semibold text-2xl">Orders / {orders.length}</p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <OrdersList orders={orders} />
      )}

      <AddOrderPopup
        state={isAddOrderPopupOpen}
        setState={setIsAddOrderPopupOpen}
        onCreate={onCreateOrder}
        isCreating={isCreating}
      />
    </MainLayout>
  )
}

export default Orders;
