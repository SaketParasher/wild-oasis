import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
/**
 *  TANSTACK REACT QUERY IMPORTS
*/

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/**
 *  PAGES IMPORTS
 **/
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import Checkin from './pages/Checkin';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import ProtectedRoutes from './ui/ProtectedRoutes';

import ErrorFallback from './ui/ErrorFallback';

// DARK MODE CONTEXT PROVIDER
import { DarkModeContextProvider } from './context/DarkMode.context';



const router = createBrowserRouter([
  {
    element: <ProtectedRoutes><AppLayout /></ProtectedRoutes>,
    errorElement: <ErrorFallback />,
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
        path: "booking/:bookingId",
        element: <BookingDetails />
      },
      {
        path: "checkin/:bookingId",
        element: <Checkin />
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

// create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60
    }
  }
});

function App() {

  return (
    <DarkModeContextProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position='top-center' gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 5000
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)"
            }
          }} />
      </QueryClientProvider>
    </DarkModeContextProvider>

  )
}

export default App
