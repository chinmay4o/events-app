import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileInput from "../../common/inputElements/FileInput";
import TextInput from "../../common/inputElements/TextInput";
import { getUserDetails } from "../../redux/actions/userActions";

const EditProfile = ({ savedUserConfig, setShowProfile }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: savedUserConfig.firstName,
      lastName: savedUserConfig.lastName,
      organization: savedUserConfig.organization,
      jobTitle: savedUserConfig.jobTitle,
      email: savedUserConfig.email,
      mobile: savedUserConfig.mobile,
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
        setShowProfile(true);
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

  return (
    <div
      className={`max-w-[1440px] w-full mx-auto min-h-[calc(100vh_-_60px)] md:w-[375px] mt-[40px]`}
    >
      <div className="w-full -mt-[10px]">
        <div className="w-full md:w-full p-5 pt-2">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="font-[600] text-[23px]">Edit Profile</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[6px]">
              <FileInput
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
                label="Profile picture"
                mb="5"
              />
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
              <TextInput
                register={register}
                type="text"
                id={"email"}
                label="Email Address"
                placeholder="Email Address"
                disabled={true}
              />
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
              <div className="-mt-[10px]">
                <input
                  value={isSubmitting ? "Loading..." : "Save Changes"}
                  type="submit"
                  className="primary_submit"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mt-[12px] spacer"></div>
              <span
                className="go_back_btn"
                onClick={() => setShowProfile(true)}
              >
                <i className="fa-solid fa-arrow-left"></i> Go Back
              </span>
              <div className="spacer mb-[35px]"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
