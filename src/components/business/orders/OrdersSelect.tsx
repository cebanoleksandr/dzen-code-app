import type { FC } from "react";
import type { Order } from "../../../utils/types";

interface IProps {
  options: Order[];
  onSelect: (option: string) => void;
}

const OrdersSelect: FC<IProps> = ({ options, onSelect }) => {
  return (
    <form className="w-full">
      <select 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2.5"
        onChange={e => onSelect(e.target.value)}
      >
        {options.map(option => (
          <option key={option._id} value={option._id}>{option.title}</option>
        ))}
      </select>
    </form>
  )
}

export default OrdersSelect;
