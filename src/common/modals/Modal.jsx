import React from "react";

function Modal({
  isOpen,
  setIsOpen,
  children,
}) {
  return (
    <div
      id="defaultModal"
      tabIndex={-10}
      aria-hidden="true"
      className={`${
        isOpen ? "grid" : "hidden"
      }  place-items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center`}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <div className="relative p-4 w-full max-w-2xl m-auto h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow min-w-[300px] min-h-[150px]  dark:bg-gray-700 ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
