import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const MeetingsNotes = ({ setNotes, singleMeeting, setSingleMeeting }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  let optionmymdonth = { month: "short" };
  // Tue Mar 28 2023 14:58:26 GMT+0530 (India Standard T
  const addNotes = async () => {
    if (text === "" && image === "") {
      alert("Cannot send empty fields");
      return;
    }
    let accessToken = localStorage.getItem("accessToken");
    let updatedMeeting;

    const obj = {
      noteDate: new Date().toISOString(),
      noteText: text,
      noteImage: image,
    };
    updatedMeeting = {
      ...singleMeeting,
      Notes: [...singleMeeting.Notes, obj],
    };
    console.log(updatedMeeting);
    setSingleMeeting(updatedMeeting);
    setText("");
    setImage("");
    try {
      if (!accessToken) {
        alert("Unauthorised User");
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/meeting-notes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meeting: updatedMeeting,
            meetingID: singleMeeting.meetingID,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      alert("Error");
    }
  };
  console.log(singleMeeting);
  return (
    <div className="w-full min-h-[100vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white md:min-h-full">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[60px] md:relative z-10">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => setNotes(false)}
        />
        <span className="ml-2 text-[22px] font-[500]">
          {singleMeeting?.meetingWith[0].firstName}{" "}
          {singleMeeting?.meetingWith[0].lastName}
        </span>
      </div>
      <div className="mt-[60px] mx-[16px] pt-[16px] md:pt-1 md:mt-[10px] pb-[60px] ">
        {singleMeeting?.Notes.map((note) => {
          return (
            <div
              key={note._id}
              className="bg-[#F4F6F9] mb-4 rounded-[10px] p-[16px] border border-[2px] border-white"
            >
              <div className="flex relative">
                <div>
                  {note.noteImage ? (
                    <img
                      src={note.noteImage}
                      alt=""
                      className="w-[90%] h-[198px] rounded-[5px] object-cover mb-3"
                    />
                  ) : (
                    <></>
                  )}
                  {note.noteText !== "" ? (
                    <div className="sm:text-[14px] text-[12px] font-[400] md:font-semibold text-[#747B84] w-[90%]">
                      {note.noteText}
                    </div>
                  ) : (
                    <></>
                  )}

                  <span className="flex text-[12px] font-[400] text-[rgba(116,123,132,0.5)] mt-4">
                    {new Date(note?.noteDate).getDate()}{" "}
                    {new Intl.DateTimeFormat("en-US", optionmymdonth).format(
                      new Date(note?.noteDate)
                    )}
                    , {note.noteDate.toString().substring(0, 4).slice(-4)} •{" "}
                    {moment(note.noteDate).format("LT")}
                  </span>
                </div>

                <img
                  src="/svgs/Menu.svg"
                  alt=""
                  className="right-[0px] absolute cursor-pointer"
                  //   onClick={() => setViewContact(true)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 w-full h-[65px] z-50 bg-white flex items-center justify-between md:bg-[#F5F5F5] md:w-[83%]">
        <textarea
          type="text"
          placeholder="Add Notes"
          value={text}
          className="border-0 focus:ring-0 w-[75%] text-[16px] font-[400] h-[45px] md:w-[90%] md:ml-2"
          onChange={(e) => setText(e.target.value)}
        />
        {/* <img
          src="/svgs/Mic.svg"
          alt="mic"
          className="cursor-pointer h-[18px] "
        /> */}
        <label htmlFor="file" className="inline-block	cursor-pointer">
          <img
            src="/svgs/image_upload.svg"
            alt="mic"
            className="cursor-pointer h-[18px]"
          />
        </label>
        <input
          id="file"
          className="hidden"
          type="file"
          accept="image/*"
          placeholder="imageUpload"
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
                setImage(response.data.url);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        />

        <img
          src="/svgs/send.svg"
          alt="mic"
          className="cursor-pointer mr-3 h-[16px]"
          onClick={() => addNotes()}
        />
      </div>
    </div>
  );
};

export default MeetingsNotes;
