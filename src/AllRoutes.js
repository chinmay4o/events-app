import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Events from "./pages/events/Events";
import Home from "./pages/home/Home";
import HomeEvents from "./pages/home/HomeEvents";
import Profile from "./pages/profile/Profile";
import People from "./pages/people/People";
import Notification from "./pages/notifications/Notifications";
import EventsCreate from "./pages/events/EventsCreate";
import ProfileQR from "./pages/profile/ProfileQR";
import LoginOtp from "./pages/login/LoginOtp";
import LoginDemoEvent from "./pages/login/LoginDemoEvent";
import LoginUserDetails from "./pages/login/LoginUserDetails";
import Connections from "./pages/connections/Connections";
import ConnectionsScan from "./pages/connections/ConnectionsScan";
import EventLandingPage from "./pages/eventLandingPage/EventLandingPage";
import FormBuilder from "./pages/events/FormBuilder";
import Registrations from "./pages/events/Registrations";
import UserProfile from "./pages/userProfile/UserProfile";
import Settings from "./components/eventLayout/settings/Settings";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import EventsID from "./pages/events/EventsID";
import LinkedIn from "./pages/linkedin/Linkedin";
import LinkedinAutoPost from "./components/eventLayout/communications/marketing/LinkedinAutoPost";
import EmailMarketing from "./components/eventLayout/communications/emailMarketing/EmailMarketing";
import AttendeeEvents from "./pages/attendeeEvents/AttendeeEvents";
import AttendeeSingleEvent from "./pages/attendeeEvents/AttendeeSingleEvent";

const AllRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      {/* <Home Routes> */}
      <Route path="/home" element={<Home />} />
      <Route path="/home/:eventId" element={<HomeEvents />} />

      {/* {Events Routes} */}
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<EventsID />} />
      <Route path="/events/:eventId/settings" element={<Settings />} />
      <Route
        path="/events/:eventId/settings/formbuilder"
        element={<FormBuilder />}
      />
      <Route path="/events/:eventId/communications/linkedin-marketing" />

      <Route path="/events/:eventId/communications/eventmarketing" />
      <Route
        path="/events/:eventId/registrations"
        element={<Registrations />}
      />
      <Route path="/attendee" element={<AttendeeEvents />} />
      <Route path="/attendee/:eventId" element={<AttendeeSingleEvent />} />

      {/* {Create event Page Routes} */}
      <Route path="/createvent" element={<EventsCreate />} />

      {/* {Landing Page Routes} */}
      <Route path="/event/:eventId" element={<EventLandingPage />} />

      {/* {Login Routes} */}
      <Route path="/login" element={<Login />} />
      <Route path="/login/otp" element={<LoginOtp />} />
      <Route path="/login/demoevent" element={<LoginDemoEvent />} />
      <Route path="/login/userdetails" element={<LoginUserDetails />} />

      {/* {Profile Routes} */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/qr" element={<ProfileQR />} />

      {/* {People Routes} */}
      <Route path="/people" element={<People />} />

      {/* {Notification Routes} */}
      <Route path="/notifications" element={<Notification />} />

      {/* {connections Routes} */}
      <Route path="/connections" element={<Connections />} />
      <Route path="/connections/scan" element={<ConnectionsScan />} />

      {/* {UserProfile Routes} */}
      <Route path="/userprofile" element={<UserProfile />} />

      {/* {Linkedin Routes} */}
      <Route path="/linkedin" element={<LinkedIn />} />

      {/* {PageNotFound Routes} */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
