// import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginCompo() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    otp: "",
    fistName: "",
    lastName: "",
  });

  function handleClick() {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/user/emailotp`,
      data: {
        email: user.email,
      },
    }).then((response) => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/verifyOtp");
    });
  }

  return (
    <div className="grid justify-center content-center h-screen border-orange-600	">
      <div className="card border-slate-600">
        <input
          type="email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            console.log(user);
          }}
        />

        <button onClick={handleClick}>Send OTP</button>
      </div>
    </div>
  );
}

export default LoginCompo;
