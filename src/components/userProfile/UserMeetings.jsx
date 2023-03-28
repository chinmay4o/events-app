import { useState } from "react";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import SecondaryButton from "../../common/buttons/SecondaryButton";

const UserMeetings = () => {
  const [isBookMeeting, setIsBookMeeting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMeeting, setShowMeeting] = useState(false);
  return (
    <>
      {!showMeeting ? (
        <>
          {!isBookMeeting ? (
            <div className="w-[285px] h-[268px] mt-7">
              <div>
                <img src="/svgs/calender.svg" alt="Calender" />
                <p className="text-[16px] font-medium text-black text-opacity-50 text-center mt-5">
                  There are no meetings booked, book one now
                </p>
                <div
                  className="mt-[30px] w-[335px] mx-auto"
                  onClick={() => setIsBookMeeting(!isBookMeeting)}
                >
                  <PrimaryButton btnText={"Book Meeting"} onClick={() => {}} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[335px]">
                <div className="flex flex-col mt-5">
                  <p className="font-bold text-[24px]">Book a meeting</p>
                  <div className="flex justify-between font-medium text-[16px] mt-[30px]">
                    <p>Select Date</p>
                    <div className="flex">
                      <span>Nov</span>
                      <img src="/svgs/right.svg" alt="right" />
                    </div>
                  </div>
                  <div className="flex gap-x-[10px] mt-[20px]">
                    <div className="w-[60px] h-[90px] bg-[#F4F6F9] rounded-[10px] font-normal text-[18px] text-center py-[15px] px-[10px] text-[#C5C5C7]">
                      Mon 24
                    </div>
                    <div className="w-[60px] h-[90px] bg-primary rounded-[10px] font-normal text-[18px] text-center py-[15px] px-[10px] text-white">
                      Tue 25
                    </div>
                    <div className="w-[60px] h-[90px] bg-[#F4F6F9] rounded-[10px] font-normal text-[18px] text-center py-[15px] px-[10px] text-[#C5C5C7]">
                      Wed 26
                    </div>
                    <div className="w-[60px] h-[90px] bg-[#F4F6F9] rounded-[10px] font-normal text-[18px] text-center py-[15px] px-[10px] text-[#C5C5C7]">
                      Thu 27
                    </div>
                    <div className="w-[60px] h-[90px] bg-[#F4F6F9] rounded-[10px] font-normal text-[18px] text-center py-[15px] px-[10px] text-[#C5C5C7]">
                      Fri 28
                    </div>
                  </div>
                  <div className="w-full mt-5">
                    <hr />
                  </div>
                  <div className="mt-5">
                    <p className="font-medium text-[16px]">Select Time</p>
                  </div>

                  <div className="flex justify-between mt-5">
                    <div className="w-[150px] h-10 rounded-[20px] bg-[#F4F6F9] px-[38px] py-[9px] text-[#C5C5C7] text-[16px]">
                      08:00 AM
                    </div>
                    <div className="w-[150px] h-10 rounded-[20px] bg-[#F4F6F9] px-[38px] py-[9px] text-[#C5C5C7] text-[16px]">
                      09:00 AM
                    </div>
                  </div>
                  <div className="flex justify-between mt-5 font-medium">
                    <div className="w-[150px] h-10 rounded-[20px] bg-primary px-[38px] py-[9px] text-white text-[16px]">
                      10:00 AM
                    </div>
                    <div className="w-[150px] h-10 rounded-[20px] bg-[#F4F6F9] px-[38px] py-[9px] text-[#C5C5C7] text-[16px]">
                      11:00 AM
                    </div>
                  </div>
                  <div className="w-full mt-5">
                    <hr />
                  </div>
                  <div className="mt-5">
                    <span>Reason for meeting / Comments</span>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[335px] focus:ring-primary focus:border-primary block px-2.5 py-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                      placeholder="Reason"
                      required={true}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div
                    className="w-full mt-5 pb-5"
                    onClick={() => setShowModal(true)}
                  >
                    <PrimaryButton
                      btnText={"Book Meeting"}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>
              {showModal && (
                <div className="bg-black bg-opacity-50 fixed inset-0 z-50 w-full h-full  flex justify-center items-center px-1">
                  <div className="bg-white max-w-sm md:max-w-md py-6 px-8 rounded shadow-xl text-gray-800">
                    <div className="flex justify-center items-center mt-5">
                      <h4 className="text-[16px] text-center font-bold">
                        Meeting Booked Succesfully
                      </h4>
                    </div>
                    <div className="mt-5">
                      <img src="/svgs/calender.svg" alt="calender" />
                    </div>
                    <div className="text-md">
                      <div className="mt-5 flex gap-x-2 justify-center items-center">
                        <img src="/svgs/Schedule.svg" alt="schedule" />
                        <p className="font-medium pt-1 text-[16px] text-[#000000] text-opacity-50">
                          27th December - 11:30 am
                        </p>
                      </div>
                      <p className="mt-5 font-medium text-[16px] text-center text-black text-opacity-50">
                        Please wait while Samantha accepts your meeting
                      </p>
                    </div>
                    <div className=" flex gap-y-5 mt-5 flex-col justify-end items-center">
                      <PrimaryButton
                        btnText={"Back to profile"}
                        onClick={() => {
                          setShowModal(false);
                          setShowMeeting(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="w-[335px]">
          <div className="flex flex-col">
            <div>
              <p className="font-medium text-[16px] mt-8">
                Meeting invitations
              </p>
              <div className="w-full mt-5 h-[198px] bg-[#F4F6F9] rounded-[10px]">
                <div className="w-full">
                  <div className="w-[295px] flex gap-x-2.5 h-16 mx-auto p-5">
                    <img
                      src="/svgs/user.svg"
                      alt="user"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-[24px] text-black">
                        Tejas Sonar
                      </p>
                      <p className="font-[400px] text-[14px] py-[10px] text-black text-opacity-50">
                        Wed, Dec 27 - 9:00 am
                      </p>
                    </div>
                  </div>
                  <div className="font-normal mt-10 text-center text-[14px] text-black text-opacity-50">
                    <p>Meeting for - Introduction of Flicker</p>
                  </div>
                  <div className="w-[295px] mx-auto flex items-center justify-between">
                    <div className="w-[140px] h-10 rounded-[10px]">
                      <PrimaryButton
                        btnText={"Accept"}
                        onClick={() => {
                          setShowModal(false);
                          setShowMeeting(true);
                        }}
                      />
                    </div>
                    <div className="w-[140px] h-10 rounded-[10px]">
                      <SecondaryButton
                        btnText={"Reject"}
                        onClick={() => {
                          setShowModal(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-[16px] mt-8">Booked meetings</p>
              <div className="w-full mt-5 h-[198px] bg-[#F4F6F9] rounded-[10px]">
                <div className="w-full">
                  <div className="w-[295px] flex gap-x-2.5 h-16 mx-auto p-5">
                    <img
                      src="/svgs/user.svg"
                      alt="user"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-[24px] text-black">
                        Tejas Sonar
                      </p>
                      <p className="font-[400px] text-[14px] py-[10px] text-black text-opacity-50">
                        Wed, Dec 27 - 9:00 am
                      </p>
                    </div>
                  </div>
                  <div className="font-normal mt-10 text-center text-[14px] text-black text-opacity-50">
                    <p>Meeting for - Introduction of Warpbay</p>
                  </div>
                  <div className="w-[295px] mx-auto flex items-center justify-between">
                    <div className="w-full h-10 rounded-[10px]">
                      <PrimaryButton
                        btnText={"Join Now"}
                        onClick={() => {
                          setShowModal(false);
                          setShowMeeting(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 pb-5">
            <PrimaryButton
              btnText={"Book Meeting"}
              onClick={() => {
                setShowModal(false);
                setShowMeeting(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserMeetings;
