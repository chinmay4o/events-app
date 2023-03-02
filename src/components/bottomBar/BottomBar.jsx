import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bottomMenu } from "../../helper/constant";
import { getRequest } from "../../utils/API/api.ts";

function BottomBar() {
  const [idx, setIdx] = useState("Event");
  const [makerMela, setMakerMela] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getRequest(
          "/anonymous/events?timeline=upcoming"
        );
        setMakerMela(response.data[0]._id);
        // }
      } catch (err) {
        console.log(err);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      <div className="bg-white z-10 h-[55px] fixed bottom-0 w-full md:hidden">
        <ul className="grid min-w-[312px] max-w-[422px] w-full mx-auto md:hidden place-items-center grid-cols-5 my-3 text-[#C5C5C7]">
          {bottomMenu.map((menu, index) => (
            <li
              className={`cursor-pointer grid grid-rows-2 place-items-center h-[70%] ${
                menu.name === idx ? "text-primary" : ""
              }`}
              key={index}
              onClick={() => {
                setIdx(menu.name);
                if (menu.path === "events") {
                  navigate(`/home/events?eventId=${makerMela}`);
                } else {
                  navigate(`/${menu.path}`.toLowerCase());
                }
              }}
            >
              <i className={`${menu.icon} mb-[5px]`}></i>
              <span className="font-medium text-[10px]">{menu.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BottomBar;
