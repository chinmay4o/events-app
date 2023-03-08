import React from "react";
import TextInput from "../../../../common/inputElements/TextInput";
import { useForm } from "react-hook-form";
import axios from "axios";

const LinkedinAutoPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleLinkedinPost() {
    let linkedinAccessToken = localStorage.getItem("linkedinAccessToken");
    if (linkedinAccessToken) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/user/linkedin-auto-post`,null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${linkedinAccessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    } else {
      alert("access token not found");
    }
  }

  return (
    <div>
      LinkedinAutoPost
      <div className="relative mt-6 flex-1 px-4 sm:px-6">
        <form action="" className="flex flex-col">
          {/* <TextInput register={register}/> */}
          {/* <TextInput register={register}/> */}
          {/* <TextInput register={register}/> */}
        </form>
      </div>
      <div className="w-[200px]">
        <button className="primary_submit" onClick={handleLinkedinPost}>
          request post
        </button>
      </div>
    </div>
  );
};

export default LinkedinAutoPost;
