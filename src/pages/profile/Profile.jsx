import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/userActions";
import AccountPanel from "../../components/profile/AccountPanel";
import BottomBar from "../../components/bottomBar/BottomBar";
import ScanIcon from "../../common/scanIcon/ScanIcon";

const Profile = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, savedUserConfig } = userDetails;

  useEffect(() => {
    // generateText(prompt);
    let accessToken = localStorage.getItem("accessToken");
    dispatch(getUserDetails({ accessToken: accessToken }));
  }, [savedUserConfig?._id]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full mx-auto bg-white">
        {/* <div className="grid place-items-center">
          <TopMenu />
        </div> */}
        <AccountPanel savedUserConfig={savedUserConfig} />
        <ScanIcon />
        <BottomBar />
      </div>
    </>
  );
};

export default Profile;
