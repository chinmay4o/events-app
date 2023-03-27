import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";

const ScanPopup = ({ qrscan, setQrscan }) => {
  const [data, setData] = useState("Loading");
  const navigate = useNavigate();
  const [isMobileTablet, setIsMobileTablet] = useState(false);
  const [shouldScan, setShouldScan] = useState(true);
  const [torch, settorch] = useState(false);
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

  useEffect(() => {
    function preventBackgroundScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("scroll", preventBackgroundScroll, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("scroll", preventBackgroundScroll);
    };
  }, []);

  return (
    <div>
      <div
        className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-30 fixed w-[100%]"
        onClick={() => setQrscan(false)}
      ></div>
      <div
        className={`h-[90%] w-full md:w-${
          qrscan ? "full" : "0"
        } z-50 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out`}
      >
        <div className={`w-full mx-auto mt-[8px] flex items-center flex-col `}>
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer "
            onClick={() => setQrscan(false)}
          ></div>
          <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] md:mt-[60px] md:relative justify-center">
            <img
              src="/svgs/Arrowleft.svg"
              className="w-[24px] h-[24px] object-cover cursor-pointer fixed left-[16px]"
              onClick={() => setQrscan(false)}
            />
            <span className="ml-2 text-[22px] font-[500]">Scan a badge</span>
          </div>
          {shouldScan ? (
            <video
              id="videoElem"
              ref={videoElemRef}
              className={`rounded-[15px] relative top-[50px] md:top-[90px] md:w-[550px] w-[90%] border-[2px] border-primary`}
            ></video>
          ) : null}

          <p className="text-[15px] font-[600]">{data}</p>
          {torch ? (
            <>
              <img
                src="/svgs/Torchon.svg"
                alt=""
                className="mt-[80px] cursor-pointer"
                onClick={() => settorch(!torch)}
              />
              <p className="text-[16] font-[400] mt-[25px]">Torch turned on</p>
            </>
          ) : (
            <>
              <img
                src="/svgs/Torchoff.svg"
                alt=""
                className="mt-[80px] cursor-pointer"
                onClick={() => settorch(!torch)}
              />
              <p className="text-[16] font-[400] mt-[25px]">Torch turned off</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPopup;
