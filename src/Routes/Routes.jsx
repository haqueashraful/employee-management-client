import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home/Home';
import Contact from '../Pages/Contact/Contact';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import WorkSheet from '../Dashboard/Employee/WorkSheet';
import Dashboard from '../Layout/Dashboard';
import PaymentHistory from '../Dashboard/Employee/PaymentHistory';
import EmployeeList from '../Dashboard/HR/EmployeeList';
import EmployeeDetails from '../Dashboard/HR/EmployeeDetails';
import AllWorks from '../Dashboard/HR/AllWorks';
import AllEmployee from '../Dashboard/Admin/AllEmloyee';
import DashboardHome from '../Dashboard/Dashboard/DashboardHome';

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
            path: 'dash-home',
            element: <DashboardHome />
        },
        // Employee
        {
            path: 'work-sheet',
            element: <WorkSheet />
        },
        {
            path: 'payment_history',
            element: <PaymentHistory />
        },

        // HR
        {
            path: 'employee-list',
            element: <EmployeeList />
        },
        {
            path: 'employee/:email',
            element: <EmployeeDetails />
        },
        {
            path: 'progress',
            element: <AllWorks />
        },

        // admin
        {
            path: 'all-employee-list',
            element: <AllEmployee />
        }
    ]
   }
  
]);

export default Routes;