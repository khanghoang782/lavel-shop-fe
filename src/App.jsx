import {Routes, Route} from "react-router-dom"
import {HomePage} from "./pages/HomePage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {ProductPage}from "./pages/ProductPage.jsx";
import {Dashboard} from "./pages/admin/DashBoard.jsx";
import {ProductManager} from "./pages/admin/ProductManager.jsx";
import {AccountManager} from "./pages/admin/AccountManager.jsx";
import {ErrorPage} from "./pages/ErrorPage.jsx";



function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="product/:id" element={<ProductPage/>} />

            <Route path="admin" element={<Dashboard/>}>
                <Route index element={<ProductManager/>} />
                <Route path="accounts" element={<AccountManager/>} />
            </Route>

            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    </>
  )
}

export default App
