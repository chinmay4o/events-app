import React from "react";
import styles from "./Events.module.css";
import BottomBar from "../bottomBar/BottomBar";
import EventLayout from "../eventLayout/EventLayout";
function SingleEvent() {
  return (
    <div className="border">
      {/* <TopMenu /> */}
      {/* <EventLayout /> */}
      <BottomBar />
    </div>
  );
}

export default SingleEvent;
