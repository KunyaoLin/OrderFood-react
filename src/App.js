import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Beverage from "./component/Beverage";
import Dessert from "./component/Dessert";
import Dinner from "./component/Dinner";
import Lunch from "./component/Lunch";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OrderPage from "./pages/OrderPage";
import ProtectRoute from "./component/ProtectRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="account" element={<Account />}>
          <Route index element={<Navigate to="login" replace />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route>
          <Route
            path="order"
            element={
              <ProtectRoute>
                <OrderPage />
              </ProtectRoute>
            }
          ></Route>
        </Route>
        <Route
          path="cart"
          element={
            <ProtectRoute>
              <Cart />
            </ProtectRoute>
          }
        ></Route>

        <Route
          path="menu"
          element={
            // <ProtectRoute>
            //   <Menu />
            // </ProtectRoute>
            <Menu />
          }
        >
          <Route index element={<Navigate to="lunch" replace />} />
          <Route path="lunch" element={<Lunch />} />
          <Route path="dinner" element={<Dinner />} />
          <Route path="dessert" element={<Dessert />} />
          <Route path="beverage" element={<Beverage />} />
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
