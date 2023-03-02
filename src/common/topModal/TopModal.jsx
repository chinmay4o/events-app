import React, {useState} from "react";

const TopModal = ({
  message,
  ok = "ok",
  cancel = "cancel",
  // modalDisplay,
  // setModalDisplay,
}) => {
const [modalDisplay, setModalDisplay] = useState("hidden");
  return (
    <div
      className={`modal_parent w-[100vw] h-[100vh] bg-transparent ${
        modalDisplay === "hidden" ? "hidden" : "fixed"
      }`}
    >
      <div className="modal_box grid place-items-center w-[350px] h-[200px] rounded absolute top-[20px] mx-auto bg-[#fff]">
        <p className="modal_text font-[500] text-[16px]">{message}</p>

        <div className="grid grid-cols-2">
          {" "}
          <p onClick={() => setModalDisplay("hidden")}>{cancel}</p>{" "}
          <p onClick={() => setModalDisplay("hidden")}>{ok}</p>
        </div>
      </div>
    </div>
  );
};

export default TopModal;
