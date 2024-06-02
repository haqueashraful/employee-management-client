import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home/Home';
import Contact from '../Pages/Contact/Contact';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import WorkSheet from '../Dashboard/Employee/WorkSheet';
import Dashboard from '../Layout/Dashboard';
import PaymentHistory from '../Dashboard/Employee/PaymentHistory';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
   {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
        {
            path: 'work-sheet',
            element: <WorkSheet />
        },
        {
            path: 'payment_history',
            element: <PaymentHistory />
        }
    ]
   }
  
]);

export default Routes;