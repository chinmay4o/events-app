import React from "react";
import Layout from "../src/common/layout/Layout";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import "./styles/globals.css";
import { useMatch } from "react-router-dom";
import store from "./redux/store";
import BottomBar from "./components/bottomBar/BottomBar";
import AllRoutes from "./AllRoutes";
import EventHomeLayout from "./common/layout/EventHomeLayout";

function App() {
  const eventsId = useMatch("events/:eventId");
  const eventId = useMatch("event/:eventId");
  const formBuilder = useMatch("/events/:eventId/settings/formbuilder");
  const emailMarketing = useMatch(
    "/events/:eventId/communications/eventmarketing"
  );
  const settings = useMatch("/events/:eventId/settings");
  const linkedinAutoPost = useMatch(
    "/events/:eventId/communications/linkedin-marketing"
  );
  const login = useMatch("/login");
  return (
    <Provider store={store}>
      {eventsId ||
      formBuilder ||
      settings ||
      linkedinAutoPost ||
      emailMarketing ? (
        <EventHomeLayout>
          <BottomBar />
        </EventHomeLayout>
      ) : (
        <Layout>{login || eventId ? null : <BottomBar />}</Layout>
      )}

      {/* {All Page Router} */}
      <AllRoutes />
    </Provider>
  );
}

export default App;
