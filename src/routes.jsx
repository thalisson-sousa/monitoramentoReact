import { createBrowserRouter } from 'react-router-dom';
import DashBoard from './pages/dashBoard/DashBoard';
import UserPage from './pages/userPage/UserPage';
import RegisterFirewallPage from './pages/registerFirewallPage/RegisterFirewallPage';
import RegisterLinksPage from './pages/registerLinkPage/RegisterLinksPage';
import Home from './pages/home/Home'; 
import LoginPage from './pages/loginPage/LoginPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import LinkDetails from './pages/linkDetails/LinkDetails';

const router = createBrowserRouter([
    {
        path: "/", 
        element: <AuthProvider><Home /></AuthProvider>,
        children: [ 
            {
                path: "/", 
                element: <PrivateRoute><DashBoard /></PrivateRoute>
            },
            {
                path: "login", 
                element: <LoginPage /> 
            },
            {
                path: "user", 
                element: <PrivateRoute><UserPage /></PrivateRoute>
            },
            {
                path: "firewalls", 
                element: <PrivateRoute><RegisterFirewallPage /> </PrivateRoute>
            },
            {
                path: "links", 
                element: <PrivateRoute><RegisterLinksPage /> </PrivateRoute>
            },
            {
                path: "details", 
                element: <PrivateRoute><LinkDetails /> </PrivateRoute>
            },
        ],
    },
]);

export default router;
