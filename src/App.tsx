import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css'
import Layout from './layout/layout';

function App() {
 const router = createBrowserRouter([
   {
     path: "/",
     Component: Layout,

   },
 ]);
  return <RouterProvider router={router}/>
}

export default App
