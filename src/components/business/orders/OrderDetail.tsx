import { useEffect, useState, type FC } from "react";
import type { Order } from "../../../utils/types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import ProductsList from "../products/ProductList";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAlertAC } from "../../../store/alertSlice";
import Loader from "../../UI/Loader";
import { createProduct, fetchProducts, type CreateProductDTO } from "../../../api/products";
import AddProductPopup from "../../popups/AddProductPopup";
import { setProductsAC } from "../../../store/productsSlice";

type IProps = {
  selectedOrder: Order | null;
  onClose: () => void;
}

const OrderDetail: FC<IProps> = ({ selectedOrder, onClose }) => {
  const [isAddProductPopupOpen, setIsAddProductPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const { items: products } = useAppSelector(state => state.products);

  const dispatch = useAppDispatch();

  const getProducts = async () => {
    const response = await fetchProducts({ orderId: selectedOrder?._id });
    dispatch(setProductsAC(response.data));
  }

  const loadData = async () => {
    setIsLoading(true);
    try {
      getProducts();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something wrong with cfetching products', mode: 'error' }));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [selectedOrder?._id]);

  const onCreateProduct = async (createProductDTO: CreateProductDTO) => {
    try {
      await createProduct(createProductDTO);
      await getProducts();
      dispatch(setAlertAC({ text: 'Product is created', mode: 'success' }));
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something wrong with creating product', mode: 'error' }));
    } finally {
      setIsAddProductPopupOpen(false);
      setIsCreating(false);
    }
  }

  return (
    <div
      className={`
        bg-white
        transition-all duration-500 ease-in-out relative
        ${selectedOrder ? 'w-[900px] pr-6 pl-6' : 'w-0 p-0 overflow-hidden'}
      `}
    >
      {!!selectedOrder && (
        <div className="rounded-lg p-6 border border-gray-200">
          <h2 className="font-semibold text-gray-800 text-xl mb-3 truncate overflow-hidden whitespace-nowrap">
            {selectedOrder?.title}
          </h2>

          <div className="flex items-center gap-1 mb-3 cursor-pointer" onClick={() => setIsAddProductPopupOpen(true)}>
            <PlusCircleIcon className='size-6 text-green-500 hover:text-green-400 active:text-green-600 transition duration-300' />
            <p className="text-green-500 hover:text-green-400 active:text-green-600 transition duration-300">Add product</p>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <ProductsList products={products} />
          )}

          <div
            className="absolute -top-2 right-3 w-8 h-8 rounded-full bg-red-500 
            hover:bg-red-400 active:bg-red-600 flex items-center justify-center"
            onClick={onClose}
          >
            <XMarkIcon className="text-white size-5" />
          </div>

          <AddProductPopup
            state={isAddProductPopupOpen}
            setState={setIsAddProductPopupOpen}
            onCreate={onCreateProduct}
            orderId={selectedOrder._id}
            isCreating={isCreating}
          />
        </div>
      )}
    </div>
  )
}

export default OrderDetail;
