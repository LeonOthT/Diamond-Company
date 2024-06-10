import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/Login/LoginPage";
import AdminPage from "./Components/Role/Admin/AdminPage";
import DeliStaffPage from "./Components/Role/DeliStaff/DeliStaffPage";
import ManagerPage from "./Components/Role/Manager/ManagerPage";
import SaleStaffPage from "./Components/Role/SaleStaff/SaleStaffPage";
import Hide from "./Components/Hide";
import ManageListProduct from "./Components/Role/Admin/ManageListProduct";

function App() {
  return (
    <>
      <Hide>
        <LoginPage />
      </Hide>

      <Routes>
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/DeliStaffPage" element={<DeliStaffPage />} />
        <Route path="/ManagerPage" element={<ManagerPage />} />
        <Route path="/SaleStaffPage" element={<SaleStaffPage />} />
        <Route path="/ManageListProduct" element={<ManageListProduct />} />
      </Routes>
    </>
  );
}

export default App;
