const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setBase(reader.result);
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  });
};
