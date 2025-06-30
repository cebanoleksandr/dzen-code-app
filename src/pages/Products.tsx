import { PlusCircleIcon } from "@heroicons/react/24/solid";
import MainLayout from "../components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { setAlertAC } from "../store/alertSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createProduct, fetchProducts, type CreateProductDTO } from "../api/products";
import { setProductsAC } from "../store/productsSlice";
import Loader from "../components/UI/Loader";
import ProductsList from "../components/business/products/ProductList";
import AddProductPopup from "../components/popups/AddProductPopup";

const Products = () => {
  const [isAddProductPopupOpen, setIsAddProductPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const { items: products } = useAppSelector(state => state.products);
  
  const dispatch = useAppDispatch();

  const getProducts = async () => {
    const response = await fetchProducts({});
    dispatch(setProductsAC(response.data));
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      await getProducts();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong', mode: 'error' }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
    <MainLayout>
      <div className="flex items-center gap-3 mb-10">
        <PlusCircleIcon
          className='size-8 text-green-500 cursor-pointer hover:text-green-400 active:text-green-600 transition duration-300'
          onClick={() => setIsAddProductPopupOpen(true)}
        />
        <p className="font-semibold text-2xl">Products / {products.length}</p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ProductsList products={products} isMain />
      )}

      <AddProductPopup
        state={isAddProductPopupOpen}
        setState={setIsAddProductPopupOpen}
        onCreate={onCreateProduct}
        isCreating={isCreating}
      />
    </MainLayout>
  )
}

export default Products;