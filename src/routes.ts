import { HomePage, LoginPage } from './_pages';

const routes = [
  {
    path: '/feed',
    name: 'Home Page',
    icon: 'ni ni-tv-2 text-primary',
    component: HomePage,
    layout: '/feed',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: LoginPage,
    layout: '/auth',
  },
];
export default routes;
