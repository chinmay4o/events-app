const DatePicker = (props) => {
    return (
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <input
                datepicker=""
                datepicker-autohide=""
                onSelect={(e) => props.setEvent((prev) => ({ ...prev, startDate: e.target?.value }))}
                type="date"
                className="bg-[#F4F6F9] h-12 border-0 peer pl-10 text-black text-[14px] rounded-lg focus:ring-transparent w-full focus:border-2 focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-black dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Select date"
            />
        </div>
    );
};

export default DatePicker;
