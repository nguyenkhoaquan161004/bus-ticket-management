import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HeaderNotLoggedIn from "../layouts/Header/NotLoggedIn/Header";
import HeaderCustomer from "../layouts/Header/Customer/Header";
import HeaderEmployee from "../layouts/Header/Employee/Header";
import HeaderAdmin from "../layouts/Header/Admin/Header";

import Footer from "../layouts/Footer";
import PageNotFound from "../layouts/PageNotFound";
import { TicketProvider } from "../modules/TicketContext";

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

function Header() {
  const location = useLocation();

  if (location.pathname.includes("/customer")) {
    return <HeaderCustomer />;
  } else {
    return <HeaderNotLoggedIn />;
  }
}
export default function MainRoutes() {
  return (
    <TicketProvider>
      <BrowserRouter>
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
          <Route path="/Customer" element={<StartScreen />} />
          <Route path="/customer/ChooseSeatOneWay" element={<CustomerChooseSeatOneWay />} />
          <Route path="/customer/ChooseSeatRoundTrip" element={<CustomerChooseSeatRoundTrip />} />
          <Route path="/customer/FillInfor" element={<CustomerFillInforOneWay />} />
          <Route path="/customer/SearchTicket" element={<CustomerSearchTicket />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TicketProvider>

  );
}
