import { useState, type FC } from "react";
import type { Order } from "../../../utils/types";
import OrderItem from "./OrderItem";
import OrderDetail from "./OrderDetail";

interface IOrdersList {
  orders: Order[];
}

const OrdersList: FC<IOrdersList> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!orders.length) {
    return (
      <p className="font-bold text-3xl text-gray-500 text-center">There is no orders yet</p>
    )
  }

  const closeDetails = () => {
    setSelectedOrder(null);
  }

  return (
    <div className="flex gap-3">
      <div className="w-full">
        {orders.map(order => (
          <OrderItem
            key={order._id}
            order={order}
            setSelectedOrder={setSelectedOrder}
            selectedOrder={selectedOrder}
          />
        ))}
      </div>

      <OrderDetail
        selectedOrder={selectedOrder}
        onClose={closeDetails}
      />
    </div>
  )
}

export default OrdersList;