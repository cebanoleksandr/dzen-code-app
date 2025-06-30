import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchAC } from "../store/searchSlice";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Loader from "../components/UI/Loader";
import { fetchOrders } from "../api/orders";
import { setOrdersAC } from "../store/ordersSlice";
import { setAlertAC } from "../store/alertSlice";
import { fetchProducts } from "../api/products";
import { setProductsAC } from "../store/productsSlice";
import { fetchUsers } from "../api/users";
import { setUsersAC } from "../store/usersSlice";
import OrdersList from "../components/business/orders/OrdersList";
import ProductsList from "../components/business/products/ProductList";
import UsersTable from "../components/business/users/UsersTable";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { item: search } = useAppSelector(state => state.search);
  const { items: orders } = useAppSelector(state => state.orders);
  const { items: products } = useAppSelector(state => state.products);
  const { items: users } = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getOrders = async () => {
    const response = await fetchOrders({ query: search });
    dispatch(setOrdersAC(response.data));
  };

  const getProducts = async () => {
    const response = await fetchProducts({ query: search });
    dispatch(setProductsAC(response.data));
  };

  const getUsers = async () => {
    const response = await fetchUsers({ query: search });
    dispatch(setUsersAC(response.data));
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      await getOrders();
      await getProducts();
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

  const onBack = () => {
    dispatch(setSearchAC(''));
    navigate(-1);
  }

  return (
    <MainLayout>
      <p className="font-semibold text-2xl mb-9">Search</p>

      <button
        className='mb-5 p-2 bg-green-500 text-white rounded-lg
          hover:bg-green-400 active:bg-green-600 transition duration-300 flex gap-1 items-center'
        onClick={onBack}
      >
        <ChevronLeftIcon className='size-4' />
        Back
      </button>

      <p className="font-semibold text-xl mb-9">Search results for: “{search}”</p>

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {!!orders.length && (
            <div className="mb-9">
              <p className="font-semibold mb-3">Orders</p>
              <OrdersList orders={orders} />
            </div>
          )}

          {!!products.length && (
            <div className="mb-9">
              <p className="font-semibold mb-3">Products</p>
              <ProductsList products={products} isMain />
            </div>
          )}

          {!!users.length && (
            <div className="mb-9">
              <p className="font-semibold mb-3">Users</p>
              <UsersTable users={users} />
            </div>
          )}
        </div>
      )}
    </MainLayout>
  )
}

export default Search;
