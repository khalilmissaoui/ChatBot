import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));

const Home = React.lazy(() => import('./views/dashboard/Dashboard'));
const Reports = React.lazy(() => import('./views/reports/Reports'));
const BotConfig = React.lazy(() => import('./views/botConfig/BotConfig'));
const UsersManagement = React.lazy(() => import('./views/usersManagement/UsersManagement'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));

const routes = [
  { path: '/admin', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/reports', name: 'Reports', component: Reports },
  { path: '/botConfig', name: 'Chatbot configuration', component: BotConfig },
  { path: '/usersManagement', name: 'Users management', component: UsersManagement },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
];

export default routes;
