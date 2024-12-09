import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderNotLoggedIn from "../layouts/Header/NotLoggedIn/Header";
import HeaderCustomer from "../layouts/Header/Customer/Header";
import HeaderEmployee from "../layouts/Header/Employee/Header";
import HeaderAdmin from "../layouts/Header/Admin/Header";

import Footer from "../layouts/Footer";
import PageNotFound from "../layouts/PageNotFound";
import { TicketProvider } from "../modules/TicketContext";

import NotLoggedInChooseSeatOneWay from "../pages/NotLoggedIn/ChooseSeatOneWay";
import NotLoggedInChooseSeatRoundTrip from "../pages/NotLoggedIn/ChooseSeatRoundTrip";
import NotLoggedInFillInforOneWay from "../pages/NotLoggedIn/FillInforOneWay";
import NotLoggedInFillInforRoundTrip from "../pages/NotLoggedIn/FillInforRoundTrip";
import NotLoggedInSearchTicket from "../pages/NotLoggedIn/SearchTicket";
import SignUp from "../pages/NotLoggedIn/SignUp";
import Login from "../pages/NotLoggedIn/Login";
import StartScreen from "../pages/NotLoggedIn/Start";

export default function MainRoutes() {
  return (
    <TicketProvider>
      <BrowserRouter>
        <HeaderNotLoggedIn />
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/notLoggedIn/ChooseSeatOneWay" element={<NotLoggedInChooseSeatOneWay />} />
          <Route path="/notLoggedIn/ChooseSeatRoundTrip" element={<NotLoggedInChooseSeatRoundTrip />} />
          <Route path="/notLoggedIn/FillInforOneWay" element={<NotLoggedInFillInforOneWay />} />
          <Route path="/notLoggedIn/FillInforRoundTrip" element={<NotLoggedInFillInforRoundTrip />} />
          <Route path="/notLoggedIn/SearchTicket" element={<NotLoggedInSearchTicket />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </TicketProvider>

  );
}
