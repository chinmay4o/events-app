import React, { useEffect, useState } from "react";
import Layout from "../src/common/layout/Layout";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import "./styles/globals.css";
import { useMatch } from "react-router-dom";
import store from "./redux/store";
import BottomBar from "./components/bottomBar/BottomBar";
import AllRoutes from "./AllRoutes";
import EventHomeLayout from "./common/layout/EventHomeLayout";
import { Helmet } from "react-helmet";

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

  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (!navigator.onLine) {
      setOnline(false);
    } else {
      setOnline(true);
    }
    window.addEventListener("offline", (e) => {
      setOnline(false);
    });
    
    window.addEventListener("online", (e) => {
      setOnline(true);
    });
  }, [navigator.onLine]);

  return (
    <>
      {!online && (
        <div className="fixed right-[0px] top-[50px] w-[400px] my-[10px] mb-[30px] min-h-[45px] grid place-items-center bg-[tomato] text-[14px] font-[500] text-[white]">
          You are offline! Please check your network settings
        </div>
      )}
      <Helmet>
        <title>Flicker</title>
        <meta name="description" content="Flicker Events application" />
      </Helmet>

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
    </>
  );
}

export default App;
