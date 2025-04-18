import {Routes, Route} from "react-router-dom"
import {HomePage} from "./pages/HomePage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {ErrorPage} from "./pages/ErrorPage.jsx";
import {ProductManager} from "./pages/admin/ProductManager.jsx";
import {AccountManager} from "./pages/admin/AccountManager.jsx";
import {OrderManager} from "./pages/admin/OrderManager.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import {ProductPage} from "./pages/ProductPage.jsx";
import {RegisterForm} from "./components/forms/RegisterForm.jsx";
import {CatalogPage} from "./pages/CatalogPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AddProductPage from "./pages/admin/AddProductPage.jsx";
import OrderInfo from "./pages/OrderInfo.jsx";
import {GoogleAuth} from "./pages/GoogleAuth.jsx";
import {OrderActionPage} from "./pages/admin/OrderActionPage.jsx";



function App() {

  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="/gauth" element={<GoogleAuth/>}/>
        <Route path="/catalog/:catalogname" element={<CatalogPage/>}/>

        <Route path="/checkout" element={<CheckoutPage/>}/>

        <Route path={"/orderdone/:orderid"} element={<OrderInfo/>}/>


        <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<ProductManager/>}/>
            <Route path="accounts" element={<AccountManager/>}/>
            <Route path="orders" element={<OrderManager/>}/>
            <Route path="addproduct" element={<AddProductPage/>}/>
            <Route path="order/:id" element={<OrderActionPage/>}/>

        </Route>

        <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  )
}

export default App
