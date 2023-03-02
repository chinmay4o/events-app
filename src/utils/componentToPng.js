import ReactDOM from "react-dom";
import domtoimage from "dom-to-image";

// domtoimage returns the png in base64 string format we need to convert it into a file
export const base64ToFile = async (url, filename, mimeType) => {
  const res = await fetch(url); // url = base64 output
  const buf = await res.arrayBuffer();
  return new File([buf], filename, { type: mimeType });
};

export const exportComponentAsPNG = async (
  node,
  fileName = `Report.png`,
  backgroundColor = null,
  type = "image/png"
) => {
  const element = ReactDOM.findDOMNode(node); // finds the updated dom

  // return await domtoimage
  //   .toPng(element, {quality: 1})
  //   .then((dataUrl) => {
  //     return dataUrl; // base64 string
  //   })
  //   .catch(function (error) {
  //     console.error("Image cannot be downloaded", error);
  //   });

  const scale = 2;
  const options = {
    quality: 1, // quality of image
    height: element.offsetHeight * scale,
    style: {
      transform: `scale(${scale}) translate(${
        element.offsetWidth / 2 / scale
      }px, ${element.offsetHeight / 2 / scale}px)`,
    },
    width: element.offsetWidth * scale,
  };

  return await domtoimage
    .toPng(element, options)
    .then((dataUrl) => {
      return dataUrl; // base64 string
    })
    .catch(function (error) {
      console.error("Image cannot be downloaded", error);
    });
};

// REACT_APP_API_URL='https://server.thecandido.co/api/v1'
