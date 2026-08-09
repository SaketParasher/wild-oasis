import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: "account",
        element: <Account />
      },
      {
        path: "bookings",
        element: <Bookings />
      },
      {
        path: "cabins",
        element: <Cabins />
      },

      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "users",
        element: <Users />
      }
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "*",
    element: <PageNotFound />,
  }
])

function App() {

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  )
}

export default App
