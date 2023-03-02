import React from "react";
import Layout from "../src/common/layout/Layout";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import "../src/styles/globals.css";
import { useMatch } from "react-router-dom";
import store from "./redux/store";
import BottomBar from "./components/bottomBar/BottomBar";
import AllRoutes from "./AllRoutes";
import EventHomeLayout from "./common/layout/EventHomeLayout";

function App() {
  const eventsid = useMatch("events/:eventId");
  const eventid = useMatch("event/:eventId");
  const formbuilder = useMatch("/events/:eventId/settings/formbuilder");
  const settings = useMatch("/events/:eventId/settings");
  const login = useMatch("/login");
  return (
    <Provider store={store}>
      {eventsid || formbuilder || settings ? (
        <EventHomeLayout>
          <BottomBar />
        </EventHomeLayout>
      ) : (
        <Layout>{login || eventid ? null : <BottomBar />}</Layout>
      )}

      {/* {All Page Router} */}
      <AllRoutes />
    </Provider>
  );
}

export default App;
