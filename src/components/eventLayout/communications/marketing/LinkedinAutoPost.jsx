import React, { useState, useEffect } from "react";
import TextInput from "../../../../common/inputElements/TextInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  patchAuthenticatedRequest,
  patchRequest,
} from "../../../../utils/API/api.ts";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_EVENT } from "../../../../redux/constants/eventConstants";
import TextArea from "../../../../common/inputElements/TextArea";
import FileInput from "../../../../common/inputElements/FileInput";

const LinkedinAutoPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [show, setShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      description: "Learning more about LinkedIn by reading the LinkedIn Blog!",
      postTitle:
        "Official LinkedIn Blog - Your source for insights and information about LinkedIn.",
      resourceLink: "https://blog.linkedin.com/",
    },
  });

  const dispatch = useDispatch();
  const singleEvent = useSelector((state) => state.eventData);

  useEffect(() => {
    if (singleEvent.linkedinAutoPost.length > 0) {
      setProfilePicture(singleEvent.linkedinAutoPost?.coverImage);
      reset({
        ...singleEvent?.linkedinAutoPost[0],
      });
    }
  }, [singleEvent]);

  function handleLinkedinPost() {
    // linkedinURNid can be passed here from different page where login is going to happen
    let linkedinAccessToken = localStorage.getItem("linkedinAccessToken");
    let linkedinURNid = localStorage.getItem("linkedinURNid");
    if (linkedinAccessToken && linkedinURNid) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/user/linkedin-auto-post`,
          { linkedinURNid: linkedinURNid, eventId: singleEvent._id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${linkedinAccessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    } else {
      alert("something went wrong! Please try again"); //access-token or urnid not found
    }
  }

  async function onSubmit(data) {
    if (!profilePicture) {
      alert("please upload post cover image");
      return;
    }
    setShow(true);
    const timerId = setTimeout(() => {
      setShow(false);
    }, 3000);

    // adding data to the event model
    const updatedEvent = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/user/linkedin-add-post`,
      {
        post: { ...data, coverImage: profilePicture },
        eventId: singleEvent._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setPostData(updatedEvent.data.savedEvent.linkedinAutoPost[0]);

    dispatch({
      type: UPDATE_EVENT,
      payload: {
        linkedinAutoPost: updatedEvent.data.savedEvent.linkedinAutoPost,
      },
    });
  }

  return (
    <div className="font-[600] w-[375px] ml-[20px] mt-[20px] md:w-[425px] text-[19px] pt-2.5 text-[#585858]">
      <p className="pl-6">Linkedin Auto Post</p>
      <div className="relative mt-[20px] flex-1 px-4 sm:px-6">
        {show && (
          <div className="my-[10px] mb-[10px] w-full h-[45px] grid place-items-center bg-[lightgreen] text-[15px] font-[600]">
            Linkedin Post data added successfully
          </div>
        )}

        <form
          action=""
          className="flex flex-col -mt-[10px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileInput
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            label="Cover Image"
            mb="3"
          />

          <TextInput
            label="Post Title"
            register={register}
            type="text"
            id="postTitle"
          />
          <TextInput
            label="Resource Link"
            register={register}
            type="text"
            id="resourceLink"
          />
          <TextArea
            register={register}
            type="text"
            id="description"
            label="Description"
            mt="1"
          />
          <div className="-mt-[10px]"></div>
          <input type="submit" className="primary_submit" />
          <div className="mb-[30px]"></div>
        </form>
      </div>
      {/* <div className="font-[600] w-[380px] ml-[20px] mt-[20px]">
        <button className="secondary_submit" onClick={handleLinkedinPost}>
          Request post
        </button>
      </div> */}
    </div>
  );
};

export default LinkedinAutoPost;
