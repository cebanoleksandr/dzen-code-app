import { useLayoutEffect, useState, type FC } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import type { Order, Product, User } from "../../../utils/types";
import { useAppDispatch } from "../../../store/hooks";
import { setAlertAC } from "../../../store/alertSlice";
import DeleteProductPopup from "../../popups/DeleteProductPopup";
import { deleteProduct, fetchProducts } from "../../../api/products";
import { setProductsAC } from "../../../store/productsSlice";
import { calculatePrice, formatDate } from "../../../utils/data-configs";
import { getOrderById } from "../../../api/orders";
import { getUserById } from "../../../api/users";

interface IProps {
  product: Product;
}

const ProductMainItem: FC<IProps> = ({ product }) => {
  const [isDeleteProductPopupOpen, setIsDeleteProductPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const photo = product.photo 
    ? product.photo 
    : 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';

  const dispatch = useAppDispatch();

  const getOrder = async () => {
    const response = await getOrderById(product.order);
    setOrder(response.data);
  }

  const getUser = async () => {
    const response = await getUserById(product.authorId);
    setUser(response.data);
  }

  useLayoutEffect(() => {
    getOrder();
    getUser();
  }, []);

  const getProducts = async () => {
    const response = await fetchProducts({});
    dispatch(setProductsAC(response.data));
  }

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(product._id);
      await getProducts();
      dispatch(setAlertAC({ text: 'Product is deleted', mode: 'warning' }));
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something wrong with deleting product', mode: 'error' }));
    } finally {
      setIsDeleteProductPopupOpen(false);
      setIsDeleting(false);
    }
  }

  return (
    <div className={`w-full py-2 px-4 border border-gray-200 rounded-lg mb-1 hover:shadow-soft transition duration-300 flex gap-5 items-center`}>
      <div className="flex gap-3 items-center w-[300px]">
        <img src={photo} alt="" className="size-14" />

        <div>
          <p className="truncate overflow-hidden whitespace-nowrap text-gray-800">{product.title}</p>
          <p className="text-gray-500 text-xs">{product.serialNumber}</p>
        </div>
      </div>

      <div className="flex flex-grow items-center justify-between">
        <p
          className={
            `${product.status === 'In stock' && 'text-green-600'}
            ${product.status === 'Under repair' && 'text-yellow-600'}
            ${product.status === 'Out of stock' && 'text-red-600'} w-20`
          }
        >{product.status}</p>

        <div>
          <p className="text-gray-800"><span className="text-xs text-gray-600">from</span> {formatDate(product.guarantee.start)}</p>
          <p className="text-gray-800"><span className="text-xs text-gray-600">to</span> {formatDate(product.guarantee.end)}</p>
        </div>

        <p className="text-gray-800 w-10">{product.type}</p>

        <div>
          <p className="text-xs text-gray-600">{calculatePrice([product]).totalUSD} $</p>
          <p className="text-gray-800">{calculatePrice([product]).totalUAH} UAH</p>
        </div>

        <p className="text-gray-800">{(user?.firstName || user?.lastName) ? `${user?.firstName} ${user?.firstName}` : `${user?.email}`}</p>
      </div>

      <div className="w-[400px] flex justify-between">
        <p className="text-gray-800">{order?.title}</p>

        <p className="text-gray-800">{formatDate(new Date(product.createdAt))}</p>

        <TrashIcon
          className='size-5 text-red-500 cursor-pointer hover:text-red-400 active:text-red-600 transition duration-300'
          onClick={() => setIsDeleteProductPopupOpen(true)}
        />
      </div>

      <DeleteProductPopup
        state={isDeleteProductPopupOpen}
        setState={setIsDeleteProductPopupOpen}
        onDelete={onDelete}
        product={product}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default ProductMainItem;
