import React, { useState, useEffect } from "react";
import { exportComponentAsPNG } from "../../../utils/componentToPng";
import QRCode from "qrcode";
import { generateAlphanumeric } from "../../../utils/generateAlphanumeric";

export default function Badge2() {
  const badge = React.useRef(null);
  const [generatingBadge, setGeneratingBadge] = useState(false); // it can be used to apply styles while generating a badge
  const [qrCode, setQrCode] = useState();
  const [uid, setUid] = useState("");

  const generateQR = async (text) => {
    try {
      const QR = await QRCode.toDataURL(text);
      setQrCode(QR);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const uid = generateAlphanumeric();
    console.log(uid);
    setUid(uid);
    generateQR(`http://localhost:3000/?uid=${uid}`);
  }, []);

  // const createRegistration = async () => {
  //   delete formData.profileImage;
  //   const badgeString = await getBlob();
  //   try {
  //     const rawResponse = await fetch(
  //       `${process.env.REACT_APP_API_URL}/registrations`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ ...formData, uid, badgeString }),
  //       }
  //     );
  //     const content = await rawResponse.json();
  //     sendWhatsappMessage(formData.mobile, formData.firstname);
  //     setStep("thankyou");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  async function getBlob() {
    // apply styles on the Badge
    // badge.current will pass an updated version of dom
    const blob = await exportComponentAsPNG(badge.current, "badge.png");
    const a = document.createElement("a");
    // selecting download file
    a.href = blob;
    // name the file
    a.download = "Badge.png";
    // trigger a href download to download image
    a.click();
    // remove styles after Badge is downloaded
    // setGeneratingBadge(false);
    return blob;
  }

  return (
    <>
      {/* getBlob function generates the base64 string of updated dom and downloads it */}
      {/* <div onClick={getBlob}>
        <p>Download Badge</p>
      </div> */}
      <div ref={badge} className="badge-card">
        <p className="visitor-eng">VISITOR</p>
        <div className="img-logo">
          <img src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/Screenshot_2022-07-09_at_11.29.47_AM_szvpeMvNP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657346467452" />
        </div>

        {/* <div className="user-details-wrapper">
          {formData?.profileImage && formData?.profileImage[0] ? (
            <img
              src={URL.createObjectURL(formData.profileImage[0])}
              alt="profile-picture"
              className="profile-img"
            />
          ) : (
            <div className="img-initials">
              <p>
                {formData.firstname[0]}
              </p>
            </div>
          )}
          <p style={{ color: "red", fontSize: "13px" }}>{uid}</p>
          <p>
            {formData.firstname} {formData.lastname}
          </p>

          <p>{formData.companyname}</p>
          <p> {formData?.designation}</p>
        </div> */}

        <div className="img-box">
          <img className="qrcode-img" src={qrCode} width={"100"} />
        </div>

        <div className="sponser-logos">
          <img
            src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/Screenshot_2022-07-11_at_2.11.45_PM-removebg-preview_sn8ZDb12p.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657529171013"
            alt=""
          />
        </div>
      </div>
      <input
        className="submit-btn"
        type={"submit"}
        onClick={() => {
          createRegistration();
        }}
      />
      <p className="powered-text">
        <p>Technology partner</p>{" "}
        <div className="img-box">
          <div>
            <img className="wblogo" src="./warpbay.svg" alt="" /> WarpBay
          </div>

          <div>
            <img
              className="cclogo"
              src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/CLC-removebg-preview_H_kJ8yEjL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657614338934"
              alt=""
            />
            {"  "} CardlessConnect
          </div>
        </div>
      </p>
    </>
  );
}
