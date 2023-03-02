const UserConnectionsAbout = ({ user }) => {
  return (
    <>
      {user?.organization && user?.jobTitle && (
        <span className="font-medium text-[16px] text-black text-opacity-50 mt-5">
          {user.jobTitle}, {user.organization}
        </span>
      )}
      <span className="font-medium text-[16px] text-black text-opacity-50 mt-2.5">
        Mumbai, Maharashtra
      </span>
      <span className="font-bold text-[16px] text-black text-opacity-50 mt-2.5">
        {user?.userConnections?.length} connections
      </span>
      <div className="w-full mt-5">
        <hr />
      </div>
      <span className="font-medium text-[16px] text-black mt-5">About</span>
      <span className="font-medium text-[12px] text-[#1C1C1E] text-opacity-50 mt-2.5 min-h-[40px]">
        {user?.bio ?? "Not Available"}
      </span>
      <div className="flex mt-2.5 items-center gap-x-1">
        <img src="/svgs/Email.svg" alt="email" className="w-6 h-6" />
        <span className="font-medium text-sm text-black text-opacity-50">
          {user?.email}
        </span>
      </div>
      <div className="flex mt-2.5 items-center gap-x-1">
        <img src="/svgs/Call.svg" alt="cal" className="w-6 h-6" />
        <span className="font-medium text-sm text-black text-opacity-50">
          {user?.mobile ?? "Not available"}
        </span>
      </div>
      <div className="flex gap-x-4 mt-2.5">
        <a
          href={user?.linkedinUrl ?? "https://www.linkedin.com/"}
          target="_blank"
        >
          <img
            src="/svgs/LinkedIn.svg"
            alt="cal"
            className="w-[21px] h-6 cursor-pointer"
          />
        </a>
        {/* <a href="https://www.instagram.com/" target="_blank">
          <img
            src="/svgs/Instagram.svg"
            alt="cal"
            className="w-[21px] h-6 cursor-pointer"
          />
        </a>
        <a href="https://www.twitter.com/" target="_blank">
          <img
            src="/svgs/Twitter.svg"
            alt="cal"
            className="w-[21px] h-6 cursor-pointer"
          />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <img
            src="/svgs/Facebook.svg"
            alt="cal"
            className="w-[21px] h-6 cursor-pointer"
          />
        </a> */}
      </div>
    </>
  );
};

export default UserConnectionsAbout;
