import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css'
import Layout from './layout/layout';
import CreateDealerPage from './pages/createDealer';
import DealerListPage from './pages/allDealer';
import DealerDetailsPage from './pages/dealerDetail';
import EditDealer from './pages/editDealer';

function App() {
 const router = createBrowserRouter([
   {
     path: "/",
     Component: Layout,
     children: [
       {
         path: "create-dealer",
         Component: CreateDealerPage,
       },
       {
         path: "",
         Component: DealerListPage,
       },
       {
        path:"view/:id",
        Component:DealerDetailsPage
       },
       {
        path:"edit/:id",
        Component:EditDealer
       }
     ],
   },
 ]);
  return <RouterProvider router={router}/>
}

export default App
