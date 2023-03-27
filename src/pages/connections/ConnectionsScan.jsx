import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";

const ConnectionsScan = (props) => {
  const [data, setData] = useState("Loading");
  const navigate = useNavigate();
  const [isMobileTablet, setIsMobileTablet] = useState(false);
  const [shouldScan, setShouldScan] = useState(true);
  // const [videoElem, setVideoElem] = useState();
  let videoElemRef = useRef();
  var qrScanner;

  function handleStopScanning(uid = false) {
    //  await qrScanner.destroy();
    // qrScanner.stop();
    // qrScanner = null;
  }

  useEffect(() => {
    qrScanner = new QrScanner(
      videoElemRef.current,
      (result) => {
        console.log("decoded qr code:", result);
        if (result) {
          const index = result.data.indexOf("=");
          const uid = result.data.slice(index + 1);
          console.log(uid, "result.data");
          window.location.href =
            window.location.origin + `/connections/user?uid=${uid}`;
          // qrScanner.stop();
          qrScanner = null;
        }
      },
      {
        onDecodeError: (error) => {
          console.log(error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: "environment",
        // calculateScanRegion: true,
        maxScansPerSecond: 10,
      }
    );
    qrScanner.start();

    setIsMobileTablet(window.innerWidth <= 768);
    // return qrScanner.destroy();
  }, []);

  return (
    <div className="pt-14 md:pt-18 md:mb-0 mx-auto grid place-items-center min-w-[312px] max-w-[422px] w-full md:max-w-[1440px] md:w-full mb-14">
      {shouldScan ? (
        <video
          id="videoElem"
          ref={videoElemRef}
          // className={`rounded-[15px] relative top-[90px] ${
          //   isMobileTablet ? "w-[340px]" : "w-[550px]"
          // } border-[4px] border-[#d5d5d5]`}
          className={`rounded-[15px] relative top-[50px] md:top-[90px] md:w-[550px] w-[90%] border-[4px] border-[#d5d5d5]`}
        ></video>
      ) : null}

      <span
        className="go_back_btn md:relative md:top-[130px] fixed top-[80px]"
        onClick={() => navigate("/events")}
      >
        <i className="fa-solid fa-arrow-left"></i> Go Back
      </span>

      <p className="text-[15px] font-[600]">{data}</p>
    </div>
  );
};

export default ConnectionsScan;
