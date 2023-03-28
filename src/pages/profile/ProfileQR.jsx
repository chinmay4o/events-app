import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";
import useQRCode from "../../helper/hooks/useQRCode.tsx";

const ProfileQR = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, savedUserConfig } = userDetails;

  const qrOptions = {
    width: 150,
    height: 150,
    data: `https://events.chinmay.space${
      savedUserConfig?._id ? `/connections/user?uid=${savedUserConfig._id}` : ""
    }`,
    margin: 0,
    qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
    dotsOptions: { type: "extra-rounded", color: "#000000" },
    backgroundOptions: { color: "#ffffff" },
    image:
      "data:image/png;base64,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",
    dotsOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: "0",
      },
    },
    cornersSquareOptions: { type: "extra-rounded", color: "#7143c7" },
    cornersSquareOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    cornersDotOptions: { type: "", color: "#7a48ad" },
    cornersDotOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    backgroundOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#ffffff",
        color2: "#ffffff",
        rotation: "0",
      },
    },
  };

  const qrCode = useQRCode(qrOptions);
  const ref = useRef(null);

  useEffect(() => {
    console.log(savedUserConfig?._id, "ref.current");
    if (ref.current && savedUserConfig?._id) qrCode?.append(ref.current);
  }, [savedUserConfig?._id]);

  return (
    <div className="flex flex-col items-center justify-center">
      {savedUserConfig?.profilePicture ? (
        <img
          src={savedUserConfig?.profilePicture}
          className="h-[120px] w-[120px] rounded-[50%] mt-5 object-cover"
        />
      ) : (
        <DefaultProfilePicture
          firstName={savedUserConfig?.firstName}
          lastName={savedUserConfig?.lastName}
          style={{
            height: "90px",
            width: "90px",
            borderRadius: "50%",
            marginTop: "35px",
          }}
        />
      )}
      <div className="text-[22px] font-[600] pt-5">
        {savedUserConfig?.firstName} {savedUserConfig?.lastName}
      </div>
      <span className="text-[15px]">
        {savedUserConfig?.jobTitle}
        {savedUserConfig?.jobTitle && savedUserConfig?.organization ? ", " : ""}
        {savedUserConfig?.organization}
      </span>
      <span>{savedUserConfig?.email}</span>
      <div ref={ref} className="pt-5"></div>
    </div>
  );
};

export default ProfileQR;
