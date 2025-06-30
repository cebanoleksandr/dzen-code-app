import { Fragment, type FC } from "react";
import type { Product } from "../../../utils/types";
import ProductItem from "./ProductItem";
import ProductMainItem from "./ProductMainItem";

interface IProps {
  products: Product[];
  isMain?: boolean;
}

const ProductsList: FC<IProps> = ({ products, isMain }) => {
  if (!products.length) {
    return (
      <p className="font-bold text-3xl text-gray-500 text-center">There is no products yet</p>
    )
  }

  return (
    <div className="w-full">
      {products.map(product => (
        <Fragment key={product._id}>
          {isMain ? (
            <ProductMainItem product={product} />
          ) : (
            <ProductItem product={product} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default ProductsList;
