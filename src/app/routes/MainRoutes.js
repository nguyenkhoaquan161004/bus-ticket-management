import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HeaderNotLoggedIn from "../layouts/Header/NotLoggedIn/Header";
import HeaderCustomer from "../layouts/Header/Customer/Header";
import HeaderEmployee from "../layouts/Header/Employee/Header";
import HeaderAdmin from "../layouts/Header/Admin/Header";

import Footer from "../layouts/Footer";
import PageNotFound from "../layouts/PageNotFound";
import { TicketProvider } from "../modules/TicketContext";
import { EmployeeContext, EmployeeProvider } from "../modules/EmployeeContext";

import NotLoggedInChooseSeatOneWay from "../pages/NotLoggedIn/ChooseSeatOneWay";
import NotLoggedInChooseSeatRoundTrip from "../pages/NotLoggedIn/ChooseSeatRoundTrip";
import NotLoggedInFillInforOneWay from "../pages/NotLoggedIn/FillInfor";
import NotLoggedInSearchTicket from "../pages/NotLoggedIn/SearchTicket";
import SignUp from "../pages/NotLoggedIn/SignUp";
import Login from "../pages/NotLoggedIn/Login";
import StartScreen from "../pages/NotLoggedIn/Start";

import CustomerChooseSeatOneWay from "../pages/Customer/ChooseSeatOneWay";
import CustomerChooseSeatRoundTrip from "../pages/Customer/ChooseSeatRoundTrip";
import CustomerFillInforOneWay from "../pages/Customer/FillInfor";
import CustomerSearchTicket from "../pages/Customer/SearchTicket";
import CustomerHistory from "../pages/Customer/History";

import AdminBusManagement from "../pages/Admin/BusManagement";
import AdminReportScreen from "../pages/Admin/ReportScreen";
import AdminChangeInforTicket from "../pages/Admin/ChangeInforTicket";
import AdminDiscountManagement from "../pages/Admin/DiscountManagement";
import AdminManagerAccount from "../pages/Admin/ManagerAccount";
import AdminRouteSearching from "../pages/Admin/RouteSearching";
import ManagerAccount from "../pages/Admin/ManagerAccount";

function Header() {
  const location = useLocation();

  if (location.pathname.includes("/customer")) {
    return <HeaderCustomer />;
  } else {
    return <HeaderNotLoggedIn />;
  }
}

function EmployeeHandler() {
  const location = useLocation();
  const { toggleEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    if (location.pathname.includes("/employee")) {
      toggleEmployee();
    }
  }, [location.pathname, toggleEmployee]);
  // Không render gì cả, chỉ để theo dõi và thay đổi trạng thái
}
export default function MainRoutes() {
  return (
    <EmployeeProvider>
      <TicketProvider>
        <BrowserRouter>
          <EmployeeHandler />
          <Header />
          <Routes>
            {/* NOT LOGGED IN */}
            <Route path="/" element={<StartScreen />} />
            <Route path="/notLoggedIn/ChooseSeatOneWay" element={<NotLoggedInChooseSeatOneWay />} />
            <Route path="/notLoggedIn/ChooseSeatRoundTrip" element={<NotLoggedInChooseSeatRoundTrip />} />
            <Route path="/notLoggedIn/FillInfor" element={<NotLoggedInFillInforOneWay />} />
            <Route path="/notLoggedIn/SearchTicket" element={<NotLoggedInSearchTicket />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />

            {/* CUSTOMER */}
            <Route path="/customer" element={<StartScreen />} />
            <Route path="/customer/ChooseSeatOneWay" element={<CustomerChooseSeatOneWay />} />
            <Route path="/customer/ChooseSeatRoundTrip" element={<CustomerChooseSeatRoundTrip />} />
            <Route path="/customer/FillInfor" element={<CustomerFillInforOneWay />} />
            <Route path="/customer/SearchTicket" element={<CustomerSearchTicket />} />
            <Route path="/customer/History" element={<CustomerHistory />} />

            {/* EMPLOYEE */}

            {/* ADMIN */}
            <Route path="/admin" element={<ManagerAccount />} />
            <Route path="/admin/busManagement" element={<AdminBusManagement />} />
            <Route path="/admin/reportScreen" element={<AdminReportScreen />} />
            <Route path="/admin/changeInforTicket" element={<AdminChangeInforTicket />} />
            <Route path="/admin/discountManagement" element={<AdminDiscountManagement />} />
            <Route path="/admin/managerAccount" element={<AdminManagerAccount />} />
            <Route path="/admin/routeSearching" element={<AdminRouteSearching />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </TicketProvider>
    </EmployeeProvider>
  );
}
