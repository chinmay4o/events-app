import { useState } from "react";
import UserConnection from "../../components/userProfile/UserConnection";
import UserNotConnection from "../../components/userProfile/UserNotConnection";

const UserProfile = () => {
  const [isConnection, setUserConnection] = useState(true);
  return <>{!isConnection ? <UserNotConnection /> : <UserConnection />}</>;
};

export default UserProfile;
