import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { LinksProvider } from './context/LinksContext';

function App() {
    return (
        <LinksProvider>
            <RouterProvider router={router} />
        </LinksProvider>
    );
}

export default App;