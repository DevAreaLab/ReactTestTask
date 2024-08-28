import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/home-page/HomePage';
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <>
      <Sidebar/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
