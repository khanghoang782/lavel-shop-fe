import {Routes, Route} from "react-router-dom"
import {HomePage} from "./pages/HomePage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {ProductPage}from "./pages/ProductPage.jsx";
import {Dashboard} from "./pages/admin/DashBoard.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/product/:id" element={<ProductPage/>} />


            //Admin route
            <Route path="/admin" element={<Dashboard/>} />


        </Routes>
    </>
  )
}

export default App
