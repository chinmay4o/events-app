import { useEffect, useState } from "react";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
  FileExtension,
} from "qr-code-styling";

// function useQRCode(value: any, delay: number) {
const qrOptions: QRCodeStylingOptions = {
  width: 300,
  height: 300,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
};

const useQRCode = (options: QRCodeStylingOptions): QRCodeStyling | null => {
  //Only do this on the client
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QRCodeStylingLib = require("qr-code-styling");
    const qrCodeStyling: QRCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};
// }

export default useQRCode;
