import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../common/inputElements/TextInput";

const ReferAndEarn = (props) => {
  return (
    <div className={`max-w-[1440px]  mx-auto h-[calc(100vh_-_60px)]`}>
      <div className="w-[375px] mt-3">
        <div className="flex">
          <div
            className="flex gap-x-[5px] cursor-pointer"
            onClick={() => props.setShowProfile(true)}
          >
            <img
              src="/svgs/left.svg"
              alt="left"
              className="w-[18px] h-[20px]"
            />
            <p className="font-normal text-[17px]">Back</p>
          </div>
          <div className="w-[220px] text-center">
            <p className="font-normal text-[17px]">Refer & Earn</p>
          </div>
        </div>
        <div className="w-full md:w-[335px] p-5">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="font-bold text-[24px]">Refer & Earn</p>
            </div>
          </div>
          <div className="h-[220px] w-[335px] flex flex-col justify-between items-center p-5 gay-y-5 bg-black rounded-[10px] mt-5 text-white">
            <p className="text-[17px] font-[500]">Total Referred: 10</p>
            <p className="text-[30px] font-bold">Refer a Friend</p>
            <p className="text-[16px] font-normal">
              Earn 20 points on each Referrals
            </p>
            <div className="w-[280px] h-[46px] flex items-center rounded-3xl p-4 justify-between bg-white text-[#8E8E93]">
              <p>chinmay.space/tejas-sonar</p>
              <img src="/svgs/share.svg" alt="Share" />
            </div>
          </div>
          <div className="w-[331px] mt-[38px]">
            <div>
              <p className="font-semibold text-[20px]">How its Work</p>
            </div>
            <div>
              <div className="flex flex-col">
                <div className="mt-5 flex items-center">
                  <div className="w-[67px] h-[67px] flex items-center justify-center bg-black rounded-full">
                    <img
                      src="/svgs/link.svg"
                      alt="Link"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="pl-3">
                    <p className="font-semibold text-[20px] mb-2">
                      Invite your Friends{" "}
                    </p>
                    <p className="font-normal text-[14px] text-[#474554]">
                      just share your link
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center">
                  <div className="w-[67px] h-[67px] flex items-center justify-center bg-black rounded-full">
                    <img
                      src="/svgs/download.svg"
                      alt="Link"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="pl-3">
                    <p className="font-semibold text-[20px] mb-2">
                      They download the app
                    </p>
                    <p className="font-normal text-[14px] text-[#474554]">
                      and attend or organise an event
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center">
                  <div className="w-[67px] h-[67px] flex items-center justify-center bg-black rounded-full">
                    <img
                      src="/svgs/dollar.svg"
                      alt="Link"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="pl-3">
                    <p className="font-semibold text-[20px] mb-2">
                      You make points
                    </p>
                    <p className="font-normal text-[14px] text-[#474554]">
                      20 points for each referral
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;
