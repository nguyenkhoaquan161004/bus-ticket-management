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
import { ChangeTicketProvider, ChangeTicketContext } from "../modules/ChangeTicketContext";

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
import AdminRouteManager from "../pages/Admin/RouteManager";
import AdminDiscountManagement from "../pages/Admin/DiscountManagement";
import AdminManagerAccount from "../pages/Admin/ManagerAccount";
import ManagerAccount from "../pages/Admin/ManagerAccount";

import EmployeeChangeTicket from "../pages/Employee/ChangeTicket";
import EmployeeChooseSeatOneWay from "../pages/Employee/ChooseSeatOneWay";
import EmployeeChooseSeatRoundTrip from "../pages/Employee/ChooseSeatRoundTrip";
import EmployeeSearchTicket from "../pages/Employee/SearchTicket";
import EmployeeStartScreen from "../pages/Employee/Start";
import EmployeeFillInfor from "../pages/Employee/FillInfor";

function Header() {
  const location = useLocation();

  if (location.pathname.includes("/customer")) {
    return <HeaderCustomer />;
  } else if (location.pathname.includes("/admin")) {
    return <HeaderAdmin />;
  } else if (location.pathname.includes("/employee")) {
    return <HeaderEmployee />;
  } else {
    return <HeaderNotLoggedIn />;
  }
}

function EmployeeHandler() {
  const location = useLocation();
  const { toggleEmployee, isEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    if (location.pathname.includes("/employee") && !isEmployee) {
      toggleEmployee();
    }
  }, [location.pathname, isEmployee, toggleEmployee]);
}

function ChangeTicketHandler() {
  const location = useLocation();
  const { toggleChangeTicket, isChangeTicket } = useContext(ChangeTicketContext);

  useEffect(() => {
    if (location.pathname.includes("/employee/ChangeTicket") && !isChangeTicket) {
      toggleChangeTicket();
    }
  }, [location.pathname, isChangeTicket, toggleChangeTicket]);
}
export default function MainRoutes() {
  return (
    <EmployeeProvider>
      <TicketProvider>
        <ChangeTicketProvider>
          <BrowserRouter>
            <EmployeeHandler />
            <ChangeTicketHandler />
            <Header />
            <Routes>
              {/* NOT LOGGED IN */}
              <Route path="/" element={<StartScreen />} />
              <Route path="/ChooseSeatOneWay" element={<NotLoggedInChooseSeatOneWay />} />
              <Route path="/ChooseSeatRoundTrip" element={<NotLoggedInChooseSeatRoundTrip />} />
              <Route path="/FillInfor" element={<NotLoggedInFillInforOneWay />} />
              <Route path="/SearchTicket" element={<NotLoggedInSearchTicket />} />
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
              <Route path="/employee" element={<EmployeeStartScreen />} />
              <Route path="/employee/ChooseSeatOneWay" element={<EmployeeChooseSeatOneWay />} />
              <Route path="/employee/ChooseSeatRoundTrip" element={<EmployeeChooseSeatRoundTrip />} />
              <Route path="/employee/ChangeTicket/ChooseSeatOneWay" element={<EmployeeChooseSeatOneWay />} />
              <Route path="/employee/ChangeTicket/ChooseSeatRoundTrip" element={<EmployeeChooseSeatRoundTrip />} />
              <Route path="/employee/SearchTicket" element={<EmployeeSearchTicket />} />
              <Route path="/employee/ChangeTicket" element={<EmployeeChangeTicket />} />
              <Route path="/employee/FillInfor" element={<EmployeeFillInfor />} />

              {/* ADMIN */}
              <Route path="/admin" element={<ManagerAccount />} />
              <Route path="/admin/busManagement" element={<AdminBusManagement />} />
              <Route path="/admin/reportScreen" element={<AdminReportScreen />} />
              <Route path="/admin/discountManagement" element={<AdminDiscountManagement />} />
              <Route path="/admin/managerAccount" element={<AdminManagerAccount />} />
              <Route path="/admin/routeManager" element={<AdminRouteManager />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ChangeTicketProvider>
      </TicketProvider>
    </EmployeeProvider>
  );
}
