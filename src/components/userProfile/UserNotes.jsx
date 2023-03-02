const UserNotes = () => {
  return (
    <>
      <div className="h-[751px] w-[335px] overflow-y-scroll mb-5">
        <div className="mt-5 text-sm p-4 text-[#747B84] rounded-[10px] bg-[#F4F6F9]">
          <div className="flex justify-between">
            <p className="w-[269px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <img
              src="/svgs/Menu.svg"
              alt="Menu"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <span className="mt-4 inline-block text-[#747B84] text-opacity-50">
            13 Nov, 2022 • 3:45 pm
          </span>
        </div>

        <div className="mt-5 text-sm p-4 text-[#747B84] rounded-[10px] bg-[#F4F6F9]">
          <div className="flex justify-between">
            <p className="w-[269px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <img
              src="/svgs/Menu.svg"
              alt="Menu"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <span className="mt-4 inline-block text-[#747B84] text-opacity-50">
            13 Nov, 2022 • 3:45 pm
          </span>
        </div>

        <div className="mt-5 text-sm p-4 text-[#747B84] rounded-[10px] bg-[#F4F6F9]">
          <div className="flex justify-between">
            <p className="w-[269px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <img
              src="/svgs/Menu.svg"
              alt="Menu"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <span className="mt-4 inline-block text-[#747B84] text-opacity-50">
            13 Nov, 2022 • 3:45 pm
          </span>
        </div>
      </div>
      <div className="relative w-[335px] mb-10">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[335px] focus:ring-primary focus:border-primary block px-2.5 py-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
          placeholder="Add Notes"
          required={true}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></input>
        <div className="flex items-center absolute inset-y-0 right-0 pl-3 gap-x-[12px] pointer-events-none">
          <i className="fa fa-microphone text-[#C5C5C7] w-5 h-5 py-[4px]"></i>
          <i className="fa fa-camera text-[#C5C5C7] w-6 h-6 py-[4px]"></i>
        </div>
      </div>
    </>
  );
};

export default UserNotes;
