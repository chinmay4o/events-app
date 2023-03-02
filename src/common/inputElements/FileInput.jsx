import axios from "axios";

const FileInput = ({
  imageUrl,
  setImageUrl,
  onChange,
  profilePicture,
  setProfilePicture,
  label,
  mb,
}) => {
  return (
    <label htmlFor="file" className={mb ? `mb-${mb} block` : "mb-[30px] block"}>
      <span className="mb-[5px] font-[500] text-[12px] text-[#09101D] text-opacity-40 relative left-2">
        {label}
      </span>
      {profilePicture ? (
        <div className="w-full flex flex-col gap-y-2 border-dashed border-2 border-primary justify-center items-center mb-5 rounded-[10px] h-[150px] bg-[#F5F5F5]">
          <img
            className="w-[90px] h-[90px] rounded-[50px] object-cover"
            src={profilePicture}
            alt=""
          />
          {/* <p
            className="text-[12px] font-[600] text-[#F15723] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              profilePicture();
            }}
          >
            Remove
          </p> */}
        </div>
      ) : (
        <div className="w-full flex flex-col border-dashed border-2 border-primary gap-y-2 justify-center items-center mb-5 rounded-[10px] h-[150px] bg-[#F5F5F5]">
          <img
            className="w-[90px] h-[90px] rounded-[50px]"
            src={`/svgs/profile.svg`}
            alt=""
          />
        </div>
      )}

      <input
        id="file"
        className="hidden"
        type="file"
        accept="image/*"
        placeholder="imageUpload"
        // onChange={(event) => onChange(event)}
        onChange={(e) => {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);

          axios
            .post(
              `${process.env.REACT_APP_SERVER_URL}/user/upload_picture`,
              formData,
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
              }
            )
            .then(function (response) {
              console.log(response);
              setProfilePicture(response.data.url);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      />
    </label>
  );
};

export default FileInput;
