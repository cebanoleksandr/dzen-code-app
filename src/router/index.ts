import { type RouteObject, createHashRouter } from 'react-router-dom';
import App from '../App';
import Orders from '../pages/Orders';
import Login from '../pages/Login';
import Users from '../pages/Users';
import Products from '../pages/Products';
import Settings from '../pages/Settings';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: Orders,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/users',
        Component: Users,
      },
      {
        path: '/products',
        Component: Products,
      },
      {
        path: '/settings',
        Component: Settings,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/search',
        Component: Search,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ]
  },
];

const router = createHashRouter(routes);

export default router;