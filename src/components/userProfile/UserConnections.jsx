const UserConnections = () => {
  return (
    <div className="flex flex-col gap-y-5 mt-5">
      <div className="flex items-center gap-x-1">
        <img src="/svgs/Calender.svg" alt="calender" className="h-6 w-6" />
        <span className="font-medium text-sm text-black text-opacity-50">
          Connceted Since 24 Nov, 2022
        </span>
      </div>
      <div className="flex items-center gap-x-1">
        <img src="/svgs/Ticket.svg" alt="calender" className="h-6 w-6" />
        <span className="font-medium text-sm text-black text-opacity-50">
          Connceted Since 24 Nov, 2022
        </span>
      </div>
      <div className="flex items-center gap-x-1">
        <img src="/svgs/EventHome.svg" alt="calender" className="h-6 w-6" />
        <span className="font-medium text-sm text-black text-opacity-50">
          Connceted Since 24 Nov, 2022
        </span>
      </div>
      <div className="flex items-center gap-x-1">
        <img src="/svgs/Notes.svg" alt="calender" className="h-6 w-6" />
        <span className="font-medium text-sm text-black text-opacity-50">
          Connceted Since 24 Nov, 2022
        </span>
      </div>
      <button className="bg-[#E1E2E2] w-[190px] h-12 rounded-[10px] font-semibold text-[16px] text-[#9E9E9E]">
        Remove Connection
      </button>
    </div>
  );
};

export default UserConnections;
