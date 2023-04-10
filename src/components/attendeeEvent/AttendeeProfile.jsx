import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../common/inputElements/TextInput";
import TextArea from "../../common/inputElements/TextArea";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUserDetails, logout } from "../../redux/actions/userActions";
import FileInput from "../../common/inputElements/FileInput";
import { EVENT_CREATE_DESTROY } from "../../redux/constants/eventConstants";
import { USER_EVENTS_EMPTY } from "../../redux/constants/userConstants";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";

const AttendeeProfile = ({
  setTriggerProfile,
  triggerProfile,
  savedUserConfig,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: savedUserConfig?.firstName,
      lastName: savedUserConfig?.lastName,
      organization: savedUserConfig?.organization,
      jobTitle: savedUserConfig?.jobTitle,
      email: savedUserConfig?.email,
      mobile: savedUserConfig?.mobile,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("please login!! access not found");
      navigate("/login");
    }

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/user/${savedUserConfig._id}`,
        {
          ...data,
          profilePicture: profilePicture,
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        dispatch(getUserDetails({ accessToken: accessToken }));
        // setShowProfile(true);
        setIsSubmitting(false);
      })
      .catch(function (error) {
        console.log(error);
        alert("something went wrong!!");
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (savedUserConfig.profilePicture) {
      setProfilePicture(savedUserConfig.profilePicture);
    }
  }, []);

  useEffect(() => {
    function preventBackgroundScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("scroll", preventBackgroundScroll, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("scroll", preventBackgroundScroll);
    };
  }, []);
  console.log(savedUserConfig);
  return (
    <div className="md:hidden">
      <div
        className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-30 fixed w-[100%]"
        onClick={() => setTriggerProfile(false)}
      ></div>
      <div className="flex justify-center h-[70px] items-center bg-white  fixed bottom-0 w-full z-50">
        <input
          type="submit"
          form="submit_form"
          className="h-[40px] bg-primary text-white text-[12px] flex justify-center items-center rounded-[10px] cursor-pointer w-[90%]"
          value={isSubmitting ? "Loading..." : "Save Changes"}
          disabled={isSubmitting}
        />
      </div>

      <div
        className={`h-[90%] w-full z-40 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out pb-[50px]`}
      >
        <div
          className={`max-w-[1440px] w-full mx-auto min-h-[calc(100vh_-_60px)] md:w-[375px] mt-[8px] flex items-center flex-col`}
        >
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer"
            onClick={() => setTriggerProfile(false)}
          ></div>
          <div className="w-full -mt-[10px]">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col gap-y-5">
                <div>
                  <p className="font-[500] text-[16px] text-center">
                    Your Profile
                  </p>
                </div>
                <form
                  id="submit_form"
                  className="grid gap-[6px]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {savedUserConfig?.profilePicture ? (
                    <img
                      src={profilePicture}
                      alt=""
                      className="h-[96px] w-[96px] border m-auto rounded-full"
                    />
                  ) : (
                    <div className="cursor-pointer m-auto">
                      <DefaultProfilePicture
                        firstName={savedUserConfig?.firstName}
                        lastName={savedUserConfig?.lastName}
                        style={{
                          width: "96px",
                          height: "96px",
                          borderRadius: "300px",
                          fontSize: "30px",
                        }}
                      />
                    </div>
                  )}

                  <div className="absolute right-[40%] top-[6%] opacity-0 cursor-pointer">
                    <FileInput
                      profilePicture={profilePicture}
                      setProfilePicture={setProfilePicture}
                      label="Profile picture"
                      mb="5"
                      id="Profile_picture"
                    />
                  </div>
                  <span className="mt-[16px] mb-[32px] text-primary text-[12px] m-auto cursor-pointer">
                    Change profile photo
                  </span>

                  <TextInput
                    register={register}
                    type="text"
                    id={"firstName"}
                    label="First Name"
                  />
                  <TextInput
                    register={register}
                    type="text"
                    id={"lastName"}
                    label="Last Name"
                  />
                  {/* <div className="relative">
                    <label
                      htmlFor="startDate"
                      className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
                    >
                      Email (cannot be edited)
                    </label>
                    <TextInput
                      register={register}
                      type="text"
                      label={savedUserConfig ? savedUserConfig.email : ""}
                      placeholder="xyz@gmail.com"
                      disabled={true}
                    /> */}
                  {/* </div> */}
                  <TextInput
                    register={register}
                    type="tel"
                    id={"mobile"}
                    label="Phone Number"
                  />
                  <TextInput
                    register={register}
                    type="text"
                    id={"organization"}
                    label="Company Name"
                  />
                  <TextInput
                    register={register}
                    type="text"
                    id={"jobTitle"}
                    label="Designation"
                  />

                  <div
                    className={`cursor-pointer w-[50%] bg-danger text-[16px] grid place-items-center h-[40px] rounded-[8px] text-[#fff] font-[600] mt-[30px] mx-auto`}
                    onClick={() => {
                      let linkedinAccessToken = localStorage.getItem(
                        "linkedinAccessToken"
                      );
                      localStorage.clear();
                      if (linkedinAccessToken) {
                        localStorage.setItem(
                          "linkedinAccessToken",
                          linkedinAccessToken
                        );
                      }
                      dispatch(logout());
                      dispatch({
                        type: USER_EVENTS_EMPTY,
                        payload: [],
                      });
                      dispatch({
                        type: EVENT_CREATE_DESTROY,
                      });
                      navigate("/login");
                    }}
                  >
                    Logout
                  </div>
                  {/* <div className="relative">
                    <label
                      htmlFor="startDate"
                      className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
                    >
                      Description
                    </label> */}
                  {/* <div className="mt-[-25px]">
                      <TextArea
                        type="text"
                        id={"shortDescription"}
                        placeholder="Description"
                      />
                    </div> */}
                  {/* </div> */}

                  {/* <input
                    type="submit"
                    className="h-[40px] bg-primary text-white text-[12px] flex justify-center items-center rounded-[10px] cursor-pointer fixed bottom-0 w-[90%]"
                    value={isSubmitting ? "Loading..." : "Save Changes"}
                    disabled={isSubmitting}
                  /> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeProfile;
