import { Cog6ToothIcon, DocumentTextIcon, ShoppingBagIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { useAppSelector } from "../../store/hooks";

export type SidebarItemType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const Sidebar = () => {
  const { item: user } = useAppSelector(state => state.user);

  const emptyAva = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  const sidebarItems = [
    { title: 'Orders', icon: DocumentTextIcon, href: '/' },
    { title: 'Products', icon: ShoppingBagIcon, href: '/products' },
    { title: 'Users', icon: UsersIcon, href: '/users' },
    { title: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
  ];

  return (
    <div className="fixed flex flex-col justify-between left-0 top-0 w-52 h-screen border-r border-grey-3 p-2 bg-bg-sidebar z-[2]">
      <div>
        <Link to='/' className="text-green-500 font-bold text-3xl p-2">Inventory</Link>

        <div className="text-center my-10">
          <img
            src={user?.photoUrl || emptyAva}
            alt=''
            className="rounded-full object-cover mb-3"
          />

          {(!!user?.firstName || !!user?.lastName) ? (
            <p className="text-gray-800 font-semibold text-xl">{user?.firstName} {user?.lastName}</p>
          ) : (
            <p className="text-gray-800 font-semibold text-xl">{user?.email}</p>
          )}
        </div>

        <ul className="h-4/5 mb-[10px] mt-7 overflow-y-auto">
          {sidebarItems.map(item => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;
